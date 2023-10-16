# Remote procedure calls (RPC)

RPC is a technique for making a local function call that executes on a remote service.

There are different RPC implementations, many of which require an explicit schema, such as SOAP and gRPC.

**Schema in RPC:** In the context of RPC, the schema is often referred to as an Interface Definition Language (IDL), with SOAP using Web Service Definition Language (WSDL) for its schema format.

Having a separate schema makes it easier to generate **client and server stubs** for different technology stacks, allowing interoperability between, for example, a Java server and a .NET client.

**Serialization Protocol:** RPC technologies typically involve a serialization protocol that defines how data is serialized and deserialized. For example, gRPC uses the Protocol Buffers serialization format.

**Networking Protocols:** Some RPC implementations are tied to specific networking protocols (e.g., SOAP with HTTP), while others allow for the use of different networking protocols with varying features like delivery guarantees and overhead.

**Client Code Generation:** RPC frameworks with an explicit schema make it easy to generate client code, eliminating the need for client libraries. Clients must have access to the schema to generate code.

One of the main advantages of RPC is the ease of generating client-side code, making it simpler for clients to interact with remote services.

## Challenges

### Technology Coupling

RPC mechanisms can exhibit technology coupling, meaning they are tightly bound to a specific platform or technology stack. Some RPC mechanisms, such as Java RMI, are closely associated with a particular platform, which restricts the choice of technologies for both the client and server.

**Interoperability Challenges:** The coupling of RPC technology to a specific platform can pose challenges for interoperability, limiting the ability to use different technologies.

**Exposing Technical Implementation:** Technology coupling can inadvertently expose internal technical implementation details of the system. For instance, Java RMI ties both the client and server to the Java Virtual Machine (JVM).

**Restrictions on Interoperability:** RPC technologies can come with restrictions on interoperability, but some implementations, like gRPC, SOAP, and Thrift, allow for more flexibility and interoperability between different technology stacks.


### Local calls are not like remote calls

With RPC, the cost of marshaling and unmarshaling payloads can be significant, not to mention the time taken to send things over the network.

You need to think differently about API design for remote interfaces versus local interfaces. Just taking a local API and trying to make it a service boundary without any more thought is likely to get you in trouble.

You need to think about the network itself. Networks can and will fail, they can even malform your packets.


### Brittleness

RPC mechanism that promotes the use of binary stub generation brings a key challenge that you don't get to separate client and server deployments (e.g. adding or removing a field requires regenerate client stubs, even the field isn't used by some clients). If you use this technology, lockstep releases may be in your future.

In practice, objects used as part of binary serialization across the wire can be thought of as “expand-only” types. Fieldss are no longer used but can't be safely removed.


## Where to use it

Don't abstract your remote calls to the point that the network is completely hidden. Make sure your clients aren't oblivious to the fact that a network call is going to be made.

Ensure that you can evolve the server interface without having to insist on lockstep upgrades for clients.

**Java RMI** has a number of issues regarding brittleness and limited technology choices.

**SOAP** is pretty heavyweight from a developer perspective.

**gRPC** would be at the top of the list:
- built to take advantage of HTTP/2, has some impressive performance characteristics 
- ease of use
- the ecosystem around gRPC
- fits a synchronous request-response model well, can also work in conjunction with reactive extensions

If you're having to support a wide variety of other applications that might need to talk to your microservices, the need to compile client-side code against a server-side schema can be problematic. In that case, some form of **REST** over HTTP API would likely be a better fit.