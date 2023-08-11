# Interacting With Elements

## Overview

```js
cy.get('textarea.post-body').type('This is an excellent post.')
```

- `.blur()` - Make a focused DOM element blur.
- `.focus()` - Focus on a DOM element.
- `.clear()` - Clear the value of an input or textarea.
- `.check()` - Check checkbox(es) or radio(s).
- `.uncheck()` - Uncheck checkbox(es).
- `.select()` - Select an `<option>` within a `<select>`.
- `.click()`
- `.dblclick()`
- `.rightclick()`
- `.type()`
- `.clear()`
- `.trigger()`
- `.selectFile()`

Actions commands automatically **wait** until the element reaches an "actionable" state by:

- Not being hidden
- Not being covered
- Not being disabled
- Not animating

See all actions [here](https://docs.cypress.io/guides/core-concepts/interacting-with-elements).


## How action commands work?

Under the hood, Cypress fires the events a browser would fire thus causing your application's event bindings to fire.

Prior to issuing any of the action commands, we check the current state of the DOM and take some actions to ensure the DOM element is "ready" (actionable) to receive the action:

- Scroll the element into view.
- Ensure the element is not hidden.
- Ensure the element is not disabled.
- Ensure the element is not detached.
- Ensure the element is not readonly.
- Ensure the element is not animating.
- Ensure the element is not covered.
- Scroll the page if still covered by an element with fixed position.
- Fire the event at the desired coordinates.

Cypress will watch the DOM - re-running the queries that yielded the current subject - until an element passes all of these checks for the duration of configured timeout.

Whenever Cypress cannot interact with an element, it could fail at any of the above steps.

See more at [here](https://docs.cypress.io/guides/core-concepts/interacting-with-elements).


## Forcing

Force the action commands to fire even if the element isn't considered 'actionable'.

```js
// force the click and all subsequent events
// to fire even if this element isn't considered 'actionable'
cy.get('button').click({ force: true })
```
