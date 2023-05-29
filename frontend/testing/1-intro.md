# Testing

## What is Testing?

- Testing is the practice of checking if a piece of software runs as expected.
- Testing helps identify errors, gaps or missing requirements in the software
- Fixing issues before shipping code to production is crucial
- Thoroughly testing code improves project reliability
- It saves later bug-fixing time and hence reduces costs
- Improves the chance of customer satisfaction with the product.

A test suite is a group of tests that check a particular feature or an entire app.


## Different Types of Tests

### Manual vs Automated testing

Depending on the tools we use to test our software, we can classify testing into manual or automated testing.

**Manual testing** is the practice of "clicking around" and manually checking all the features our product has, simulating what an actual user would do.

**Automated testing** is done through code, writing programs that check how our application runs.


### Functional vs Non-functional testing

**Functional testing** refers to the actual features of our product. For example, if we have a blog platform, functional testing should assure the users can create new articles, edit those articles, browse through articles written by other people, and so on.

When it comes to functional testing, most libraries work in a similar way:

- First we define what piece of code we want to test.
- Then we provide that piece of code some sort of input or execute an action on it.
- Then we define what that piece of code should do given the input/action we performed.
- And finally we will compare what that piece of code actually did against what we said it should do.

If it did what we said it should, the test passed. If it didn't, it failed.


**Non-functional testing** refers to anything that's not strictly related to the core features of our product. And that again can be classified into different categories, for example:

- Stress testing checks how infrastructure responds to heavy usage.
- Security testing checks if an application is vulnerable to common hacking attacks.
- Accessibility testing checks if an application is coded in a way that is accessible for people with different disabilities.


### Unit vs Integration testing vs End-to-end testing

Another way to classify testing is depending how broad or comprehensive it is.

**Unit testing** aims to test individual functions, methods or small chunks of code in an independent way. In unit testing, small pieces of code are checked in an isolated way.

**Integration testing** checks how individual pieces of code interact with each other and work together. In integration testing, we put pieces together and see if they interact correctly.

**End-to-end testing**, also known as E2E, executes programs in a simulated environment that emulates actual user behavior.

Having a website as an example, our code would open in an actual browser and all the features would be executed in the same way a user would use them. E2E testing is a lot like manual testing in that sense, but fully automated.

E2E testing is the most broad or comprehensive type of these three, as it evaluates whole features and behaviors, not specific parts of our code.


### White box vs Black box vs Grey box testing

The last classification we're going to see depends on how much our tests focus on implementation details or user experience.

We talk about **"white box" testing** when we test implementation details.

*Let's say we have a simple website with a button that, when it gets clicked, it opens a modal. In our code, the button has a click event listener that executes a function. That function changes the CSS class of our modal HTML element, and that gets the modal rendered in the screen.*

*Under this paradigm we could test that the button click executes the corresponding function, and that after the function execution, the CSS class of our modal element is changed accordingly.*

In contrast, **"black box" testing** focus on testing what the user should perceive.

**"grey box" testing** is just a combination of the previous two.

**These different types of tests aren't necessarily mutually exclusive**. They can and often are implemented at the same time on the same projects.

It's very common to have both manual and automated testing, functional and non-functional testing, unit and E2E testing ... The idea will always be to try to anticipate and solve the greatest possible number of problems in reasonable time and effort.


## When to Test

Some people like to test their app once it's been fully developed.

Others like to write tests at the same time they code the application, and test each feature as it's being developed.

Others like to write tests first before anything else, defining in this way the minimum requirements for the program to accomplish. And then they code the app in a way that passes those tests as fast as possible (this is called test driven development or TDD).

Once you have an app or a whole feature developed, and you have a test suite in place, another common practice is to run your tests each time you make any kind of modification to the codebase, to verify nothing gets broken.

Lastly, if you have a CI/CD system in place, it's common to automate the execution of tests before any deployment. So that if any test fails, the deployment is stopped and some kind of alert is dispatched.
