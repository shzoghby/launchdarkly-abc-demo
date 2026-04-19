import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { getUserDetails } from './data/users';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeLaunchDarkly } from './config/launchdarkly';

(async () => {
  try {
    const params = new URLSearchParams(window.location.search);
    const contextKey: string = params.get('id') ?? 'sem';
    const currentUser = getUserDetails(contextKey.toLowerCase());
    const ldInitialized = await initializeLaunchDarkly(currentUser);

    const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
    root.render(
      <React.StrictMode>
        <ldInitialized.ldProvider>
          <App currentUser={currentUser} />
        </ldInitialized.ldProvider>
      </React.StrictMode>,
    );
  }
  catch (error) {
    console.error('Error initializing LaunchDarkly provider:', error);

    const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
  }

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
})();
