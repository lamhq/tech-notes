# Quotas

## FIFO queue

- The **maximum long polling wait time** is 20 seconds.
- The number of message groups within a FIFO queue is unlimited
- The number of messages is unlimited.

## Standard queue

- A queue name can have up to 80 characters.


## Message quotas

- A batched message ID can have up to 80 characters. Allow alphanumeric characters, hyphens (-), and underscores (_).
- A message can contain up to 10 metadata attributes.
- A message batch request can include a maximum of 10 messages
- Only some Unicode characters are allowed in message content
  
## Reference

- [Amazon SQS quotas](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-quotas.html)
