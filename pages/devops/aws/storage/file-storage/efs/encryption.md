# Encryption

Encryption keys are managed by the AWS Key Management Service (KMS).

Encryption in transit:

- Data encryption in transit uses TLS 1.2 to encrypt data sent between your clients and EFS file systems.
- Encryption in transit is enabled when mounting the file system.

Encryption at rest:

- Encryption at rest MUST be enabled at file system creation time.
- Data encrypted at rest is transparently encrypted while being written, and transparently decrypted while being read.
