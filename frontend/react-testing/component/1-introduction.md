# Introduction

The `@testing-library` family of packages helps you test UI components in a user-centric way.

You can write unit, integration, and end-to-end tests with this library.


## Version

This document is applied for version: 14.0.0


## The problem

You want to write maintainable tests that give you high confidence that your components are working for your users.

You want your tests to avoid including implementation details so refactors of your components (changes to implementation but not functionality) don't break your tests and slow you and your team down.


## What you should avoid with Testing Library

Testing Library encourages you to avoid testing implementation details like the internals of a component you're testing.

You may want to avoid the following implementation details:

- Internal state of a component
- Internal methods of a component
- Lifecycle methods of a component
- Child components


## Guiding Principles

If it relates to rendering components, then it should deal with DOM nodes rather than component instances, and it should not encourage dealing with component instances.

It should be generally useful for testing the application components in the way the user would use it.
