# Dead-Letter Queues

## Overview

Dead-letter queues (DLQ) are targets for messages that cannot be processed successfully.

Just a standard or FIFO queue that has been specified as a dead-letter queue of another queue.

![](https://digitalcloud.training/wp-content/uploads/2022/01/amazon-sqs-dead-letter-queue-redrive-policy.jpeg)

Messages are moved to the dead-letter queue when the `ReceiveCount` for a message exceeds the `maxReceiveCount` for a queue.

Dead-letter queues will break the order of messages in FIFO queues.

Useful for debugging applications and messaging systems.

**Redrive capability** allows you to move the message back into the source queue!

You can use DLQs with FIFO SQS queues, but it must ALSO be FIFO queues.

### Benefits

DLQs can be used to configure alarms based on message availability counts. Once a message is sent to DLQs, you can trigger alarms to notify operation teams.

It allows you to quickly identify which logs to investigate for exceptions.

Analyze the SQS message contents for any errors.

Troubleshoot consumer permissions.

### Tips

Make sure you set up an alarm and alert on queue depth.
