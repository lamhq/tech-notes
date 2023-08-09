# Folder structure

After adding a new project, Cypress will automatically scaffold out a suggested folder structure. By default it will create:

```
E2E:
/cypress.config.ts
/cypress/fixtures/example.json
/cypress/support/commands.ts
/cypress/support/e2e.ts
```

## Spec files

Test files are located in `cypress/e2e` by default.

## Fixture Files

Fixtures are used as external pieces of static data that can be used by your tests. Fixture files are located in `cypress/fixtures` by default.


## Asset Files

- Download Files: `/cypress/downloads`
- Screenshot Files: `/cypress/screenshots`
- Video Files: `/cypress/videos`

You may consider adding these folders to your `.gitignore` file to ignore checking these files into source control.


## Support file

To include code before your test files, set the `supportFile` path. By default, `supportFile` is set to look for one of the following files:

```bash
# Component
cypress/support/component.js

# E2E
cypress/support/e2e.js
```

The support file is a great place to put reusable behavior such as **custom commands** or **global overrides** that you want applied and available to all of your spec files.

From your support file you can import or require other files to keep things organized.

You can define behaviors in a `before` or `beforeEach` within any of the `cypress/support` files:

```js
beforeEach(() => {
  cy.log('I run before every test in every spec file!!!!!!')
})
```

### Execution

Support files run before every single spec file. You don't have to import this file.

### Troubleshooting

If Cypress does not find the spec files for some reason, you can troubleshoot its logic by opening or running Cypress with debug logs enabled:

```bash
DEBUG=cypress:server:specs npx cypress open
# or
DEBUG=cypress:server:specs npx cypress run
```


## What files should be in '.gitignore file' ?

- `screenshotsFolder`: `cypress/screenshots`
- `videosFolder`: `cypress/videos`
