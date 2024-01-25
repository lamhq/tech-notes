# Security

You can use IAM policies to control who can read/write messages.

Authentication can be used to secure messages within queues (who can send and receive).

Can enable server-side encryption (SSE) using KMS.
- Can set the CMK you want to use.
- Can set the data key reuse period.
- SSE only encrypts the message body not the message attributes.

IAM policy must allow usage of SQS.

You can also specify permissions in an **SQS queue access policy**:
- Providers finer grained control.
- Control over the requests that come in.
