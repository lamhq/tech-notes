# Aliases

## Using Aliases to refer to Previous Subjects

```ts
cy.get('.my-selector')
  .as('myElement') // sets the alias
  .click()

/* many more actions */

cy.get('@myElement') // re-queries the DOM as before
  .click()
```

## Accessing alias using Sharing Context

Aliases are available as `this.*`:

```js
beforeEach(() => {
  // alias the $btn.text() as 'text'
  cy.get('button').invoke('text').as('text')
})

it('has access to text', function () {
  this.text // is now available
})
```

Mocha automatically shares contexts for us across all applicable hooks for each test. Additionally these aliases and properties are automatically cleaned up after each test.

```js
describe('parent', () => {
  beforeEach(() => {
    cy.wrap('one').as('a')
  })

  context('child', () => {
    beforeEach(() => {
      cy.wrap('two').as('b')
    })

    describe('grandchild', () => {
      beforeEach(() => {
        cy.wrap('three').as('c')
      })

      it('can access all aliases as properties', function () {
        expect(this.a).to.eq('one') // true
        expect(this.b).to.eq('two') // true
        expect(this.c).to.eq('three') // true
      })
    })
  })
})
```

## Accessing Fixtures using alias

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


## Intercepts

Aliases can also be used with `cy.intercept()`. Aliasing your intercepted routes enables you to:

- ensure your application makes the intended requests
- wait for your server to send the response
- access the actual request object for assertions

```js
cy.intercept('POST', '/users', { id: 123 }).as('postUser')

cy.get('form').submit()

cy.wait('@postUser').then(({ request }) => {
  expect(request.body).to.have.property('name', 'Brian')
})

cy.contains('Successfully created user: Brian')
```


## Requests

Aliases can also be used with [requests](https://docs.cypress.io/api/commands/request).

Here's an example of aliasing a request and accessing its properties later:

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