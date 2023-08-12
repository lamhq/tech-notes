# Network Requests

## Testing Strategies
Cypress provides you access to the objects with information about the request, enabling you to make assertions about its properties.

Common testing scenarios:

- Asserting on a request's body
- Asserting on a request's url
- Asserting on a request's headers
- Stubbing a response's body
- Stubbing a response's status code
- Stubbing a response's headers
- Delaying a response
- Waiting for a response to happen

Within Cypress, you have the ability to stub responses or not.

Let's investigate both strategies, why you would use one versus the other, and why you should regularly use both.


### Use Server Responses

Requests that are not stubbed actually reach your server. By not stubbing your responses, you are writing true *end-to-end* tests.

Benefits:
- More likely to work in production
- Test coverage around server endpoints
- Great for traditional server-side HTML rendering

Downsides:
- you may have to seed a database before every test to generate state
- tests are often much slower than stubbed responses.
- Harder to test edge cases

Suggested Use
- Use sparingly
- Great for the critical paths of your application
- Helpful to have one test around the happy path of a feature


### Stub Responses

Stubbing responses enables you to control every aspect of the response, including the response body, the status, headers, and even network delay.

Benefits:
- Control of response bodies, status, and headers
- Can force responses to take longer to simulate network delay
- No code changes to your server or client code
- Fast, < 20ms response times

Downsides:
- No guarantee your stubbed responses match the actual data the server sends
- No test coverage on some server endpoints
- Not as useful if you're using traditional server side HTML rendering

Suggested Use:
- Use for the vast majority of tests
- Mix and match, typically have one true end-to-end test, and then stub the rest
- Perfect for JSON APIs


## Stubbing

Stubbing reponse of a route:

```javascript
cy.intercept(
  {
    method: 'GET', // Route all GET requests
    url: '/users/*', // that have a URL that matches '/users/*'
  },
  [] // and force the response to be: []
).as('getUsers') // and assign an alias
```

When a new test runs, Cypress will restore the default behavior and remove all routes and stubs. 

Using fixture for stubbing network reponse:

```ts
// we set the response to be the activites.json fixture
cy.intercept('GET', '/activities/*', { fixture: 'activities.json' })
```

By default fixtures are stored in `/cypress/fixtures/`


## Waiting

Here is an example of aliasing requests and then subsequently waiting on them:
```tsx
cy.intercept('/activities/*', { fixture: 'activities' }).as('getActivities')
cy.intercept('/messages/*', { fixture: 'messages' }).as('getMessages')

// visiting the dashboard should make requests that match
// the two routes above
cy.visit('http://localhost:8888/dashboard')

// pass an array of Route Aliases that forces Cypress to wait
// until it sees a response for each request that matches
// each of these aliases
cy.wait(['@getActivities', '@getMessages'])

// these commands will not run until the wait command resolves above
cy.get('h1').should('contain', 'Dashboard')
```

If you would like to check the response data of each response of an aliased route, you can use several `cy.wait()` calls.

```ts
cy.intercept({
  method: 'POST',
  url: '/myApi',
}).as('apiCheck')

cy.visit('/')
cy.wait('@apiCheck').then((interception) => {
  assert.isNotNull(interception.response.body, '1st API call has data')
})

cy.wait('@apiCheck').then((interception) => {
  assert.isNotNull(interception.response.body, '2nd API call has data')
})

cy.wait('@apiCheck').then((interception) => {
  assert.isNotNull(interception.response.body, '3rd API call has data')
})
```
