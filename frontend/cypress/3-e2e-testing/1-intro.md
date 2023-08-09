# End-to-End Testing

## Add a test file

Choose **Create new empty spec** button in The Launchpad.

![](https://docs.cypress.io/img/guides/end-to-end-testing/writing-your-first-end-to-end-test/create-new-empty-spec.png)


## Run test file

Once we've created a test file, you should see it in the list of end-to-end specs.

![](https://docs.cypress.io/img/guides/end-to-end-testing/writing-your-first-end-to-end-test/spec-list-with-new-spec.png)

Click on your spec and watch Cypress launch it.


## Test structure

The structure of your test should flow query -> query -> command or assertion(s).

It's best practice not to chain anything after an **action command**.

```js
describe('My First Test', () => {
  it('Gets, types and asserts', () => {
    cy.visit('https://example.cypress.io')

    cy.contains('type').click()

    // Should be on a new URL which
    // includes '/commands/actions'
    cy.url().should('include', '/commands/actions')

    // Get an input, type into it
    cy.get('.action-email').type('fake@email.com')

    //  Verify that the value has been updated
    cy.get('.action-email').should('have.value', 'fake@email.com')
  })
})
```


## Page Transitions

Cypress automatically detects things like a page transition event and will automatically halt running commands until the next page has finished loading.

You don't have to worry about commands accidentally running against a stale page, nor do you have to worry about running commands against a partially loaded page.

When Cypress's finding a DOM element, it waits **4 seconds** before timing out.

When Cypress detects a **page transition event**, it automatically increases the timeout to **60 seconds** for the single **PAGE LOAD** event.

These various timeouts are defined in the [Configuration](https://docs.cypress.io/guides/references/configuration#Timeouts) document.
