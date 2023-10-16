# Implementing Microservice Communication

Your choice of technology should be driven in large part by the style of communication you want

Let's think about what we want out of which technology we pick.

## Make Backward Compatibility Easy

We want to ensure that whatever technology we pick makes it easy to make backward-compatible changes.

Simple operations like adding new fields shouldn't break clients.

It should have the ability to validate that the changes we have made are backward-compatible.


## Make Your Interface Explicit

It is clear to a consumer of a microservice as to what functionality that microservice exposes.

It is clear to a developer working on the microservice what functionality needs to remain intact for external parties.

Explicit schemas can help ensure that the interface a microservice exposes is explicit.


## Keep Your APIs Technology Agnostic

Keep the APIs used for communication between microservices technology agnostic.

Avoiding integration technology that dictates what technology stacks we can use to implement our microservices.


## Make Your Service Simple for Consumers

We'd like to allow our clients full freedom in their technology choice; on the other hand, providing a client library can ease adoption.


## Hide Internal Implementation Detail

We don't want our consumers to be bound to our internal implementation, as it leads to increased coupling; that in turn means that if we want to change something inside our microservice, we can break our consumers by requiring them to also change.

Any technology that pushes us to expose internal representation detail should be avoided.
