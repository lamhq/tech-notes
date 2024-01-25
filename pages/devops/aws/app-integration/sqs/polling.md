# Polling

Polling is a way to retrieve messages from SQS queues.

## Short polling

Returns immediately (even if the message queue is empty).

It queries only a subset of the available servers for messages (based on weighted random execution).

`ReceiveMessageWaitTime` is set to 0.

More requests are used, which implies higher cost.

Short polling is the default behavior.

> The following diagram shows the short-polling behavior of messages returned from a standard queue after one of your system components makes a receive request. Amazon SQS returns messages A, C, D, and B from these servers. Message E isn't returned for this request, but it's returned for a subsequent request.

![](./images/short-polling.png)


## Long polling

Doesn’t return a response until a message arrives in the message queue or the long poll times out.

Requests contain at least one of the available messages up to the maximum number of messages specified in the `ReceiveMessage` action.

Can be enabled at the queue level or at the API level using `WaitTimeSeconds`.

In effect when `ReceiveMessageWaitTime` is greater than 0 seconds and up to 20 seconds.

Shouldn’t be used if your application expects an immediate response to receive message calls.

In rare cases, you might receive empty responses even when a queue still contains messages, especially if you specify a low value for the `ReceiveMessageWaitTime` parameter.

Uses fewer requests and reduces cost.

Same charge per million requests as short polling.
