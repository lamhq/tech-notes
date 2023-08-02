# Introduction

## Version

This document is applied for version: 14.0.0

This guide is for React 18 and later. For versions before React 18, please use [react-hooks-testing-library](https://react-hooks-testing-library.com/).


## Why Do You Need to Write Unit Tests?

As the application grows, it might be difficult to test all the scenarios in the application and you might miss something.

Even a small change might break the application if all the major functionality is not tested properly.

It is recommended writing unit test cases covering all those scenarios which you're manually going through as a user.


## What is the React Testing Library?

The React Testing Library has a set of packages that help you test UI components in a user-centric way.

It tests based on how the user interacts with the various elements displayed on the page.

You can write unit, integration, and end-to-end tests with this library.


## What you should avoid with Testing Library

Testing Library encourages you to **avoid** testing implementation details like the internals of a component you're testing.

You may want to avoid the following implementation details:

- Internal state of a component
- Internal methods of a component
- Lifecycle methods of a component
- Child components


## Guiding Principles

If it relates to rendering components, then it should deal with DOM nodes rather than component instances, and it should not encourage dealing with component instances.

It should be generally useful for testing the application components in the way the user would use it.
