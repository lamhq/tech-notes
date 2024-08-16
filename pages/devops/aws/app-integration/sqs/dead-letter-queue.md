# Dead-Letter Queues

## Overview

A dead-letter queues (DLQ) is a queue which source queues can target for messages that are not processed successfully.

![](https://digitalcloud.training/wp-content/uploads/2022/01/amazon-sqs-dead-letter-queue-redrive-policy.jpeg)

Dead-letter queues will break the order of messages in FIFO queues.

DLQ must be the same type with the original queue (standard or FIFO).

It's possible for a message is delivered but the consumer never received it, we don't recommend setting the number of maximum receives to 1 for a dead-letter queue.


## Benefits

Useful for debugging applications because you can isolate unconsumed messages to determine why processing did not succeed.

DLQs can be used to configure alarms based on message availability counts. Once a message is sent to DLQs, you can trigger alarms to notify operation teams.

It allows you to quickly identify which logs to investigate for exceptions.

Analyze the SQS message contents for any errors.

Troubleshoot consumer permissions.


## Configure DLQ for a queue

To configure a dead-letter queue for an existing queue:
1. Edit the queue in the console
2. Scroll to the **Dead-letter queue** section and choose Scroll to the Dead-letter queue section and choose Enabled.
3. Choose an existing Dead Letter Queue that you want to associate with this source queue.


## Redrive policy

The redrive policy redirects messages to a dead-letter queue after the source queue fails to process a message a specified number of times.

This's specified in `maxReceiveCount`.


## Redrive allow policy

This policy defines which source queues can use this queue as the dead-letter queue:
- Allow All Source Queues: By default, all source queues can use the DLQ.
- Allow Specific Source Queues: You can specify up to 10 source queues using their Amazon Resource Names (ARNs).
- Deny All Source Queues: If you choose this option, the queue cannot be used as a DLQ.


## DQL redrive

You can move messages out of a dead-letter queue to the source queue or any other queue has the same type, using dead-letter queue redrive.

Dead-letter queues redrive messages in the order they are received, starting with the oldest message.

You can configure a dead-letter queue redrive using APIs or in the console.

You can [configuring queue permissions for dead-letter queue redrive](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-configure-dead-letter-queue-redrive.html#sqs-configure-dead-letter-queue-redrive-permissions), more details [here](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues-cloudtrail.html#sqs-dead-letter-queues-cloudtrail-permissions).


## Create alarms for DLQs

You can configure an alarm for any messages moved to a dead-letter queue using Amazon CloudWatch

Metric: `ApproximateNumberOfMessagesVisible`.


## Message retention periods of DLQs

For standard queues, always set the retention period of a dead-letter queue to be longer than the retention period of the original queue.


## Tips

Make sure you set up an alarm and alert on queue depth.
