# Retry-ability

- Almost all commands come with built-in retry-ability. 
- Retry-ability works without you noticing it.
- Without retry-ability, assertions would randomly fail. This would lead to flaky, inconsistent results.

Example: look at the chain of commands: 

```tsx
cy.get('.todoapp') // query
  .find('.todo-list li') // query
  .should('have.length', 1) // assertion
```

- If the assertion that follows `cy.find()` fails, then Cypress will requery the application's DOM (starting from the top of the list of chain).
- Then Cypress will try the assertion against the elements yielded from `cy.get().find()`.
- If the assertion still fails, Cypress continues retrying until the `cy.find()` timeout is reached.
