# Test Isolation

Test isolation is writing tests such that tests do not rely on the test before it.

Clearing the page and setting the URL to is one mechanism Cypress used to ensure test isolation.

This behavior allows each test to have a clean slate without app state leaking, whether initially or unexpectedly, into the next test

The test isolation is a global configuration and can be overridden for end-to-end testing at the describe level with the `testIsolation` option.

## Test Isolation in End-to-End Testing

| testIsolation | beforeEach test | cy.session() |
|---|---|---|
| `true` | - clears page by visiting `about:blank`<br/>- clears cookies in all domains<br/>- local storage in all domains<br/>- session storage in all domains | - clears page by visiting `about:blank`<br/>- clears cookies in all domains<br/>- local storage in all domains<br/>- session storage in all domains |
| `false` | does not alter the current browser context | <br/>- clears cookies in all domains<br/>- local storage in all domains<br/>- session storage in all domains |
