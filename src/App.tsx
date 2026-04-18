import React, { useState, useEffect, CSSProperties } from 'react';
import logo from './logo.png';
import logoDark from './logo-dark.png';
import './App.css';
import { useFlags } from 'launchdarkly-react-client-sdk';

interface AppProps {
  userKey?: string;
  userName: string;
  userTitle: string;
}

function App({ userName, userKey, userTitle }: AppProps) {
  const { newLogo, newLogIn } = useFlags();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt with:', { email, password });
    // Add your login logic here
  };

  return (
    <div className="App">
      <header className="App-header">
        
       
        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>
      <body className="App-body">{
          newLogIn &&
          <div className='container'>
            <form onSubmit={handleSubmit}>
              <div className="logo-container">
          {
          newLogo ?
            <img src={logoDark} alt="Company Logo" className="logo" />
            : <img src={logo} alt="Company Logo" className="logo" />
        }
        </div>
              <h2 className='title'>Welcome Back</h2>
              <p className='subtitle'>Please enter your details</p>
              <div className='inputGroup'>
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className='inputGroup'>
                <label>Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit">
                Sign In
              </button>

              <p className='signupText'>
                Don't have an account? <a href="#" className='link'>Sign up</a>
              </p>
            </form>
          </div>
        }
      </body>
    </div>
  );
};

export default App;
