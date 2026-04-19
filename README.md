# LaunchDarkly React SDK Demo – ABC Company

## Overview
This demo showcases how LaunchDarkly can be used to:
- Safely release features using feature flags
- Target specific user attributes
- Run controlled experiments
- Observe application behaviour in real time

The goal is to demonstrate both technical implementation and real-world usage patterns in a modern React application.

## Perquisites
### Configure Browser
- Open chrome://settings/cookies
- Ensure “Send a ‘Do Not Track’ request” is turned OFF

### Open LaunchDarkly
- Open https://app.launchdarkly.com
- Create LaunchDarkly Account
- Under target Environment - copy `Client-side ID` and `SDK key`

### Install Required Tools
- Install Node.js - follow steps in https://nodejs.org/en/download
- Install Yarn - from command line run 
    ```sh
    npm install -g yarn
- Open https://dashboard.ngrok.com
- Create account or sign in
- Follow steps to install & add authtoken
- Don't follow run the command to deploy your app online yet

## Run the Application
- Create environment file - from command line run 
    ```sh
    cp .env.example .env.local
- Replace `{launchdarkly-client-side-id}` with your copied `Client-side ID`
- Install dependencies - from command line run 
    ```sh
    yarn
- Start application - from command line run 
    ```sh
    yarn start
- Make sure the application is started successfully 'No issues found'
- Start ngrok tunnel - from command line run 
    ```sh
    ngrok http 3000
- Open the public url created, it looks like this: `https://c603-2403-5805-8470-0-e4b9-35e8-3947-109b.ngrok-free.app`

## Available Scripts
- Start dev server
    ```sh
    yarn start
- Run tests
    ```sh
    yarn test
- Build for production
    ```sh
    yarn build
## User Contexts
All contexts are of type `user`. Simulate users via URL, for example: `http://localhost:3000/?id=sem`

| Key       | Name      | Title     | LogIn Component
| --------  | --------  | --------  | -------- 
| sem | Luke Cage | Solution Engineering Manager | New
| sem2 | Jessica Jones | Solution Engineering Manager | New
| pm | Tommy Shelby | Product Manager | New
| ai | Steve Jobs | AI Product Manager | Old
| demo-user1 | Mel Gibson | Demo End User | New
| demo-user2 | Mandy Moore | Demo End User | New
| demo-user3 | Julia Roberts | Demo End User | New
| user1 | LHarrison Ford | End User | Old
| user2 | Keanu Reeves | End User | Old

Note: The new logo is enabled globally but controlled via feature flags.

## Implemented Features
- Feature Flags (kill switch, targeting, rule-based rollout)
- Metrics (click and page view tracking)
- Experimentation (A/B testing via flags + metrics)
- Observability & Session Replay (logs, errors, traces)

## Part 1: Release and Remediate
### Create Feature Flag
- Open https://app.launchdarkly.com
    - Login to your account
    - Under Flags - Create flag: `newLogo`
	- Enable Client-side SDK availability
	- Set to On
    - Under target Environment - go to `Configuration in environment`
    - Under Triggers - add two Generic triggers: `Update flag targeting to On` & `Update flag targeting to Off`
    - Make sure to copy generated URL after each trigger is added

- Test Behaviour - open `<your ngrok public url>`
    - ON → New logo
    - OFF → Old logo

- Test Behaviour - toggle via API
    - Turn OFF
        ```sh
        curl -X POST -H "Content-Type: application/json" \
        -d '{"Authorization":"<your SDK key>"}' \
        https://app.launchdarkly.com/webhook/triggers/<environment-id>/<trigger-id>
    - Turn ON
        ```sh
        curl -X POST -H "Content-Type: application/json" \
        -d '{"Authorization":"<your SDK key>"}' \
        https://app.launchdarkly.com/webhook/triggers/<environment-id>/<trigger-id>
Note: Using useFlags in REACT web app → no browser refresh required.

