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

### Configuration file

```js
import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: '128076ed-9868-4e98-9cef-98dd8b705d75',
  env: {
    login_url: '/login',
    products_url: '/products',
  },
})
```

Test file:

```js
Cypress.env() // {login_url: '/login', products_url: '/products'}
Cypress.env('login_url') // '/login'
Cypress.env('products_url') // '/products'
```

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


### `CYPRESS_*`

Any exported environment variables set on the command line or in your CI provider that start with either `CYPRESS_` or `cypress_` will automatically be parsed by Cypress.

Environment variables that match a corresponding configuration option will override any value set in the Cypress configuration.

```shell
export CYPRESS_VIEWPORT_WIDTH=800
export CYPRESS_VIEWPORT_HEIGHT=600
```


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


## Overriding Configuration

If your environment variables match a standard configuration key, then instead of setting an `environment variable` they will instead override the configuration value.

**Change the `baseUrl` configuration value / not set env var in
`Cypress.env()`**

```shell
export CYPRESS_BASE_URL=http://localhost:8080
```

**'foo' does not match config / sets env var in `Cypress.env()`**

```shell
export CYPRESS_FOO=bar
```