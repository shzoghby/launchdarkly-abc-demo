# LaunchDarkly SDK for React - ABC COmpany

This is a sample app demonstrating `launchdarkly-react-client-sdk` for ABC Company.

## Perquisites
* Navigate to `chrome://settings/cookies`.
* Make sure `Send a ‘Do Not Track’ request with your browsing traffic` is turned off.
* Navigate to [LaunchDarkly](https://app.launchdarkly.com/signup?_bn=g&_bt=798492537804&creative=798492537804&device=c&gad_campaignid=14336284487&gad_source=1&gbraid=0AAAAADk9kA-R307kN069sTk3bOJ-XwZeD&gclid=EAIaIQobChMIpYjK1Mf4kwMVsZJmAh2-wweWEAAYASAAEgIvt_D_BwE&matchtype=e&utm_adgroup=Brand_General&utm_campaign=APAC_Search_Brand_pltf&utm_content=hp-toggle&utm_medium=cpc&utm_source=google&utm_term=launchdarkly) and sign up.
* After login, go under the target environment & copy `Client-side ID` value. *Learn more [here](https://launchdarkly.com/docs/home/account/environment/keys)*.
* Follow the steps [here](https://nodejs.org/en/download) to install *Node.js* to you machine.
* Follow the steps [here](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) to install *yarn* to your machine.
* Sign up for [ngrok](https://ngrok.com) & follow the setup & installation steps.

## Running The Application
Follow these steps to run the app:

* Clone or download the repository from GitHub.
* Run `cp .env.example .env.local` to create the env file.
* Fill out the `.env.local` variable `LAUNCHDARKLY_CLIENT_SIDE_ID` with your `Client-side ID` value.
* In command line, navigate to folder & start the app by running the following:
    ```sh
    yarn && yarn start
    ```
* Default browser will open with url **http://localhost:3000/**
* In command line, create public url by running the following:
    ```sh
    ngrok http 3000
    ```
* localhost url will tunnel to a new generated public url that you can use for Metrics & Experiments later. *For example: https://d6aa-2403-5805-8470-0-e139-bf8d-eea5-8a02.ngrok-free.app*

## Project Available Scripts
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
In the project directory, you can run the following:

### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`
Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Application Available Contexts
All contexts are of type `user`. You can pass the `key` in the `id` parameter of the URL to impersonate a specific user (this can be replaced by your production users later).

| Key       | Name      | Title     | LogIn Component
| --------  | --------  | --------  | -------- 
| sem | Luke Cage | Solution Engineering Manager | New Component
| sem | Jessica Jones | Solution Engineering Manager | New Component
| pm | Tommy Shelby | Product Manager | New Component
| ai | Steve Jobs | AI Product Manager | Old Component
| demo-user1 | Mel Gibson | Demo End User | New Component
| demo-user2 | Mandy Moore | Demo End User | New Component
| demo-user3 | Julia Roberts | Demo End User | New Component
| user1 | LHarrison Ford | End User | Old Component
| user2 | Keanu Reeves | End User | Old Component

**Note: The new logo is shown for all users. You can manually or using triggers toggle ON/OFF to show/hide the new logo for them all, if needed**

## LaunchDarkly Implemented Features
The App has the following features implemented:
* Feature Flags  (kill switch, individual targeting, rule-based)
* Metrics (Clickable or tapped & Page Views) tracking is enabled
* Experiment (using Flag & Clickable or tapped metric)  
* Observability & Session-Replay are both enabled (Errors, Logs, Traces)

## Part#1: Release and Remediate
* Login to [LaunchDarkly](https://app.launchdarkly.com/)  under Flags -> create a new flag called `newLogo` with All traffic Flags is On.
**Make sure you enable `Available on client-side SDKs`.**

* Toggle the flag `newLogo` to `On` in the dashboard and the app will show the new LaunchDarkly logo
* Toggle the flag `newLogo` to `Off` in the dashboard and the app will show the old LaunchDarkly logo

Alternatively, you can use below API calls to turn the flags on/off without using LaunchDarkly UI: *you can also use `LaunchDarkly.postman_collection.json` in postman*
* Turn `newLogo` Off
```sh
curl -X POST -H "Content-Type: application/json" -d '{"Authorization":"<replace-by SDK Key>"}' https://app.launchdarkly.com/webhook/triggers/69e3362da71b5d0ae0cf12bb/e39a8065-1348-405d-9422-a8887f40c1d4
```
* Turn `newLogo` On
```sh
curl -X POST -H "Content-Type: application/json" -d '{"Authorization":"<replace-by SDK Key>"}' https://app.launchdarkly.com/webhook/triggers/69e3361fe63ae80a969b069c/6c0ba787-9497-4236-b21d-4f3fe0d9c8c5
```
**Note: The app is using UseFlags allowing it to respond to flag changes without a browser refresh**

## Part#2: Target
* Login to [LaunchDarkly](https://app.launchdarkly.com/) under Flags -> create a new flag called `newLogIn` 
* Add individual target `pm` of kind `pm` serve `true`.
* Add rule1 `title` - `is one of ` - `Solution Engineering Manager` & `Demo End User` serve `true`.
**Make sure you enable `Available on client-side SDKs`.**

* Navigate to url or add suffix `?id=sem` or `?id=demo-user1` or `?id=demo-user2` or `?id=demo-user3`, the app will show the new login component with the new Apple & Google SignUp links.
* Add to the url `?id=ai` or `?id=user1` or `?id=user2`, the app will show the old login component.

Alternatively, you can use below API calls to turn the flags on/off without using LaunchDarkly UI: *you can also use `LaunchDarkly.postman_collection.json` in postman*
* Turn `newLogIn` Off
```sh
curl -X POST -H "Content-Type: application/json" -d '{"Authorization":"<replace-by SDK Key>"}' https://app.launchdarkly.com/webhook/triggers/69e373496493570ab8884f5d/ce5774e8-63fd-41a1-a276-a30c30d5f122
```
* Turn `newLogIn` On - **the new login component will show up for 'sem' & 'demo-' users only**
```sh
curl -X POST -H "Content-Type: application/json" -d '{"Authorization":"<replace-by SDK Key>"}' https://app.launchdarkly.com/webhook/triggers/69e373654ebdd70aae1ac788/95ec42fc-7924-4ac1-a11e-df6f8b292fde
```
**Note: The app is using UseFlags allowing it to respond to flag changes without a browser refresh**

## Part#3: Experimentation (Extra Credit)
* Login to [LaunchDarkly](https://app.launchdarkly.com/) under Iterate, Metrics -> create a new metric as follows:
    * kind: Clicked or tapped
    * click targets: `#signUpApple, .signUpAppleLink, #signUpGoogle, .signUpGoogleLink`
    * target: type `Simple match` url `<replace-by your ngrok generated public url>`, type `Exact match` url `<replace-by your ngrok generated public url>?id=`
    * measure: `Count`
    * name: `SignUp Apple/Google Average click rate` 
    * key: `sign-up-apple-average-click-rate`  
* Under Iterate, Experiment -> create a new experiment `New LogIn Page Sign Up Apple/Google`, select `SignUp Apple/Google Average click rate` under `Metrics` & select `newLogIn` under `Flags`
* Click on start to kick-off the experiment
* Navigate to your app url `<replace-by your ngrok generated public url>` or `<replace-by your ngrok generated public url>?id=sem` or `<replace-by your ngrok generated public url>?id=demo-user1`
* Click on either Google or Apple Sign Up links.
