# Writing tests

## Test Structure

The test interface, borrowed from Mocha, provides `describe()`, `context()`, `it()` and `specify()`.

`context()` is identical to `describe()` and `specify()` is identical to `it()`, so choose whatever terminology works best for you.

```js
describe('Unit test our math functions', () => {
  it('can add numbers', () => {
    expect(add(1, 2)).to.eq(3)
  })

  it('can subtract numbers', () => {
    expect(subtract(5, 12)).to.eq(-7)
  })
})  
```

## Hooks

Cypress also provides hooks (borrowed from Mocha)

```js
before(() => {
  // root-level hook
  // runs once before all tests
})

beforeEach(() => {
  // root-level hook
  // runs before every test block
})

afterEach(() => {
  // runs after each test block
})

after(() => {
  // runs once all tests are done
})

describe('Hooks', () => {
  before(() => {
    // runs once before all tests in the block
  })

  beforeEach(() => {
    // runs before each test in the block
  })

  afterEach(() => {
    // runs after each test in the block
  })

  after(() => {
    // runs once after all tests in the block
  })
})
```

The order of hook and test execution is as follows:

- All `before()` hooks run (once)
- Any `beforeEach()` hooks run
- Tests run
- Any `afterEach()` hooks run
- All `after()` hooks run (once)


## Excluding and Including Tests

To run a specified suite or test, append `.only` to the function.

```js
describe('Unit Test FizzBuzz', () => {
  it.only('returns "fizz" when number is multiple of 3', () => {
    numsExpectedToEq([9, 12, 18], 'fizz')
  })

  it('returns "buzz" when number is multiple of 5', () => {
    numsExpectedToEq([10, 20, 25], 'buzz')
  })
})
```

To skip a specified suite or test, append `.skip()` to the function. All nested
suites will also be skipped.

```js
it.skip('returns "fizz" when number is multiple of 3', () => {
  numsExpectedToEq([9, 12, 18], 'fizz')
})
```


## Test Configuration

It is possible to apply test configuration values
to a suite or test. Pass a configuration object to the test or suite function as the second argument.

Skip tests if running in Chrome browsers:

```js
describe('When NOT in Chrome', { browser: '!chrome' }, () => {
  it('Shows warning', () => {
    // ...
  })
})
```

Configure the number of retry attempts during `cypress run` or `cypress open`:

```js
it('should redirect unauthenticated user to sign-in page', {
    retries: {
      runMode: 3,
      openMode: 2
    }
  } () => {
    // test code...
  })
})
```

## Dynamically Generate Tests

```js
describe('if your app uses jQuery', () => {
  ;['mouseover', 'mouseout', 'mouseenter', 'mouseleave'].forEach((event) => {
    it('triggers event: ' + event, () => {
      // if your app uses jQuery, then we can trigger a jQuery
      // event that causes the event callback to fire
      cy.get('#with-jquery')
        .invoke('trigger', event)
        .get('[data-testid="messages"]')
        .should('contain', 'the event ' + event + 'was fired')
    })
  })
})
```

The code above will produce a suite with 4 tests:

```text
> if your app uses jQuery
  > triggers event: 'mouseover'
  > triggers event: 'mouseout'
  > triggers event: 'mouseenter'
  > triggers event: 'mouseleave'
```


## Assertion Styles

Cypress supports both BDD (`expect`/`should`) and TDD (`assert`) style plain assertions.

```js
it('can add numbers', () => {
  expect(add(1, 2)).to.eq(3)
})

it('can subtract numbers', () => {
  assert.equal(subtract(5, 12), -7, 'these numbers are equal')
})
```

## Test statuses

- Passed
- Failed
- Pending
- Skipped


## Watching tests

When running in using `cypress open`, Cypress watches the filesystem for changes to your spec files.

### What is watched?

#### Files

- [Cypress configuration](/guides/references/configuration)
- [cypress.env.json](/guides/guides/environment-variables)

#### Folders

- E2E directory (`cypress/e2e/` by default)
- Support directory (`cypress/support/` by default)


### What isn't watched?

Everything else; this includes, but isn't limited to, the following:

- Your application code
- `node_modules`
- `cypress/fixtures/`