## Part 2: Target
### Create Feature Flag
- Open https://app.launchdarkly.com
    - Login to your account
    - Under Flags - Create flag: `newLogIn`
	- Enable Client-side SDK availability
    - Configure Individual target
        - context key: pm
	    - kind: user
        - variation: true
	- Configure Rule:
	    - Context kind: user
        - Attribute: title
        - Operator: is one of
	    - values: Solution Engineering Manager <space> Demo End User
	    - variation: true
    - Default rule:
        - Serve: false
    - Under target Environment - go to `Configuration in environment`
    - Under Triggers - add two Generic triggers: `Update flag targeting to On` & `Update flag targeting to Off`
    - Make sure to copy generated URL after each trigger is added
- Test Individual target Behaviour (New Login) - open `<your ngrok public url>?id=pm`
- Test Rule Behaviour (New Login) - open `<your ngrok public url>?id=sem`
- Test Rule Behaviour (New Login) - open `<your ngrok public url>?id=sem2`
- Test Rule Behaviour (New Login) - open `<your ngrok public url>?id=demo-user1`
- Test Rule Behaviour (New Login) - open `<your ngrok public url>?id=demo-user2`
- Test Rule Behaviour (Old Login) - open `<your ngrok public url>?id=ai`
- Test Rule Behaviour (Old Login) - open `<your ngrok public url>?id=user1`
- Test Rule Behaviour (Old Login) - open `<your ngrok public url>?id=user2`
- Test Behaviour - toggle via API
    - Turn OFF (will turn OFF for all users)
        ```sh
        curl -X POST -H "Content-Type: application/json" \
        -d '{"Authorization":"<your SDK key>"}' \
        https://app.launchdarkly.com/webhook/triggers/<environment-id>/<trigger-id>
    - Turn ON (will turn ON only for users matching individual target or rule defined)
        ```sh
        curl -X POST -H "Content-Type: application/json" \
        -d '{"Authorization":"<your SDK key>"}' \
        https://app.launchdarkly.com/webhook/triggers/<environment-id>/<trigger-id>

## Part 3: Experimentation (Optional)
### Create Metric
- Open https://app.launchdarkly.com
    - Login to your account
    - Under Iterate, Metrics - Create a new metric
        - kind: `Clicked or tapped`
        - click targets: `#signUpApple, .signUpAppleLink, #signUpGoogle, .signUpGoogleLink`
        - target: type `Simple match`, url `<your ngrok public url>`, type `Exact match` url `<your ngrok public url>?id=`
        - measure: `Count`
        - name: `SignUp Apple or Google average` 

### Create Experiment
- Open https://app.launchdarkly.com
- Login to your account
- Under Iterate, Experiment -> create a new experiment 
    - name: `New LogIn Page Sign Up Apple Or Google`
    - Hypothesis: `If we add sign up with google or apple, then we will allow users to have quicker sign ups using their existing Apple or Google email, which will save the time re-adding their personal details into our system if they have Google or Apple account they can use.`
    - under Metrics: select `SignUp Apple or Google average` 
    - under Flag or AI Config: select `newLogIn` 
- Click Save then start to kick-off the experiment
- in `.env.local` file - make sure `{launchdarkly-client-side-id}` is your metric key. if not, change it & re-deploy your application.
- Try any of the `Test Rule Behaviour (New Login)` URLs
- Click Apple / Google sign-up options to generate experiment data

## Design Notes
- Used `launchdarkly-react-client-sdk` with `useFlags` to enable real-time UI updates without requiring a page refresh.
- Implemented event tracking using the LaunchDarkly `track` method to capture user interactions for metrics and experimentation.
- Enabled observability and session replay to support end-to-end monitoring, debugging, and user behaviour analysis.
- Added structured error handling (try/catch) to improve resilience and simplify troubleshooting.
- Modularised UI components (e.g., `LoginNew.tsx`, `Login.tsx`) to keep feature variations isolated and maintainable.
- Designed user context simulation via URL parameters to enable testing of targeting rules without authentication dependencies.
- Exposed the local environment using ngrok to support external access for experimentation and real-time metric collection.
- Structured feature flags to support:
  - Safe rollout (kill switch)
  - Targeted releases (based on user attributes)
  - Experimentation (A/B testing)

## Screenshots
For visual reference of the implementation and configuration:
- Application Screenshots: see [README-screen-shots-web.md](./README-screen-shots-web.md)
- LaunchDarkly Configuration: see [README-screen-shots-ld.md](./README-screen-shots-ld.md)

These are included to provide quick validation of functionality without requiring a full local setup.

