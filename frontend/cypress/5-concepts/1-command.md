# Commands

## Commands, Queries and Assertions

There are some different types of commands: queries, assertions and actions.


## Commands are chained

- Cypress manages a Promise chain on your behalf
- A new Cypress chain starts with `cy.[command]`
- Commands are asynchronous and get queued for execution at a later time (because the DOM is a highly mutable object that constantly goes stale).
- **During execution**, each command **yield** a **subject** to the next command
- Some commands require a previous subject.
- Execution ends until the chain ends or an error is encountered.
- Don't continue a chain after acting on the DOM

Examples:

- `cy.contains()` yields a DOM element
- `.click()` yields the same subject it was originally given.
- `.click()` requires a DOM element from the previous command.


## Commands and queries are not promises

- You cannot use `async/await`
- You cannot race or run multiple commands at the same time (in parallel) becasue a lot of Cypress commands mutate the state of the browser
- You cannot add a `.catch` error handler to a failed command.

While the API may look similar to Promises, with it's `then()` syntax, Cypress commands and queries are not promises - they are serial commands passed into a central queue, to be executed asynchronously at a later date.

They are intentional decisions on Cypress' part, not technical limitations. The purpose is to create consistent, non-flaky tests that perform identically from one run to the next. 


## Conditional testing

> How do I create conditional control flow, using if/else? So that if an element does (or doesn't) exist, I choose what to do?

This type of conditional control flow ends up being non-deterministic. This means different test runs may behave differently, which makes them less deterministic and consistent.

As long as you are aware of the potential pitfalls with control flow, it is possible to do this in Cypress! 

Read more [here](https://docs.cypress.io/guides/core-concepts/conditional-testing)


## Using `.then()` to access subject

If you want to access the subject directly after a command, add a `.then()` to your command chain. 

If you wish to continue chaining commands after your
`.then()`, you'll need to specify the subject you want to
yield to those commands with a return value other than
`null` or `undefined`. Cypress will yield that to the next command for you.

```js
cy
  // Find the el with id 'some-link'
  .get('#some-link')

  .then(($myElement) => {
    // ...massage the subject with some arbitrary code

    // grab its href property
    const href = $myElement.prop('href')

    // strip out the 'hash' character and everything after it
    return href.replace(/(#.*)/, '')
  })
  .then((href) => {
    // href is now the new subject
    // which we can work with now
  })
```

Other example:

```ts
it('does not work as we expect', () => {
  cy.visit('/my/resource/path')

  cy.get('.awesome-selector')
    .click()
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


## Avoid loops

Using JavaScript loop commands like `while` can have unexpected effects.

*Let's say our application shows a random number on load. We want the test to stop when it finds the number 7. If any other number is displayed the test reloads the page and checks again. Here's the correct way:*

![](https://docs.cypress.io/img/guides/core-concepts/reload-page.gif)

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