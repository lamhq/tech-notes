# Secrets Handling

## Environment Variables

Environment variables are clear text by default.

They can be encrypted at rest and in transit.

No auditing, access control, or rotation support (automated way to update the secrets on a regular basis).

Avoid using environmental variables for secrets (possibly only static, low-security values such as API keys for test resources).

Consider using Parameter Store or Secrets Manager.


## Parameters and Secrets Extension

You can use **Parameters and Secrets Extension** to access secrets from Secrets Manager and Parameter Store to reduce time and save costs.

It provides an in-memory cache for parameters and secrets:
- Uses the local cache if already retrieved
- Reads it from Parameter Store or Secrets Manager and populates cache if not
- Also supports TTL functionality to avoid stale data

The execution role needs permissions to access Parameter Store or Secrets Manager.

The extension is distributed as a Lambda layer.

It's available for arm64 and X86 architectures.

[Example code](https://aws.amazon.com/blogs/compute/using-the-aws-parameter-and-secrets-lambda-extension-to-cache-parameters-and-secrets/) for using Parameters and Secrets Extension.


## Lambda Powertools

Lambda Powertools can also be used to access secrets and add a lot of different features:
- tracing
- logging
- metrics
- idempotency utility (for dealing with duplicated events)
- validation utility
- parameters and secrets utility

Different languages have different capabilities; not all have support for parameters/secrets.

Can be installed to a function as a layer or pulled in as a dependency.

[Example code](https://aws.amazon.com/blogs/compute/retrieving-parameters-and-secrets-with-powertools-for-aws-lambda-typescript/) of retrieving parameters and secrets with Powertools for AWS Lambda.