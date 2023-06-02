# Aliases

## Sharing Context

Share objects between your hooks and your tests:

```js
beforeEach(() => {
  // alias the $btn.text() as 'text'
  cy.get('button').invoke('text').as('text')
})

it('has access to text', function () {
  this.text // is now available
})
```


## Accessing Fixtures

Often times you may load a fixture in a `beforeEach` hook but want to utilize the values in your tests.

```js
beforeEach(() => {
  // alias the users fixtures
  cy.fixture('users.json').as('users')
})

it('utilize users in some way', function () {
  // use the special '@' syntax to access aliases
  // which avoids the use of 'this'
  cy.get('@users').then((users) => {
    // access the users argument
    const user = users[0]

    // make sure the header contains the first
    // user's name
    cy.get('header').should('contain', user.name)
  })
})
```

Accessing aliases as properties with `this.*` will not work if you use arrow functions for your tests or hooks.

When using `this.users`, it is stored on the context when it is first evaluated. But when using `cy.get('@users')`, any queries are re-evaluated every time the alias is accessed.


## Reference DOM Elements

```js
// alias all of the tr's found in the table as 'rows'
cy.get('table').find('tr').as('rows')
```

```js
// Cypress returns the reference to the <tr>'s
// which allows us to continue to chain commands
// finding the 1st row.
cy.get('@rows').first().click()
```


## Requests

```js
cy.request('https://jsonplaceholder.cypress.io/comments').as('comments')

// other test code here

cy.get('@comments').should((response) => {
  if (response.status === 200) {
      expect(response).to.have.property('duration')
    } else {
      // whatever you want to check here
    }
  })
})
```

## Aliases are reset before each test

All aliases are reset before each test. A common user mistake is to create aliases using the `before` hook. Such aliases work in the first test only!

```js
// 🚨 THIS EXAMPLE DOES NOT WORK
before(() => {
  // notice this alias is created just once using "before" hook
  cy.wrap('some value').as('exampleValue')
})

it('works in the first test', () => {
  cy.get('@exampleValue').should('equal', 'some value')
})

// NOTE the second test is failing because the alias is reset
it('does not exist in the second test', () => {
  // there is not alias because it is created once before
  // the first test, and is reset before the second test
  cy.get('@exampleValue').should('equal', 'some value')
})
```

The solution is to create the aliases before each test using the beforeEach hook:

```js
// ✅ THE CORRECT EXAMPLE
beforeEach(() => {
  // we will create a new alias before each test
  cy.wrap('some value').as('exampleValue')
})

it('works in the first test', () => {
  cy.get('@exampleValue').should('equal', 'some value')
})

it('works in the second test', () => {
  cy.get('@exampleValue').should('equal', 'some value')
})
```