# LaunchDarkly SDK for React - ABC COmpany

This is a sample app demonstrating `launchdarkly-react-client-sdk` for ABC Company.

## Running the app

Follow these steps to run the app:

* Login to LaunchDarkly under the target environment & copy both `Client-side ID` & `SDK key` values
* Create a `.env.local` file and set your clientSideID as follows:
    ```
    REACT_APP_LD_CLIENT_SIDE_ID=<replace-by Client-side ID>
    ```
* You should now be able to start the app by doing:

    ```sh
    yarn && yarn start
    ```

## Learning ABout Create React App Available Scripts

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

In the project directory, you can run:

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

## Available Users Context

| Key | Name | Title|
| -------- | -------- | -------- |
| sem | Luke Cage | Solution Engineering Manager |
| pm | Tommy Shelby | Product Manager |
| ai | Steve Jobs | AI Product Manager |
| demo-user1 | Mel Gibson | Demo End User|
| demo-user2 | Mandy Moore | Demo End User |
| demo-user3 | Julia Roberts | Demo End User |
| user1 | LHarrison Ford | End User |
| user2 | Keanu Reeves | End User |


## Part#1: Release and Remediate

* Login to LaunchDarkly under Flags and create a flag called `newLogo` with All traffic Flags is On.
**Make sure you enable `Available on client-side SDKs`.**

* Toggle the flag `newLogo` to `On` in the dashboard and the app will show the new LaunchDarkly logo
* Toggle the flag `newLogo` to `Off` in the dashboard and the app will show the old LaunchDarkly logo

Alternatively, you can use below API calls to turn the flags on/off without using LaunchDarkly UI:
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
* Login to LaunchDarkly under Flags and create a flag called `newLogIn` 
* Add individual target `sem` of kind `user`
* Add rule1 `if user key starts with demo-` serve `true`.
**Make sure you enable `Available on client-side SDKs`.**

* Navigate to url or add suffix `?id=sem` or `?id=demo-user1` or `?id=demo-user2` or `?id=demo-user3`, the app will show the new login component with the new Apple & Google SignUp links.
* Add to the url `?id=pm` or `?id=ai` or `?id=user1` or `?id=user2`, the app will show the old login component.

Alternatively, you can use below API calls to turn the flags on/off without using LaunchDarkly UI:
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

## Part#4: AI Configs (Extra Credit)

## Part#4: Integrations (Extra Credit)
