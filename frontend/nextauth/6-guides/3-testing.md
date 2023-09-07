# Testing with Cypress

## Installation

To get started, install the dependencies:

```bash npm2yarn2pnpm
yarn add --dev cypress cypress-social-logins @testing-library/cypress
```

## Cypress config

```js title="cypress.config.ts" {3-4,10-14}
import { defineConfig } from 'cypress'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { GoogleSocialLogin } = require('cypress-social-logins').plugins

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      on('task', {
        GoogleSocialLogin,
      })
    },
  },
})
```


## Environment variables

```js title="cypress.env.json"
{
  "GOOGLE_USER": "username@company.com",
  "GOOGLE_PW": "password",
  "COOKIE_NAME": "next-auth.session-token",
  "SITE_NAME": "http://localhost:3000"
}
```


## Add npm scripts

```json
"test:e2e:open": "cypress open",
"test:e2e:run": "cypress run"
```


## Writing a test

```js title="cypress/integration/login.js"
describe("Login page", () => {
  before(() => {
    cy.log(`Visiting https://company.tld`)
    cy.visit("/")
  })
  it("Login with Google", () => {
    const username = Cypress.env("GOOGLE_USER")
    const password = Cypress.env("GOOGLE_PW")
    const loginUrl = Cypress.env("SITE_NAME")
    const cookieName = Cypress.env("COOKIE_NAME")
    const socialLoginOptions = {
      username,
      password,
      loginUrl,
      headless: true,
      logs: false,
      isPopup: true,
      loginSelector: `a[href="${Cypress.env(
        "SITE_NAME"
      )}/api/auth/signin/google"]`,
      postLoginSelector: ".unread-count",
    }

    return cy
      .task("GoogleSocialLogin", socialLoginOptions)
      .then(({ cookies }) => {
        cy.clearCookies()

        const cookie = cookies
          .filter((cookie) => cookie.name === cookieName)
          .pop()
        if (cookie) {
          cy.setCookie(cookie.name, cookie.value, {
            domain: cookie.domain,
            expiry: cookie.expires,
            httpOnly: cookie.httpOnly,
            path: cookie.path,
            secure: cookie.secure,
          })

          // remove the two lines below if you need to stay logged in
          // for your remaining tests
          cy.visit("/api/auth/signout")
          cy.get("form").submit()
        }
      })
  })
})
```