import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useFlags } from 'launchdarkly-react-client-sdk';

interface AppProps {
  userKey?: string;
  userName: string;
  userTitle: string;
}

function App({ userName, userKey, userTitle }: AppProps) {
  const { newLogo, newLogIn } = useFlags();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Current User: <b>{userName}</b>&nbsp;{userKey ? <b>|{userKey}&nbsp;</b> : <span></span> } |&nbsp;<b>{userTitle}</b></p>
        <p>{newLogo ? <b>New Logo Flag on</b> : <b>New Logo Flag off</b>}</p>
        <p>{newLogIn ? <b>Log In Flag on</b> : <b>Log In Flag off</b>}</p>
      </header>
    </div>
  );
};

export default App;
