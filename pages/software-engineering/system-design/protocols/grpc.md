# gRPC

## RPC

Remote Procedure Call (RPC) is a protocol that allows a program to execute a procedure (subroutine) on another computer over network as if it were a local procedure call.

RPC uses stubs to handle the communication between the client and server. The client stub sends the request to the server, and the server stub receives the request and executes the procedure.

RPC is widely used in distributed systems, microservices, and client-server applications due to its simplicity and efficiency.


### How RPC works

1. The client program calls a local stub procedure.
2. The stub marshals (packs) the procedure parameters into a message.
3. The message is sent over the network to the server.
4. The server stub unmarshals (unpacks) the message and calls the actual procedure.
5. The procedure executes on the server.
6. The result is marshalled back into a message and sent to the client.
7. The client stub unmarshals the result and returns it to the client program.

### Benefits

- Developers can write distributed applications without dealing with the complexities of network communication.
- RPC can be implemented in various programming languages.


## gRPC

gRPC is a high-performance, open-source framework developed by Google for RPC APIs.

gRPC uses Protocol Buffers (protobufs) for defining service interfaces and encoding/decoding messages.

gRPC use HTTP2 for transport, this results in improved performance and lower latency.


### Advantages

Better performance compared to REST APIs (by using protobufs and HTTP2)

Supports authentication, including Transport Layer Security (TLS) and token-based authentication.

Supports for load balancing and health checking, which is essential for building resilient distributed systems.


### Disadvantages

Cannot be used in browser.


### Protobufs

Protobufs is a mechanism for serializing structured data into binary format.

Protobufs is language-neutral and platform-neutral.

Messages are much smaller than JSON or XML.

Protocol Buffers ensures that the API contracts are strongly typed, reducing the likelihood of errors due to mismatched data types.

How it works:
1. You define API interface in a `.proto` file
2. Use the `protoc` compiler to generate client and server code in your chosen language
3. The generated code can be used to serialize and deserialize data.