# Microservice Communication Styles

## From In-Process to Inter-Process

- inter-process: calls between different processes across a network
- in-process: calls within a single process

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
- Omission failure: You sent something, but you didn’t get a response. Also includes situations in which you expect a downstream microservice to be firing messages, and it just stops.
- Timing failure: Something happened too late, or something happened too early!
- Response failure: You got a response, but it just seems wrong. For example, you asked for an order summary, but needed pieces of information are missing in the response.
- Arbitrary failure: Otherwise known as Byzantine failure, this is when something has gone wrong, but participants are unable to agree if the failure has occurred.

It become important to have a richer set of semantics for returning errors in a way that can allow clients to take appropriate action (HTTP is an example).


## Technology for Inter-Process Communication

The range of technology for inter-process communication is vast.

People often choose technology that is familiar to them or the latest hot technology they learned about from a conference. 

However, this can lead to problems because when you choose a specific technology, you are also choosing a set of ideas and constraints that may not be suitable for your needs.

> For example, single page app technologies like Angular or React are not ideal for building websites, and Kafka is not a good choice for request-response interactions.

It’s important to talk first about the **style of communication** you want, and only then look for the right technology to implement that style.


## Styles of Microservice Communication

A microservice architecture may have a mix of styles of collaboration.

> Consider an Order microservice that exposes a request-response API that allows for orders to be placed or changed and then fires events when these changes are made.

![](styles-of-comm.jpg.png)

## Synchronous blocking

A microservice makes a call to another microservice and blocks operation waiting for the response.

**Advantages**:

This approach is simple and familiar to many programmers who learned to program in a fundamentally synchronous style.

**Disadvantage**

Synchronous calls have a main disadvantage of inherent temporal coupling, which means that the microservice emitting a call has to wait for the downstream microservice to respond before continuing its execution.

- If the downstream microservice is unavailable, the call will fail, and the sender of the call needs to work out what kind of compensating action to carry out.
- If the downstream microservice wants to send a response back to the sender of the call but the upstream instance has subsequently died, the response will get lost.
- If the downstream microservice is under significant load and is responding slowly to requests, this in turn will cause the sender of the call to respond slowly.

Synchronous calls can make a system vulnerable to cascading issues caused by downstream outages.

**Where to Use It**

For simple microservice architectures.

It becomes problematic when you start having more chains of calls:
- An issue in any of involved microservices, or in the network calls between them, could cause the whole operation to fail.
- Long chains can cause significant resource contention (network connection).

To improve this situation, we can reduce the length of the call chain. We could also replace the use of blocking calls with some style of nonblocking interaction without changing the workflow

## Asynchronous nonblocking

The microservice emitting a call is able to carry on with any other processing without having to wait for a response.


**Advantages**

The two microservices are decoupled temporarily. The microservices that receive the call do not need to be reachable at the same time the call is made.

Beneficial for functionalities that take a long time to process.

**Disadvantages**

The main downsides are the level of complexity and the range of choice. 

**Where to Use It**

- long-running processes
- situations in which you have long call chains that you can’t easily restructure

Three of the most common forms of asynchronous communication:
- request-response calls
- event-driven communication
- communication through common data

### Communication Through Common Data

This pattern is used when one microservice puts data into a defined location, and another microservice then makes use of the data.

**Implementation**

To implement this pattern, you need some sort of persistent store for the data. A filesystem in many cases can be enough, or you could use some sort of robust distributed memory store.

Downstream microservice that is going to act on this data will need its own mechanism to identify that new data is available, polling is a frequent solution to this problem.

> A **data lake** and a **data warehouse** are two common solutions for processing large volumes of data. They differ in their approach to data processing and coupling.
> 
> A **data lake** is a storage system where sources upload raw data in any format they see fit, and downstream consumers of this raw data are expected to know how to process the information. 
> 
> On the other hand, a **data warehouse** is a structured data store where microservices pushing data to the warehouse need to know the structure of the warehouse. If the structure changes in a backward-incompatible way, then these producers will need to be updated. 
>
> Both the data warehouse and the data lake assume that the flow of information is in a single direction. One microservice publishes data to the common data store, and downstream consumers read that data and carry out appropriate actions. This unidirectional flow can make it easier to reason about the flow of information.

**Advantages**

The pattern is simple and can be implemented using commonly understood technology.

Data volumes are less of a concern if you’re sending lots of data in one big go, this pattern can work well.

**Disadvantages**

- This mechanism is not useful in low-latency situations.
- Downstream consuming microservices are aware of new data to process via polling or timed jobs.
- The common data store becomes a potential source of coupling.
- The robustness of the communication will also come down to the robustness of the underlying data store.

> If you're interested in sending larger volumes of data and having them processed more in "real time," then using some sort of streaming technology like Kafka would be a better fit.

**Where to Use It**

- This pattern is useful in enabling interoperability between processes that might have restrictions on what technology they can use.
  - Even old mainframe systems should be able to read data out of a file.
  - Older systems may have limitations on what technology they can support and may have high costs of change.
- This pattern is useful for sharing large volumes of data, such as sending a multigigabyte file to a filesystem or loading a few million rows into a database.


### Request-Response Communication

A microservice sends a request to a downstream service asking it to do something and expects to receive a response with the result of the request.

> COMMANDS vs REQUESTS
>
> Some people use the term “command” instead of “request” in asynchronous request-response communication.
>
> The term request” is prefered over “command” because a command implies a directive that must be obeyed, while a request implies something that can be rejected.
>
> A microservice should examine each request, if it violates internal logic, the microservice should reject it.

**Implementation**












### Event-driven

Microservices emit events, which other microservices consume and react to accordingly. The microservice emitting the event is unaware of which microservices, if any, consume the events it emits.

## Async/Await is still blocking

In below Javascript example, the currency exchange rates fluctuate frequently through the day, and we receive these via a message broker.

We define a Promise. When we reference `eurToGbp` using `await`, we block until `latestRate`'s state is fulfilled.

```js
async function f() {

  let eurToGbp = new Promise((resolve, reject) => {
    //code to fetch latest exchange rate between EUR and GBP
    ...
  });

  var latestRate = await eurToGbp; 1
  process(latestRate); 2
}
```

Even though our exchange rates are being received in an asynchronous fashion, the use of `await` in this context means we are blocking until the state of `latestRate` is resolved.

So even if the underlying technology we are using to get the rate could be considered asynchronous in nature (for example, waiting for the rate), from the point of our code, this is inherently a synchronous, blocking interaction.