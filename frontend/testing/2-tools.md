# Tools

## Jest

Jest is a JavaScript test-runner. A test-runner is a piece of software that allows you to run tests to evaluate your app.

Jest is often also called a testing framework, as it comes with many other built-in features besides just running tests. Some of those features are:

- Assertion library
- Snapshot testing
- Code coverage
- Mocking library

Some well known alternatives to Jest are Mocha, Jasmine, and Karma.


## Testing Library

Testing library is not a test runner, but a set of utilities that will work together with a test runner like Jest or Mocha.

With the testing library we can test UI elements instead of testing the code responsible for rendering the UI (black box testing).

The testing library is actually a set of libraries, each created to achieve the same objective but adapted to work with different technologies such as React, Angular, Vue, Svelte, React Native and more... 

An alternative to testing library is Enzyme.


## Cypress

Cypress is an open source test-runner that allows you to execute your projects in an automated browser, in the same way a user would.

With Cypress, we can program what the browser will do (like visit a URL, click a button, complete and submit a form...) and check that each action is matched with the corresponding response.

*What's sweet about this is that the testing resembles A LOT to what the user will experience. And since the whole point of making software is the user, the closer we are to their perspective, the closer we should be to catching the most meaningful bugs in our code.*

Another nice feature of Cypress is "time travel". On Cypress's automated browser we can see all the test's we've written, and simply hover over them to see a graphical snapshot of its result. It's a very useful thing to better understand what's breaking and when.

Even though it can be used for unit and integration testing, Cypress is mostly used for end-to-end testing as it can easily evaluate complete features in a matter of seconds.

You can use Cypress to test anything that runs in a browser, so you can easily implement it on React, Angular, Vue, and so on.

Some alternatives to Cypress are Selenium and Puppeteer.


## Supertest

Supertest is a library that simulates HTTP requests. It's super handy to test back-end Node apps together with Jest


## Roundup

- Jest is the library that we'll use to write and run tests for JavaScript.
- Testing library works together with Jest, and provides us with functions and methods to test the UI directly, forgetting about the code behind it.
- Cypress runs your app in a simulated browser and checks if actions performed in the UI respond as expected.
- Supertest is a library that mocks HTTP requests and it can be used together with Jest to test back-end apps.
