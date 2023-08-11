# Querying Elements

## Cypress is Like jQuery

Cypress bundles jQuery and exposes many of its DOM traversal methods to you so you can work with complex HTML structures with ease using APIs you're already familiar with.

```js
// Each Cypress query is equivalent to its jQuery counterpart.
cy.get('#main-content').find('.article').children('img[src^="/static"]').first()
```

When Cypress can't find any matching DOM elements from its selector, Cypress automatically retries the query until either The element is found or a set timeout is reached.

You don't need to write `.should('exist')` after querying the DOM.

## Customize timeout

```ts
// Give this element 10 seconds to appear
cy.get('.my-slow-selector', { timeout: 10000 })
```

Disable retry:

```ts
// check synchronously that the element does not exist (no retry)
// for example just after a server-side render
cy.get('[data-testid="ssr-error"]', { timeout: 0 }).should('not.exist')
```


You can also set the timeout globally via the configuration setting: `defaultCommandTimeout`.


## Directly accessing DOM element

In Cypress, when you want to interact with a DOM element directly, call `.then()` with a callback function that receives the element as its first argument.

```tsx
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


## API

- `cy.contains(content)`: get the DOM element containing the text
- `cy.get()`: Get one or more DOM elements by selector

```js
it('finds the content "type"', () => {
  cy.visit('https://example.cypress.io')

  cy.contains('type')

  cy.get('.main').contains('New Post')
})
```

See all queries [here](https://docs.cypress.io/api/commands/contains).
