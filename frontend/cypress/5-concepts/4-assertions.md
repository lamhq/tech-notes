# Assertions

Assertions are commands that enable you to describe the desired state of your application.

Cypress will automatically wait until your elements reach this state, or fail the test if the assertions don't pass.

```js
cy.get(':checkbox').should('be.disabled')

cy.get('form').should('have.class', 'form-horizontal')

cy.get('input').should('not.have.value', 'US')
```

See all assertions [here](https://docs.cypress.io/guides/references/assertions).


## Default (implicit) Assertions

Many commands have default, built-in assertions without needing an explicit assertion

- `cy.visit()` expects the page to send text/html content with a 200 status code.
- `cy.request()` expects the remote server to exist and provide a response.
- `cy.contains()` expects the element with content to eventually exist in the DOM.
- `cy.get()` expects the element to eventually exist in the DOM.
- `.find()` also expects the element to eventually exist in the DOM.
- `.type()` expects the element to eventually be in a typeable state.
- `.click()` expects the element to eventually be in an actionable state.
- `.its()` expects to eventually find a property on the current subject.

## Wait & timeout

- Cypress will automatically wait for elements to pass their default assertions.
- Certain commands may have a specific requirement that causes them to immediately fail without retrying, such as `cy.request()`.
- DOM queries automatically retry and wait for their corresponding elements to exist before failing.
- Action commands automatically wait for their element to reach an actionable state before failing.

Example:

```js
cy
  // there is a default assertion that this
  // button must exist in the DOM before proceeding
  .get('button')

  // before issuing the click, this button must be "actionable"
  // it cannot be disabled, covered, or hidden from view.
  .click()
```

### Default timeout

Cypress offers several different timeout values based on the type of command.

- `cy.visit()` loads a remote page and does not resolve
  _until all of the external resources complete their loading phase_. Default timeout is set to `60000ms`.
- `cy.exec()` runs a system command such as _seeding a
  database_. Default
  timeout is set to `60000ms`.
- `cy.wait()` actually uses 2 different timeouts. When
  waiting for a
  routing alias, we wait
  for a matching request for `5000ms`, and then additionally for the server's
  response for `30000ms`.
- Most other commands including all DOM queries to time out by default after 4000ms.


## Reversing the Default Assertion

Sometimes you wish to wait until elements don't exist:

```js
cy.get('button.close').click()

// now Cypress will wait until this
// <button> is not in the DOM
cy.get('button.close').should('not.exist')

// and now make sure this #modal does not exist in the DOM
// and automatically wait until it's gone!
cy.get('#modal').should('not.exist')
```


## Assert object has property

```ts
// create an empty object
const obj = {}

// set the 'foo' property after 1 second
setTimeout(() => {
  obj.foo = 'bar'
}, 1000)

// .its() will wait until the 'foo' property is on the object
cy.wrap(obj).its('foo')
```


## Writing Assertions

There are two ways to write assertions in Cypress:

1. **Implicit Subjects:** Using `.should()` or `.and()`.
2. **Explicit Subjects:** Using `expect`.


### Implicit Subjects

This is handy when you need to assert multiple things against a single subject quickly.

```ts
cy.get('#header a')
  .should('have.class', 'active')
  .and('have.attr', 'href', '/users')
```

### Explicit Subjects

Allow:
- Assert multiple things about the same subject
- Massage the subject in some way prior to making the assertion

The `.should()` assertion allows us to pass a callback
function that takes the yielded subject as its first argument. This works like
`.then()`, except Cypress automatically **waits and
retries** for everything inside of the callback function to pass.

```ts
cy.get('p').should(($p) => {
  // massage our subject from a DOM element
  // into an array of texts from all of the p's
  let texts = $p.map((i, el) => {
    return Cypress.$(el).text()
  })

  // jQuery map returns jQuery object
  // and .get() converts this to an array
  texts = texts.get()

  // array should have length of 3
  expect(texts).to.have.length(3)

  // with this specific content
  expect(texts).to.deep.eq([
    'Some text from first p',
    'More text from second p',
    'And even more text from third p',
  ])
})
```
