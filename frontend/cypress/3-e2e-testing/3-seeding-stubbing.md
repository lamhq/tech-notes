# Seeding & Stubbing

## Seeding data

Traditionally when writing e2e tests, before you automate the browser you do some kind of **set up and tear down** on the server:
- generate a user
- import fixtures or factories.

You generally have three ways to facilitate this with Cypress:

- `cy.exec()` - to run system commands
- `cy.task()` - to run code in Node via the `setupNodeEvents` function
- `cy.request()` - to make HTTP requests

```js
describe('The Home Page', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
    cy.exec('npm run db:reset && npm run db:seed')

    // seed a post in the DB that we control from our tests
    cy.request('POST', '/test/seed/post', {
      title: 'First Post',
      authorId: 1,
      body: '...',
    })

    // seed a user in the DB that we can control from our tests
    cy.request('POST', '/test/seed/user', { name: 'Jane' })
      .its('body')
      .as('currentUser')
  })

  it('successfully loads', () => {
    // this.currentUser will now point to the response
    // body of the cy.request() that we could use
    // to log in or work with in some way

    cy.visit('/')
  })
})
```

### Limitation

- it adds a lot of complexity
- You will be battling synchronizing the state between your server and your browser
- tests may build up state that may affect other tests
- you'll always need to set up / tear down the state before tests (which is slow).


## Stubbing the server

- Stubbing the server forces the server to respond with whatever you want it to, allows bypassing the need to communicate with the actual server
- By stubbing JSON responses, state synchronization between server and browser is avoided
- Tests won't mutate state and won't affect other tests
- Building the application without relying on the server's contract is possible with stubbing

### Limitation

You don't have the guarantees that these response payloads actually match what the server will send.

To get around this:

- Have the server generate all of the fixture stubs ahead of time.
- Write a single e2e test without stubs, and then stub the rest.
