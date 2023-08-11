# Debugging

## Using `debugger`

you can use `debugger` inside `.then()` function. This can help you understand the order in which commands are run. This also enables you to inspect the objects that Cypress yields you in each command.

```js
cy.get('button').then(($btn) => {
  // inspect $btn <object>
  debugger

  cy.get('[data-testid="countries"]')
    .select('USA')
    .then(($select) => {
      // inspect $select <object>
      debugger

      cy.clock().then(($clock) => {
        // inspect $clock <object>
        debugger

        $btn // is still available
        $select // is still available too
      })
    })
})
```


## Using `.debug()`

Cypress also exposes a shortcut for debugging commands,
[`.debug()`

```ts
it('let me debug like a fiend', () => {
  cy.visit('/my/page/path')

  cy.get('[data-testid="selector-in-question"]').debug()
})
```


## Step through test commands

You can run the test command by command using the `.pause()` command.

```javascript
it('adds items', () => {
  cy.pause()
  cy.get('[data-testid="new-todo"]')
  // more commands
})
```


## Run Cypress command from the Developer Tools console

```js
cy.now('task', 'database', 123).then(console.log)
```
