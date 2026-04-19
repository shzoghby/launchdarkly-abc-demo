import logo from './logo.png';
import logoDark from './logo-dark.svg';
import './App.css';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { LDObserve } from '@launchdarkly/observability';
import { LDRecord } from '@launchdarkly/session-replay';

import LogInNew from './LogInNew';
import LogIn from './LogIn';
import { User } from './data/users';

interface AppProps {
  currentUser?: User
}

function App({ currentUser }: AppProps) {
  const { newLogo, newLogIn } = useFlags();

  if(currentUser === null || currentUser === undefined) {
    return (
      <div className="App">
        <header className="App-header">
          <div className='loggedIn'>
            <b>User not found</b>
          </div>
        </header>
        <body className="App-body" />
      </div>
    );
  }

  try {
    LDObserve.start();

    if (newLogIn) {
      LDRecord.start({
        silent: false // if true, console.warn messages created in this method are skipped
      });
    }

    return (
      <div className="App">
        <header className="App-header">
          <div className="logo-container">
            {
              newLogo ?
                <img src={logoDark} alt="Company Logo" className="logo" />
                : <img src={logo} alt="Company Logo" className="logo" />
            }
          </div>
          <div className='loggedIn'>
            <b>{currentUser.key ? <b>{currentUser.key}&nbsp;|</b> : <span></span>}&nbsp;{currentUser.name}</b>&nbsp;|&nbsp;<b>{currentUser.title}</b>
          </div>
        </header>
        <body className="App-body">
          <div className='container'>
            {
              newLogIn ?
                <LogInNew />
                :
                <LogIn />
            }
          </div>
        </body>
      </div>
    );
  } catch (error) {
    console.error('Error rendering App component:', error);

    return (
      <div className="App">
        <header className="App-header">
          <div className="logo-container">
            <img src={logo} alt="Company Logo" className="logo" />
          </div>
          <nav className="nav-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className='loggedIn'>
            <b>User not found</b>
          </div>
        </header>
        <body className="App-body" />
      </div>
    );
  }
};

export default App;
