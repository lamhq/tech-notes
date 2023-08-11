# Environment Variables

In Cypress, "environment variables" are variables that are accessible via `Cypress.env`. These are not the same as OS-level environment variables.

Environment variables are useful when:

- Values are different across developer machines.
- Values are different across multiple environments: (dev, staging, qa, prod)
- Values change frequently and are highly dynamic.


## Set environment variables

You can set environment variables by: 

- Set in your configuration file
- Create a `cypress.env.json`
- Export as CYPRESS_*
- Pass in the CLI as --env
- Set an environment variable within test configuration.


### `cypress.env.json`

You can create your own `cypress.env.json` file that Cypress will automatically check. Values in here will overwrite conflicting environment variables in your Cypress configuration.

This strategy is useful because if you add `cypress.env.json` to your
`.gitignore` file

```json
{
  "host": "veronica.dev.local",
  "api_server": "http://localhost:8888/api/v1/"
}
```

From test file:

```js
Cypress.env() // {host: 'veronica.dev.local', api_server: 'http://localhost:8888/api/v1'}
Cypress.env('host') // 'veronica.dev.local'
Cypress.env('api_server') // 'http://localhost:8888/api/v1/'
```

Benefits:
- Dedicated file just for environment variables.
- Enables you to generate this file from other build processes.
- Values can be different on each machine (if not checked into source control).
- Supports nested fields (objects), e.g. `{ testUser: { name: '...', email: '...' } }`.


### Test Configuration

```js
// change environment variable for single suite of tests
describe(
  'test against Spanish content',
  {
    env: {
      language: 'es',
    },
  },
  () => {
    it('displays Spanish', () => {
      cy.visit(`https://docs.cypress.io/${Cypress.env('language')}/`)
      cy.contains('¿Por qué Cypress?')
    })
    // change environment variable for single test
    it(
      'smoke test staging api',
      {
        env: {
          api: 'https://staging.myapi.com',
        },
      },
      () => {
        cy.request(Cypress.env('api')).its('status').should('eq', 200)
      }
    )
  }
)
```
