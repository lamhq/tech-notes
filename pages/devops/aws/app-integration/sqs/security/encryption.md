# Encryption

## Encryption in Transit

You can protect data while it travels to and from Amazon SQS using Secure Sockets Layer (SSL) or client-side encryption.


## Data Encryption at Rest

### Amazon SQS managed SSE

Amazon SQS managed SSE (SSE-SQS) enables custom server-side encryption using **SQS-managed keys** to protect sensitive data in message queues.

You don't need to create and manage encryption keys, or modify your code to encrypt your data.

SSE-SQS lets you transmit data securely and helps you meet strict encryption compliance and regulatory requirements at no additional cost.

SSE-SQS protects data at rest using 256-bit Advanced Encryption Standard (AES-256) encryption.

Amazon SQS stores messages in encrypted form and decrypts them only when sending them to an authorized consumer.


### Amazon SQS KMS SSE

Amazon SQS integrates with the Amazon Web Services Key Management Service (Amazon Web Services KMS) to manage KMS keys for server-side encryption (SSE).

The KMS key must have a key policy that includes permissions for all principals that are authorized to use the queue.