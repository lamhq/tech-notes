# Temporary queues

## Overview
Temporary queues are lightweight communication channels for specific threads or processes.

Created using the [Temporary Queue Client (java)](https://github.com/awslabs/amazon-sqs-java-temporary-queues-client) without incurring additional costs.

Temporary queues help you save development time and deployment costs when using common message patterns


## How They Work

The Temporary Queue Client creates virtual queues locally (called "virtual queues").

These virtual queues combine multiple low-traffic destinations into a single Amazon SQS queue.

When a producer sends a message to a virtual queue URL, the Temporary Queue Client attaches the virtual queue name as an additional message attribute and sends the message to the host queue.

A background thread then polls the host queue and sends received messages to virtual queues based on the corresponding message attributes.

Virtual queues incur no cost because they make no direct API calls to Amazon SQS.


## Best practices

To prevent messages with the same message group ID sent to different virtual queues with the same host queue from blocking each other, avoid reusing the same message group ID with virtual queues.


## Use Cases

**Request-response messaging pattern**: You can use temporary queues for scenarios like processing login requests.

**Lightweight communication between threads or processes**: Ideal for scenarios where you need efficient communication without the overhead of maintaining permanent queues.


## References

- [Amazon SQS temporary queues](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-temporary-queues.html)