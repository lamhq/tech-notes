# Tooling

## IDE Integration

When clicking on a file path or an error in the command log, Cypress will attempt to open the file on your system.

The file will open with the cursor located on the line and column of interest.

If you want to change the file opener, you can do so in the **Settings** tab of Cypress by clicking under **File Opener Preference**.


## Visual Studio Code

- [Cypress Fixture-IntelliSense](https://marketplace.visualstudio.com/items?itemName=JosefBiehler.cypress-fixture-intellisense):
  Supports your [cy.fixture()](/api/commands/fixture) by providing intellisense
  for existing fixtures.
- [Cypress Helper](https://marketplace.visualstudio.com/items?itemName=Shelex.vscode-cy-helper):
  Various helpers and commands for integration with Cypress.
- [Cypress Snippets](https://marketplace.visualstudio.com/items?itemName=andrew-codes.cypress-snippets):
  Useful Cypress code snippets.
- [Cypress Snippets](https://marketplace.visualstudio.com/items?itemName=CliffSu.cypress-snippets):
  This extension includes the newest and most common cypress snippets.
- [Open Cypress](https://marketplace.visualstudio.com/items?itemName=tnrich.vscode-extension-open-cypress):
  Allows you to open Cypress specs and single `it()` blocks directly from VS
  Code.
- [Test Utils](https://marketplace.visualstudio.com/items?itemName=chrisbreiding.test-utils):
  Easily add or remove `.only` and `.skip` modifiers with keyboard shortcuts or
  the command palette.


## Code Completion

### Triple slash directives

The simplest way to see IntelliSense when typing a Cypress command or assertion is to add a **triple-slash directive** to the head of your JavaScript or TypeScript testing file. This will turn the IntelliSense on a per file basis.

```js
// app.spec.js
/// <reference types="Cypress" />
```

If you write custom commands and provide TypeScript definitions for them, you can use the triple slash directives to show IntelliSense.

For example, if your custom commands are written in `cypress/support/commands.js` and you describe them in `cypress/support/index.d.ts` use:

```ts
// type definitions for Cypress object "cy"
/// <reference types="cypress" />

// type definitions for custom commands like "createDefaultTodos"
/// <reference types="../support" />
```

### Reference type declarations via `tsconfig`

Adding a `tsconfig.json` inside your `cypress` folder with the following configuration should get intelligent code completion working.

```json
{
  "compilerOptions": {
    "allowJs": true,
    "types": ["cypress"]
  },
  "include": ["**/*.*"]
}
```


## TypeScript

Cypress ships with official type declarations for TypeScript.

We recommend creating a `tsconfig.json` inside your `cypress` folder with the following configuration:

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["es5", "dom"],
    "types": ["cypress", "node"]
  },
  "include": ["**/*.ts"]
}
```

The `"types"` will tell the TypeScript compiler to only include type definitions from Cypress.


### Types for Custom Commands

When adding custom commands to the `cy` object, you can manually add their types to avoid TypeScript errors.

For example if you add the command `cy.dataCy` into your supportFile like this:

```js
// cypress/support/index.ts
Cypress.Commands.add('dataCy', (value) => {
  return cy.get(`[data-cy=${value}]`)
})
```

Then you can add the `dataCy` command to the global Cypress Chainable interface:

```js
// cypress/support/index.ts
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      dataCy(value: string): Chainable<JQuery<HTMLElement>>
    }
  }
}
```

In your specs, you can now use the custom command as expected:

```js
it('works', () => {
  // from your cypress/e2e/spec.cy.ts
  cy.visit('/')
  // IntelliSense and TS compiler should
  // not complain about unknown method
  cy.dataCy('greeting')
})
```
