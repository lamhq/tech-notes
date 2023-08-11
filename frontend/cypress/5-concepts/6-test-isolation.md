# Test Isolation

Test isolation is writing tests such that tests do not rely on the test before it.

Cypress will start each test with a clean test slate by restoring and clearing all:

- aliases
- clock mocks
- intercepts
- spies
- stubs
- viewport changes

Disabling test isolation may improve the overall performance of end-to-end tests, however, it can also cause state to "leak" between tests.


## Test Isolation in End-to-End Testing

The test isolation is a global configuration and can be overridden for end-to-end testing at the `describe` level with the `testIsolation` option.

| testIsolation | beforeEach test | cy.session() |
|---|---|---|
| `true` | - clears page by visiting `about:blank`<br/>- clears cookies in all domains<br/>- local storage in all domains<br/>- session storage in all domains | - clears page by visiting `about:blank`<br/>- clears cookies in all domains<br/>- local storage in all domains<br/>- session storage in all domains |
| `false` | does not alter the current browser context | <br/>- clears cookies in all domains<br/>- local storage in all domains<br/>- session storage in all domains |
