# Available Settings

## Visibility timeout

Visibility timeout is the time that a message won't be visible to consumers after being consumed by another consumer. This ensures that only one consumer processes the message at a time.

If you set the visibility timeout too long, you must wait for a long time to attempt to process the message again if the previous processing attempt fails.

If you set the visibility timeout too short, another consumer can process the message again while the original is still working on it. causing a duplicate message.

To make sure that there is sufficient time to process messages, use one of the following strategies:
- Set the message's visibility timeout to the maximum time to process and delete a message from the queue.
- Specify the initial visibility timeout (e.g., 2 minutes) and then keep extending it as long as your consumer still works on the message.

The default visibility timeout value is 30 seconds, max 12 hours.

If your consumer needs longer than 12 hours, consider using Step Functions.

For optimal performance, set the visibility timeout to be larger than the AWS SDK read timeout.

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
