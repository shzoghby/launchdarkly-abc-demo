import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { userList } from './config';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { asyncWithLDProvider, LDContext } from 'launchdarkly-react-client-sdk';
import Observability, { LDObserve } from '@launchdarkly/observability';
import SessionReplay, { LDRecord } from '@launchdarkly/session-replay';

(async () => {
  const params = new URLSearchParams(window.location.search);
  const contextKey: string = params.get('id') ?? 'sem';
  const currentUser = userList.filter(user => user.key == contextKey.toLowerCase());

  // Set clientSideID to your own Client-side ID. You can find this in
  // your LaunchDarkly portal under Account settings / Projects

  const context: LDContext = currentUser && currentUser.length != 0 ? {
    kind: 'user',
    key: currentUser[0].key,
    name: currentUser[0].name,
    email: currentUser[0].email,
    office: currentUser[0].office,
    title: currentUser[0].title
  } : {
    kind: 'user',
    key: 'sem',
    name: 'Luke Cage',
    email: 'luke.cage@abc.com',
    office: 'Melbourne',
    title: 'Solution Engineering Manager'
  };

  const LDProvider = await asyncWithLDProvider({
    clientSideID: process.env.REACT_APP_LD_CLIENT_SIDE_ID ?? '',
    context,
    options: {
      plugins: [
        new Observability({
          tracingOrigins: true, // attribute frontend requests to backend domains
          networkRecording: {
            enabled: true,
            recordHeadersAndBody: true
          }
        }),
        new SessionReplay({
          privacySetting: 'strict',
          // or 'default' to redact text matching common regex for PII
          // or 'none' to turn off obfuscation
        }
        )
      ]
    }
  });


  const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
  root.render(
    <React.StrictMode>
      <LDProvider>
        <App userName={context.name} userTitle={context.title} userKey={context.key} />
      </LDProvider>
    </React.StrictMode>,
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
})();
