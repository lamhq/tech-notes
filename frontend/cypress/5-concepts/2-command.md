# Commands

Cypress uses to chain commands together. It manages a Promise chain on your behalf, with each command yielding a 'subject' to the next command, until the chain ends or an error is encountered.

## Interacting With Elements

```js
cy.get('textarea.post-body').type('This is an excellent post.')
```

- `.blur()` - Make a focused DOM element blur.
- `.focus()` - Focus on a DOM element.
- `.clear()` - Clear the value of an input or textarea.
- `.check()` - Check checkbox(es) or radio(s).
- `.uncheck()` - Uncheck checkbox(es).
- `.select()` - Select an `<option>` within a `<select>`.
- `.dblclick()` - Double-click a DOM element.
- `.rightclick()` - Right-click a DOM element.

These commands ensures that the element is able to be interacted with:

- Not being hidden
- Not being covered
- Not being disabled
- Not animating


## Asserting About Elements

Assertions are commands that enable you to describe the desired state of your application.

Cypress will automatically wait until your elements reach this state, or fail the test if the assertions don't pass.

```js
cy.get(':checkbox').should('be.disabled')

cy.get('form').should('have.class', 'form-horizontal')

cy.get('input').should('not.have.value', 'US')
```

### Default Assertions

Many commands have default, built-in assertions (or rather have requirements that may cause it to fail) without needing an explicit assertion

- `cy.visit()` expects the page to send text/html content with a 200 status code.
- `cy.request()` expects the remote server to exist and provide a response.
- `cy.contains()` expects the element with content to eventually exist in the DOM.
- `cy.get()` expects the element to eventually exist in the DOM.
- `.find()` also expects the element to eventually exist in the DOM.
- `.type()` expects the element to eventually be in a typeable state.
- `.click()` expects the element to eventually be in an actionable state.
- `.its()` expects to eventually find a property on the current subject.

```js
// .its() will wait until the 'foo' property is on the object
cy.wrap(obj).its('foo')
```

Cypress will automatically wait for elements to pass their default assertions.

```js
cy
  // there is a default assertion that this
  // button must exist in the DOM before proceeding
  .get('button')

  // before issuing the click, this button must be "actionable"
  // it cannot be disabled, covered, or hidden from view.
  .click()
```

All DOM commands automatically wait for their elements to exist in the DOM. You never need to write `.should('exist')` after querying the DOM.

Most commands give you the flexibility to override or bypass the default ways they can fail, typically by passing a `{force: true}` option.

### Reversing the Default Assertion

Most of the time, when querying for elements, you expect them to eventually exist. But sometimes you wish to wait until they don't exist.

```js
cy.get('button.close').click()

// now Cypress will wait until this
// <button> is not in the DOM
cy.get('button.close').should('not.exist')

// and now make sure this #modal does not exist in the DOM
// and automatically wait until it's gone!
cy.get('#modal').should('not.exist')
```


## Subject

A command in a Cypress chain can yield a value or require a value from the previous command.

```js
cy.clearCookies() // Yields null
  .visit('/fixtures/dom.html') // Does not care about the previous subject.

cy.get('.main-container') // Yields an array of matching DOM elements
  .contains('Headlines') // Yields the first DOM element containing content
  .click() // Yields same DOM element from previous command.
```

Remmember: **Don't continue a chain after acting on the DOM**.

## Aliases

To work around the need to reference elements, Cypress has a feature known as aliasing. Aliasing helps you to store and save references for future use.

```js
cy.get('.my-selector')
  .as('myElement') // sets the alias
  .click()

/* many more actions */

cy.get('@myElement') // re-queries the DOM as before
  .click()
```

## Commands Are Asynchronous

Cypress commands don't do anything at the moment they are invoked, but rather enqueue themselves to be run later.

Cypress doesn't kick off the browser automation until the test function exits.

If you want to jump into the command flow and get your hands on the subject directly, add a `.then()` to your command chain. When the previous command resolves, it will call your callback function with the yielded subject as the first argument.

```js
it('does not work as we expect', () => {
  cy.visit('/my/resource/path') // Nothing happens yet

  cy.get('.awesome-selector') // Still nothing happening
    .click() // Nope, nothing
    .then(() => {
      // placing this code inside the .then() ensures
      // it runs after the cypress commands 'execute'
      let el = Cypress.$('.new-el') // evaluates after .then()

      if (el.length) {
        cy.get('.another-selector')
      } else {
        cy.get('.optional-selector')
      }
    })
})

// Ok, the test function has finished executing...
// We've queued all of these commands and now
// Cypress will begin running them in order!
```

## Why can't I use async / await?

While the API may look similar to Promises, with it's `then()` syntax, Cypress commands and queries are not promises - they are serial commands passed into a central queue, to be executed asynchronously at a later date.

These commands are designed to deliver deterministic, repeatable and consistent tests.

Commands also have some design choices that developers who are used to promise-based testing may find unexpected. They are intentional decisions on Cypress' part, not technical limitations.

- You cannot race or run multiple commands at the same time (in parallel).
- You cannot add a `.catch` error handler to a failed command.

The whole purpose of Cypress (and what makes it very different from other testing tools) is to create consistent, non-flaky tests that perform identically from one run to the next. 


## Avoid loops

Using JavaScript loop commands like `while` can have unexpected effects.

*Let's say our application shows a random number on load. We want the test to stop when it finds the number 7. If any other number is displayed the test reloads the page and checks again. Here's the correct way:*

```js
const checkAndReload = () => {
  // get the element's text, convert into a number
  cy.get('#result')
    .should('not.be.empty')
    .invoke('text')
    .then(parseInt)
    .then((number) => {
      // if the expected number is found
      // stop adding any more commands
      if (number === 7) {
        cy.log('lucky **7**')

        return
      }

      // otherwise insert more Cypress commands
      // by calling the function after reload
      cy.wait(500, { log: false })
      cy.reload()
      checkAndReload()
    })
}

cy.visit('public/index.html')
checkAndReload()
```