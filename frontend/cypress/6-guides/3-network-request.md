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
