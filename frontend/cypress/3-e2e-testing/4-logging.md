# Logging in

All the good parts of your application most likely require an authenticated user. Here are some tips:

## Fully test the login flow -- but only once

```js
describe('The Login Page', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
    cy.exec('npm run db:reset && npm run db:seed')

    // seed a user in the DB that we can control from our tests
    // assuming it generates a random password for us
    cy.request('POST', '/test/seed/user', { username: 'jane.lane' })
      .its('body')
      .as('currentUser')
  })

  it('sets auth cookie when logging in via form submission', function () {
    // destructuring assignment of the this.currentUser object
    const { username, password } = this.currentUser

    cy.visit('/login')

    cy.get('input[name=username]').type(username)

    // {enter} causes the form to submit
    cy.get('input[name=password]').type(`${password}{enter}`)

    // we should be redirected to /dashboard
    cy.url().should('include', '/dashboard')

    // our auth cookie should be present
    cy.getCookie('your-session-cookie').should('exist')

    // UI should reflect this user being logged in
    cy.get('h1').should('contain', 'jane.lane')
  })
})
```

You'll likely also want to test your login UI for:

- Invalid username / password
- Username taken
- Password complexity requirements
- Edge cases like locked / deleted accounts


## Reusing the login code

Write a custom `cy.login()` command.

Lets make the above login example a custom command and add it to `cypress/support/commands.js` so it can be leveraged in any spec file:

```js
// In cypress/support/commands.js

Cypress.Commands.add('login', (username, password) => {
  cy.visit('/login')

  cy.get('input[name=username]').type(username)

  // {enter} causes the form to submit
  cy.get('input[name=password]').type(`${password}{enter}`, { log: false })

  // we should be redirected to /dashboard
  cy.url().should('include', '/dashboard')

  // our auth cookie should be present
  cy.getCookie('your-session-cookie').should('exist')

  // UI should reflect this user being logged in
  cy.get('h1').should('contain', username)
})

// In your spec file

it('does something on a secured page', function () {
  const { username, password } = this.currentUser
  cy.login(username, password)

  // ...rest of test
})
```


## Reusing login context

Cypress provides the `cy.session()` command that lets you cache the browser context associated with your user and reuse it for multiple tests without going through multiple login flows:

```js
Cypress.Commands.add('login', (username, password) => {
  cy.session(
    username,
    () => {
      cy.visit('/login')
      cy.get('input[name=username]').type(username)
      cy.get('input[name=password]').type(`${password}{enter}`, { log: false })
      cy.url().should('include', '/dashboard')
      cy.get('h1').should('contain', username)
    },
    {
      validate: () => {
        cy.getCookie('your-session-cookie').should('exist')
      },
    }
  )
})
```

**Third-Party Login**:

If your app implements login via a third-party authentication provider such as Auth0 or Okta, you can use the `cy.origin()` command to include their login pages as part of your authentication tests.
