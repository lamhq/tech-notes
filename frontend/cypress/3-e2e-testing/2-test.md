# Testing Your App

## Start your server

Start your local development server that hosts the application. It should look something like **http://localhost:8080**.

Start your web server [before running Cypress](https://docs.cypress.io/guides/references/best-practices#Web-Servers) and kill it after it completes.


### Why start a local development server?

- Cypress enables you to do things like stub network requests
- It's easier than writting tests to an already built application
- You can control it:
  - take shortcuts
  - seed data by running executable scripts
  - expose test environment specific routes
  - disable security features which make automation difficult
  - reset state on the server / database

Some users run integration tests (majority) against a local development server and smoke tests (smaller set) against a deployed production app.


## Visit a page

```js
describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:8080') // change URL to match your dev URL
  })
})
```

Your can set the `baseUrl` in `cypress.config.ts`:

```ts
import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
  },
})
```
