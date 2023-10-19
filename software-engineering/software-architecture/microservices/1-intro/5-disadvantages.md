# Microservice Pain Points

## Developer Experience

As the number of microservices increases, the developer experience can be impacted.

There is a limit to the number of services that can be run locally.

Running the entire system on one machine may not be feasible, especially when using cloud services that cannot be run locally.

Extreme solutions like "developing in the cloud" can impact feedback cycles and may not be ideal.


## Technology Overload

The abundance of technology available for microservices can be overwhelming, with some being rebranded as "microservice friendly".

It's important to avoid technology fetishism and carefully consider the benefits and costs of adopting new and diverse technologies.

Adopting microservices brings fundamental challenges like data consistency, latency, and service modeling that require time and understanding.

Trying to learn and implement new technology while also adjusting to microservices can be difficult and reduce productivity.

The approach of *gradually introduce new technology as needed based on the complexity of your microservice architecture* helps avoid overwhelm and allows you to adapt to new and better ways of doing things over time.


## Cost

Adopting microservices can lead to short-term increase in costs due to the need for additional resources like processes, computers, network, storage, and supporting software.

Introducing changes into a team or organization will slow down productivity in the short term as people need time to learn and effectively use new ideas.

The slowdown caused by implementing microservices may result in delays in delivering new functionality or the need to hire more people to offset the impact.

Microservices are not an ideal choice for organizations primarily focused on cost reduction, as they require investment and a mindset shift from viewing IT as a cost center to a profit center.

However, microservices have the potential to generate more profits if they enable reaching more customers or developing more functionality in parallel.

Are microservices a way to drive more profits? Perhaps. Are microservices a way to reduce costs? Not so much.


## Reporting

In a monolithic system, there is usually a single database that contains all the data needed for reporting and analysis. Stakeholders can easily run reports against the monolithic database, including complex join operations on large amounts of data.

Microservice architecture breaks up the monolithic schema, resulting in data being scattered across multiple isolated schemas.

Reporting across all the data becomes more challenging in a microservice architecture due to the fragmented data.

Newer approaches to reporting, such as real-time reporting on large volumes of data using streaming, can be well-suited for microservices but require the adoption of new technology.

Alternatively, data from microservices can be published into central reporting databases or less structured data lakes to facilitate reporting use cases.


## Monitoring and Troubleshooting

Monitoring in a standard monolithic application is relatively simple, as there are only a few machines and the application is either up or down.

In a microservice architecture, understanding the impact of a single instance of a service going down becomes important.

With numerous processes in a microservice architecture, it may not be clear if high CPU usage in one process is a critical issue that requires immediate attention.

There are various concepts and ideas in the field of distributed systems observability that can help address these challenges.


## Security

In a single-process monolithic system, most information stays within that process.

In a microservice architecture, information flows over networks between services, making it more vulnerable to observation and manipulation during transit.

Data in transit needs to be protected to prevent unauthorized access or tampering.

Microservice endpoints should be secured to ensure that only authorized parties can interact with them.

Additional care and attention are required to protect data in transit and secure microservice endpoints in a microservice architecture.


## Testing

End-to-end tests cover the highest level of functionality in a system and are often more problematic to write and maintain compared to smaller-scoped unit tests.

In a microservice architecture, the scope of end-to-end tests becomes even larger as they need to be executed across multiple processes with appropriate configuration.

Environmental issues like service failures or network timeouts can lead to false negatives in end-to-end tests.

As a microservice architecture grows, the return on investment for end-to-end testing diminishes, as it becomes more costly and provides less confidence.

Other forms of testing, such as contract-driven testing or testing in production, and progressive delivery techniques like parallel runs or canary releases, may become more important in this context.


## Latency

In a microservice architecture, processing that was previously done locally on one processor may now be distributed across multiple separate microservices.

Information that previously flowed within a single process now needs to be serialized, transmitted, and deserialized over networks, leading to potential latency issues.

It can be difficult to measure the exact impact of latency during the design or coding phase of a microservice migration.

Incremental migration is important to make small changes and measure their impact on latency.

Using distributed tracing tools like Jaeger can help measure end-to-end latency for the operations that matter.

It's crucial to have an understanding of what latency is acceptable for these operations, as sometimes slower operations can still be deemed fast enough.


## Data Consistency

Shifting from a monolithic system with a single database to a distributed system with multiple processes managing state in different databases presents challenges in maintaining data consistency.

In a distributed system, relying on traditional database transactions to manage state changes becomes difficult. Distributed transactions often face coordination issues and can be problematic.

To manage and reason about state in a distributed system, concepts like sagas and eventual consistency need to be considered.

Adopting sagas and eventual consistency may require fundamental changes in the way data is handled in the system.

Migrating existing systems to a distributed architecture can be daunting due to these fundamental changes required.

An incremental approach to decomposition is important to assess the impact of architecture changes in production.
