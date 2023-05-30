# Querying Elements

## Cypress is Like jQuery

Cypress bundles jQuery and exposes many of its DOM traversal methods to you so you can work with complex HTML structures with ease using APIs you're already familiar with.

```js
// Each Cypress query is equivalent to its jQuery counterpart.
cy.get('#main-content').find('.article').children('img[src^="/static"]').first()
```

When Cypress can't find any matching DOM elements from its selector, Cypress automatically retries the query until either The element is found or A set timeout is reached.


## Querying by Text Content

```js
// Find an element in the document containing the text 'New Post'
cy.contains('New Post')

// Find an element within '.main' containing the text 'New Post'
cy.get('.main').contains('New Post')
```


## Customize timeout

Most commands can be customized with specific timeout periods:

```js
// Give this element 10 seconds to appear
cy.get('.my-slow-selector', { timeout: 10000 })
```

You can also set the timeout globally via the configuration setting: `defaultCommandTimeout`.
