# Snippets

## Selections

```js
// use cy.contains to find an element with its text
// matching the given regular expression
cy.contains('[data-testid="greeting"]', /^Hello/)

cy.get('[data-testid="loading"]').should('not.exist')

cy.get(':radio').should('be.checked')
```


## Assertions

### Negative assertions

```js
cy.contains('first todo').should('not.have.class', 'completed')
cy.get('[data-testid="loading"]').should('not.be.visible')
```

### Attach multiple assertions to the same command

```js
cy.get('[data-testid="assertions-link"]')
  .should('have.class', 'active')
  .and('have.attr', 'href')
  .and('include', 'cypress.io')
```

### Test a loading element that first appears and then disappears

```js
// ✅ THE CORRECT WAY
cy.get('[data-testid="loading"]').should('be.visible')
cy.get('[data-testid="loading"]').should('not.be.visible')
```

### Should callback

If built-in assertions are not enough, you can write your own assertion function and pass it as a callback to the `.should()` command.

```js
cy.get('div').should(($div) => {
  expect($div).to.have.length(1)

  const className = $div[0].className

  // className will be a string like "main-abc123 heading-xyz987"
  expect(className).to.match(/heading-/)
})
```