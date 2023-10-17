# Code Reuse in a Microservice World

## DRY

DRY is a common acronym in software development, emphasizing the avoidance of repeating system behavior and knowledge, not just code.

Avoiding duplication of behavior and knowledge is sensible because having redundant code in a codebase makes it larger and more challenging to manage. When behavior needs to change, tracking and updating duplicated code can lead to errors.

DRY encourages developers to create reusable code by abstracting duplicated functionality that can be called from various parts of the system.


## Sharing Code via Libraries

Shared code that containing **common domain objects**, can introduce coupling between microservices. It's important to avoid leaking shared code outside of service boundaries, as it can introduce coupling.

Sharing **common code** such as logging libraries within a microservice is acceptable, as it remains internal to the service.

When using **libraries** for code reuse across microservice boundaries, it's essential to understand that different microservices may use different versions of the same library, which can complicate updates.

If you require all users to update the code simultaneously, consider reusing code via a **dedicated microservice** to manage updates effectively.


## Client libraries

Creating client libraries for services makes it easier to consume the service and avoids code duplication.

But if the same team creates both the server API and the client API, there is a risk that server logic starts to leak into the client library, leading to cohesion breakdown and requiring changes to multiple clients for server fixes.

To use the client library approach effectively, it's important to separate client code handling the transport protocol and infrastructure concerns (e.g., service discovery and failure) from code related to the destination service itself.

Ensure that clients have control over when they upgrade their client libraries, preserving the ability to release services independently of each other.