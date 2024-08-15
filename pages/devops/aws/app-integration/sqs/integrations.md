# Integrations

## Amazon EventBridge

Amazon EventBridge lets you automate AWS services and respond to system events.

Events from AWS services are delivered to EventBridge nearly in real time. 

You can write simple rules to indicate which events are of interest to you and what automated actions to take when an event matches a rule.

EventBridge lets you set a variety of targets—such as Amazon SQS standard and FIFO queues.


## Amazon EventBridge Pipes

EventBridge Pipes provide a highly scalable way to connect Amazon SQS queue to AWS services such as:
- Step Functions
- Amazon SQS
- API Gateway
- SaaS applications: Salesforce, ...

On the details page for an Amazon SQS queue, you can view the pipes that use that queue as their source.

References:
- [Amazon Simple Queue Service as a source for Amazon EventBridge](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-pipes-sqs.html)


## Amazon SNS

You can subscribe Amazon SQS queues to an Amazon SNS topic.

When you publish a message to a topic, Amazon SNS sends the message to each of the subscribed queues. Amazon SQS manages the subscription and any necessary permissions.

If your Amazon SQS queue and SNS topic are in different AWS accounts, the topic owner must first confirm the subscription.


## AWS Lambda

You can use an AWS Lambda function to process messages in an Amazon SQS queue.

Lambda polls the queue and invokes your Lambda function synchronously with an event that contains queue messages.

To allow your function time to process each batch of records, set the source queue's visibility timeout to at least six times the timeout that you configure on your function.

You can specify another queue to act as a dead-letter queue for messages that your Lambda function can't process.

A Lambda function can process items from multiple queues.

You can use the same queue with multiple Lambda functions.

If an encrypted queue is associated with a Lambda function but Lambda doesn't poll for messages, add the `kms:Decrypt` permission to your Lambda execution role.

Restrictions:
- Your queue and the Lambda function must be in the same AWS Region.
- An encrypted queue that uses the default key (AWS managed KMS key for Amazon SQS) cannot invoke a Lambda function in a different AWS account.