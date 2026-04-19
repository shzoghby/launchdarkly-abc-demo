import logo from './logo.png';
import logoDark from './logo-dark.svg';
import './App.css';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { LDObserve } from '@launchdarkly/observability';
import { LDRecord } from '@launchdarkly/session-replay';
import { initialize } from 'launchdarkly-react-client-sdk';

import LogInNew from './LogInNew';
import LogIn from './LogIn';

interface AppProps {
  context?: any
}

function App({ context }: AppProps) {
  const { newLogo, newLogIn } = useFlags();

  try {
    const ldClient = initialize(process.env.REACT_APP_LD_CLIENT_SIDE_ID ?? '', context);

    ldClient.track('home-page-views', { context: context });
    ldClient.track('sign-up-apple-average-click-rate', { context: context });
  } catch (err) {
    // Handle initialization failure or timeout
    console.error("SDK failed to initialize within 5 seconds", err);
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
          <nav className="nav-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className='loggedIn'>
            <b>{context.key ? <b>{context.key}&nbsp;|</b> : <span></span>}&nbsp;{context.name}</b>&nbsp;|&nbsp;<b>{context.title}</b>
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
          <iframe src="https://chat.socialintents.com/c/chat-1776561731677" width="100%" className="chat-iframe"></iframe>
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
            <b>{context.key ? <b>{context.key}&nbsp;|</b> : <span></span>}&nbsp;{context.name}</b>&nbsp;|&nbsp;<b>{context.title}</b>
          </div>
        </header>
        <body className="App-body" />
      </div>
    );
  }
};

export default App;
