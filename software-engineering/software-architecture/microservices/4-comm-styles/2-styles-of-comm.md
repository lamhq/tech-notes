# Styles of Microservice Communication

A microservice architecture may have a mix of styles of collaboration.

> Consider an Order microservice that exposes a request-response API that allows for orders to be placed or changed and then fires events when these changes are made.

![](images/styles-of-comm.png)


## Synchronous blocking

A microservice makes a call to another microservice and blocks operation waiting for the response.


### Advantages

This approach is simple and familiar to many programmers who learned to program in a fundamentally synchronous style.


### Disadvantage

Synchronous calls have a main disadvantage of inherent temporal coupling, which means that the microservice emitting a call has to wait for the downstream microservice to respond before continuing its execution.

- If the downstream microservice is unavailable, the call will fail, and the sender of the call needs to work out what kind of compensating action to carry out.
- If the downstream microservice wants to send a response back to the sender of the call but the upstream instance has subsequently died, the response will get lost.
- If the downstream microservice is under significant load and is responding slowly to requests, this in turn will cause the sender of the call to respond slowly.

Synchronous calls can make a system vulnerable to cascading issues caused by downstream outages.


### Where to Use It

For simple microservice architectures.

It becomes problematic when you start having more chains of calls:
- An issue in any of involved microservices, or in the network calls between them, could cause the whole operation to fail.
- Long chains can cause significant resource contention (network connection).

To improve this situation, we can reduce the length of the call chain. We could also replace the use of blocking calls with some style of nonblocking interaction without changing the workflow


## Asynchronous nonblocking

The microservice emitting a call is able to carry on with any other processing without having to wait for a response.


### Advantages

The two microservices are decoupled temporarily. The microservices that receive the call do not need to be reachable at the same time the call is made.

Beneficial for functionalities that take a long time to process.


### Disadvantages

The main downsides are the level of complexity and the range of choice. 


### Where to Use It

- long-running processes
- situations in which you have long call chains that you can't easily restructure


## When Async/Await is still blocking

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