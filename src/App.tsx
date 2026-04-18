import React, { useState, useEffect } from 'react';
import logo from './logo.png';
import logoDark from './logo-dark.svg';
import './App.css';
import { useFlags } from 'launchdarkly-react-client-sdk';

import LogInNew from './LogInNew';
import LogIn from './LogIn';
import Products from './Products';

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
          <b>{userKey ? <b>{userKey}&nbsp;|</b> : <span></span> }&nbsp;{userName}</b>&nbsp;|&nbsp;<b>{userTitle}</b>
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
        <Products />
      </body>
    </div>
  );
};

export default App;
