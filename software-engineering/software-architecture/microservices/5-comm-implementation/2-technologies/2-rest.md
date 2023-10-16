# Representational State Transfer (REST)

Most important when thinking about REST is the concept of resources.

A **resource** is a thing that the service itself knows about, like a *Customer*.

The server creates different **representations** of a resource. How a resource is shown externally is completely decoupled from how it is stored internally.

Once a client has a representation of a resource, it can then make **requests to change** it, and the server may or may not comply with them.


## REST and HTTP

REST is most commonly used over **HTTP protocol**. Some of the features that HTTP gives us as part of the specification, such as verbs, make implementing REST over HTTP easier.

There is one endpoint in the form of a resource, and the operations we can carry out on it are baked into the HTTP protocol:
- We can **POST** a *Customer* representation to request that the server create a new resource
- We can initiate a **GET** request to retrieve a representation of a resource

HTTP brings a large ecosystem of **supporting tools** and technology: caching proxies, load balancers, monitoring tools.

We also get to use all the available **security controls** with HTTP to secure our communications: basic auth, client certs.

HTTP can be used to implement **RPC** (SOAP, for example, gets routed over HTTP).


## Hypermedia as the engine of application state (HATEOAS)

**Hypermedia** is a concept wherein a piece of content contains links to various other pieces of content in a variety of formats (e.g., text, images, sounds).

The idea behind **HATEOAS** is that clients should perform interactions with the server via these links to other resources. This gives us a huge amount of decoupling between the client and the server.

> As a client, I don't need to know which URI scheme to access to buy the **product**; I just need to access the resource, find the **buy control**, and navigate to that.
>
> The buy control could change location, the URI could change, or the site could even send me to another service altogether, and as a client I wouldn't care.

Decoupling client and server for long-term benefits in REST is **rarely practiced**, making HATEOAS a hard concept to promote.

Fundamentally, many of the ideas in REST are predicated on creating distributed hypermedia systems, and this isn't what most people end up building.


## Challenges

### Ease of consumption

In terms of ease of consumption, **generating client-side code** for REST over HTTP applications was not as straightforward as with RPC implementations.

To make REST APIs more accessible, people often created client libraries that helped consumers integrate with the APIs.

Client libraries can cause some challenges with regards to coupling between the client and the server.


### Performance

The overhead of HTTP for each request may also be a concern for **low-latency requirements**.

Most mainstream HTTP protocols rely on the Transmission Control Protocol (**TCP**), which may have inefficiencies compared to other networking protocols (such as UDP).

**HATEOAS** can introduce additional performance issues. Clients have to navigate multiple controls to find the right endpoints for a given operation, multiple round trips may be necessary for each operation . This is a trade-off.


## Where to use it

REST-over-HTTP-based APIs are a popular choice in the industry for **synchronous request-response** interfaces if you are looking to allow access from as wide a variety of clients as possible..

It's a well-understood interface style that ensures interoperability across a wide range of technologies.

REST-based APIs excel in situations where you require large-scale and effective caching of requests.

They are the preferred choice for **exposing APIs to external parties** or client interfaces.

While it is possible to create asynchronous interaction protocols on top of REST-based APIs, this approach **may not be the most suitable** or efficient choice for general microservice-to-microservice communication.
