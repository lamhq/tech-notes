# Weather Forecast

A web app which can display a five day weather forecast for a city.


## Requirements

- Mac OS X, Windows, or Linux
- [Yarn](https://yarnpkg.com/) package + [Node.js](https://nodejs.org/) v8.16.2 or
  newer


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will update (using [Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/)) if you make edits.<br />

### `yarn build`

Builds the app for production to the `dist` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!


### `yarn test`

Launch unit test runner with coverage information. Minimum coverage threshold is also configured for the test to pass.

### `yarn test:watch`

Launches the test runner in the interactive watch mode.

### `yarn lint`

Launches the linter that analyzes source code to flag programming errors, bugs.


## Technologies Used

- React 16 with 100% components writed in hook
- TypeScript
- React Bootstrap
- styled components for Styling React components


## Source code features

- ESLint integrated with [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) (customized for TypeScript project), [Prettier](https://prettier.io/).
- Unit test implemented for testing React components with [DOM Testing](https://testing-library.com/docs/dom-testing-library/intro) and [Snapshot Testing](https://jestjs.io/docs/en/snapshot-testing)
- [commitlint](https://github.com/conventional-changelog/commitlint) is used to checks if your commit messages meet the [conventional commit](https://conventionalcommits.org/) format