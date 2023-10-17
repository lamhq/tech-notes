# Avoiding Breaking Changes

Here are a few key ideas worth exploring to avoid making breaking changes:

## Expansion Changes

Add new things to a microservice interface; don't remove old things.

## Tolerant Reader

When consuming a microservice interface, be flexible in what you expect.

Avoid client code binding too tightly to the interface of a microservice.

The pattern of implementing a reader able to ignore changes we don't care about is a **tolerant reader**.

> Let's consider an Email microservice whose job it is to send out emails to our customers. To send the email, the microservice needs only the `firstname`, `lastname`, and `email` fields. We don't need to know the `telephoneNumber`. We want to simply pull out those fields we care about and ignore the rest.

Some binding technology, especially that used by strongly typed languages, can attempt to bind all fields whether the consumer wants them or not. When removing a field that aren't used, this still cause  consumers to break needlessly.


## Right Technology

Pick technology that makes it easier to make backward-compatible changes to the interface.

Some technology can be more brittle when it comes to allowing us to change interfaces (such as Java RMI).

**Protocol buffers** (used with gRPC) have the concept of field number. Each entry in a protocol buffer has to define a field number, which client code expects to find. If new fields are added, the client doesn't care.

**Avro** allows for the schema to be sent along with the payload, allowing clients to potentially interpret a payload much like a dynamic type.


## Explicit Interface

Be explicit about what a microservice exposes. This makes things easier for the client and easier for the maintainers of the microservice to understand what can be changed freely.

**Benefits of Explicit Schemas**: 

Having an explicit schema for a microservice's endpoints is valuable because it clarifies what consumers can expect and helps developers understand what they should not change to avoid breaking consumers. It makes the boundaries of information more explicit.

**Schema in RPC vs. REST**: 

Explicit schemas have long been a requirement in **RPC** implementations, but they have been viewed as optional in **REST**. However, the adoption of explicit schemas in REST, such as the OpenAPI and JSON Schema specifications, is increasing.

**Challenges in Asynchronous Messaging**: 

Asynchronous messaging protocols face challenges in having explicit schemas for events. While it's relatively easy to define schemas for message payloads, specifying the interface for events is more complex (which events does a microservice expose?).

Several initiatives, like AsyncAPI and CloudEvents (backed by CNCF), are addressing this issue. CloudEvents, in particular, is gaining traction and support from different vendors, which is expected to enhance interoperability in this evolving space.


## Catch Accidental Breaking Changes Early

Have mechanisms in place to catch interface changes that will break consumers in production before those changes are deployed.

### Structural breakages

Using schemas can help us pick up structural changes (assuming we use some sort of **tooling** to help compare schema versions).

- We have Protolock for protocol buffers
- json-schema-diff-validator for JSON Schema
- openapi-diff for the OpenAPI specification
- The open source Confluent Schema Registry (supports JSON Schema, Avro, and protocol buffers) is capable of comparing newly uploaded versions for backward compatibility.

The tool should allow you to fail a CI build if incompatible schemas are found, ensuring that your microservice won't get deployed.

### Semantic breakages

Consumer-driven contract testing, exemplified by tools like Pact, is highlighted as an approach to tackle semantic breakages.

However, it's emphasized that without schemas, testing becomes more challenging, and it's necessary to put extra effort into catching breaking changes.

If you're supporting multiple different client libraries, running tests using each library you support against the latest service is another technique that can help.


# Semantic Versioning

## Overview

Semantic versioning (SemVer) is a specification for version numbers that provides a clear way to determine if a service can be integrated with based on the version number. It uses the format `MAJOR.MINOR.PATCH` to convey information about changes.

## Semantic Version Components

- When the `MAJOR` number increments, it indicates backward-incompatible changes have been made.
- An increment in the `MINOR` number signifies the addition of new functionality that should be backward compatible.
- A change in the `PATCH` number implies bug fixes have been made to existing functionality.

> Our helpdesk application is built to work against version `1.2.0` of the Customer service.
>
> If the Customer service changes from version `1.2.0` to `1.3.0` due to added features, the helpdesk application should continue to work without any changes. However, it may not be compatible with version `1.1.0` as it relies on functionality introduced in `1.2.0`.
>
> Furthermore, if the Customer service transitions to version `2.0.0`, changes to the application would likely be necessary.


## Granularity of Versionin

It's possible to apply semantic versioning not only to services but also to individual endpoints on a service, especially when coexisting multiple endpoints.


## Simplified Communication

Semantic versioning allows for a concise representation of changes and facilitates communication regarding the impact of those changes on consumers. It helps manage expectations about compatibility and updates.