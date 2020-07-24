# TypeScript React Project Setup

- ESLint
- Airbnb TypeScript
- Prettier
- Husky (pre-commit)
- Jest
- react-test-renderer (snapshot testing)
- jest-dom (Custom jest matchers)
- testing-library
- testing-library (react)


## Install packages

```sh
yarn add -D \
  typescript \
  @types/react \
  @types/react-dom \
  eslint@^6.0.0 \
  eslint-config-airbnb@18.2.0 \
  eslint-config-prettier@^6.11.0 \
  eslint-plugin-import@^2.21.2 \
  eslint-plugin-jest@^23.18.0 \
  eslint-plugin-jsx-a11y@^6.3.0 \
  eslint-plugin-prettier@^3.1.3 \
  eslint-plugin-react@^7.20.0 \
  eslint-plugin-react-hooks@4.0.0 \
  @typescript-eslint/parser@^3.6.1 \
  @typescript-eslint/eslint-plugin@^3.6.1 \
  prettier \
  husky \
  lint-staged \
  jest \
  @types/jest \
  @testing-library/jest-dom \
  @testing-library/react \
  react-test-renderer \
  @types/react-test-renderer
```

## package.json

```json
{
  "scripts": {
    "lint": "eslint '*/**/*.{js,ts,tsx}' --quiet"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{js,ts,tsx}": [
      "eslint --fix"
    ]
  }
}
```


## Reference

- [TypeScript Handbook React & Webpack](https://www.typescriptlang.org/docs/handbook/react-&-webpack.html)
- [eslint-config-airbnb-typescript](https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js)
- [eslint-plugin-jest](https://www.npmjs.com/package/eslint-plugin-jest)
- [Create-React-App with TypeScript, ESLint, Prettier, and Github Actions](https://medium.com/@brygrill/create-react-app-with-typescript-eslint-prettier-and-github-actions-f3ce6a571c97)
- [Parsing error: "parserOptions.project" has been set for @typescript-eslint/parser](https://github.com/typescript-eslint/typescript-eslint/issues/1723#issuecomment-626766041)