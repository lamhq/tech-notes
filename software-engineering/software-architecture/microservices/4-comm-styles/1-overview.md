# Overview of Microservice Communication Styles

## Consideration

- inter-process: calls between different processes across a network
- in-process: calls within a single process

Things to consider for inter-process communication:

### Performance

The overhead of an inter-process call to be significant compared to the overhead of an in-process call.

### Rate limit

Perhaps you don't want to make one thousand calls between two  microservices.

### Payload size

When making calls between microservices over a network, the data has to be serialized into some form that can be transmitted over a network.

The data then needs to be sent and deserialized at the other end. We therefore may need to be more mindful about the size of payloads being sent between processes.

This might lead you to:
- reduce the amount of data being sent or received
- pick more efficient serialization mechanisms
- offload data to a filesystem and pass around a reference to that file location instead


### Changing Interfaces

The microservice exposing an interface and the consuming microservices using that interface are separately deployable microservices.

When making a backward-incompatible change to a microservice interface, we either need to do a lockstep deployment with consumers, making sure they are updated to use the new interface, or else find some way to phase the rollout of the new microservice contract.


### Error Handling

With a distributed system, you are vulnerable to a host of errors that are outside your control:

- Networks time out
- Downstream microservices might be temporarily unavailable
- Networks get disconnected
- containers get killed due to consuming too much memory
- Bits of your data center can catch fire.

Five types of failure modes you can see when looking at an inter-process communication:

- Crash failure: Everything was fine till the server crashed. Reboot!
- Omission failure: You sent something, but you didn't get a response. Also includes situations in which you expect a downstream microservice to be firing messages, and it just stops.
- Timing failure: Something happened too late, or something happened too early!
- Response failure: You got a response, but it just seems wrong. For example, you asked for an order summary, but needed pieces of information are missing in the response.
- Arbitrary failure: Otherwise known as Byzantine failure, this is when something has gone wrong, but participants are unable to agree if the failure has occurred.

It become important to have a richer set of semantics for returning errors in a way that can allow clients to take appropriate action (HTTP is an example).


## Technology for Inter-Process Communication

The range of technology for inter-process communication is vast.

People often choose technology that is familiar to them or the latest hot technology they learned about from a conference. 

However, this can lead to problems because when you choose a specific technology, you are also choosing a set of ideas and constraints that may not be suitable for your needs.

> For example, single page app technologies like Angular or React are not ideal for building websites, and Kafka is not a good choice for request-response interactions.

It's important to talk first about the **style of communication** you want, and only then look for the right technology to implement that style.
