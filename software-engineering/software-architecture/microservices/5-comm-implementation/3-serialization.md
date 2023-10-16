# Serialization Formats & Schemas

## Serialization Formats

Format is how we covert data for network calls.

### Textual Formats

**REST APIs** most often use a textual format for the request and response bodies. While gRPC uses HTTP underneath but send binary protocol buffers.

**JSON** has usurped XML as the text serialization format of choice. The primary reason is that one of the main consumers of APIs is often a browser, where JSON is a great fit. And its relative compactness and simplicity when compared to XML is another winning factor.

**Avro** is an interesting serialization format. It takes JSON as an underlying structure and uses it to define a schema-based format. It has the ability to send the schema as part of the payload, which can make supporting multiple different messaging formats much easier.


### Binary Formats

The world of binary serialization protocols is where you want to be if you start getting worried about **payload size** or about the **efficiencies of writing and reading the payloads**.

Protocol buffers (used by gRPC) represent the most popular binary serialization format for microservice-based communication.

The vast majority of systems rarely have to worry about serialization optimizations, as they can often achieve the improvements they are looking for by sending less data or by not making the call at all.


## Schemas

Schemas are used to define what our endpoints expose and what they accept.

Schemas can come in lots of different types, and picking a serialization format will typically define which schema technology you can use.

> If you’re working with raw XML, you’d use XML Schema Definition (XSD). If you’re working with raw JSON, you’d use JSON Schema.

Some of the technology choices require the use of **explicit schemas**. SOAP works through the use of a WSDL, while gRPC requires the use of a protocol buffer specification.

**Explicit schemas** go a long way toward being an explicit representation of what a microservice endpoint exposes and what it can accept. This makes life easier both for developers working on the microservice and for their consumers. Schemas may not replace the need for good documentation, but they certainly can help reduce the amount of documentation required.

**Explicit schemas** help in terms of catching accidental breakages of microservice endpoints.

You should have a schema, and it must be explicit.


## Breakages

We can break contract breakages down into two categories: structural breakages and semantic breakages.

### Structural breakages

A structural breakage is a situation in which the structure of the endpoint changes in such a way that a consumer is now incompatible.

This could represent fields or methods being removed, or new required fields being added.

> For example, we has a method called "calculate" that requires two integers as input. If this method is modified to accept only one integer, it would disrupt consumers who continue to send two integers. 

By using schemas and comparing different versions of schemas, we can catch structural breakages.


### Semantic breakages

A semantic breakage refers to a situation in which the structure of the microservices endpoint remains the same but the behavior changes in such a way as to break consumers’ expectations.

> In the previous version of the "calculate" method, it added two provided integers and returned the result. However, in the new version, the method has been changed to multiply the integers and return the result.
> 
> This change alters the fundamental meaning or semantics of the "calculate" method, which could potentially disrupt the expectations of the consumers using it.

Catching semantic breakages requires the use of testing.

Lack of schemas or not comparing schema changes for compatibility, then the burden of catching structural breakages before you get to production also falls on testing.