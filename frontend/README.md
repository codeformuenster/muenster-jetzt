# Münster Jetzt Frontend

The front end to Münster Jetzt. It includes a web app for mobile, tablet and desktop browsers and a kiosk mode for big displays.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
You can learn more about [Create React App](https://github.com/facebook/create-react-app) in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Custom environment variables

The app uses some custom environment variables for configuration at runtime and production building

| var | description |
| --- | --- |
| `REACT_APP_BACKEND_BASE_PATH` | The URL used by the frontend to reach the api. Default is `http://localhost:8000`. CI sets this to `https://api(.staging).muenster-jetzt.de` depending on the branch. |
| `REACT_APP_VERSION` | Version string used in a meta tag in index.html. CI sets this to `{branch}-{short_sha}` where `branch` is the current branch and `short_sha` are the first 7 characters of the git commit sha. |

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

To use the staging (or production) api for development, start the app like this:

```
REACT_APP_BACKEND_BASE_PATH=https://api.staging.muenster-jetzt.de npm run start
```

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

### `npm run format`

Formats your code according the code style of this project.

**Code which is not formatted correctly will not be accepted into the `master` branch**

### `npm run lint`

Checks your code against the code style of this project.

**Code which is fails to satisfy the linter will not be accepted into the `master` branch**

### `npm run generate-client`

We're using the OpenAPI v3 specification of our backend to generate an API client which talks to the backend.
Running `npm run generate-client` regenerates the file `src/generated-api-client.tsx`.
Execute this each time the backend API schema changes.
