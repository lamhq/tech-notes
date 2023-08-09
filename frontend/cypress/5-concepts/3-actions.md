# Interacting With Elements

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

Actions commands automatically **wait** until the element reaches an "actionable" state by:

- Not being hidden
- Not being covered
- Not being disabled
- Not animating

See all actions [here](https://docs.cypress.io/guides/core-concepts/interacting-with-elements).
