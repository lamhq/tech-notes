# Available Settings

## Visibility timeout

When a consumer reads a message from the queue, that message is marked as hidden for a period of time (called **visibility timeout**) so that other consumers won't receive and process it.

This ensures that only one consumer processes the message at a time.

> If the consumer doesn't remove the message within the visibility timeout period, the message will reappear in the queue and become available for other consumers to receive and process. This could result in the same message being delivered twice.

The default value is 30 seconds, max 12 hours.

You should set the visibility timeout to the maximum time to process and delete a message from the queue. If your consumer needs longer than 12 hours, consider using Step Functions.

You can change the the visibility timeout for a message after receiving using `ChangeMessageVisibility` API.


## Receive message wait time

The maximum wait time for messages to become available after the queue gets a receive request.


## Delivery delay

The amount of time a message is delayed before being added to the queue.

Default is 0, maximum is 15 minutes.

Changing this setting for standard queues only affects new messages. For FIFO queues, this also affects messages already in the queue.

Use cases: your consumer application needs additional time to process messages.


## Message size
 
The maximum message size for the queue. Up to **256KB** of text.

You can use the Amazon SQS Extended Client Library for Java and the Amazon SQS Extended Client Library for Python to send large messages, up to 2 GB.


## Access policy

Defines the accounts, users, and roles that can access the queue (send, receive, delete messages).


## Encryption

Messages are encrypted in transit by default. Can enable "at-rest" too.


## Message retention

The amount of time messages remain in the queue. From 1 minute to 14 days, default is **4 days**.
