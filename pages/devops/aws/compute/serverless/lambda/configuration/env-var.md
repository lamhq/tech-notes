# Environment Variables

## Overview

Environment variables are values that can be set outside of code, but to modify that code behavior in some way.

They are a key-value pair of strings.

They are stored in the configuration for a Lambda function version (they are part of the package).

They're accessible within the Lambda function code.

They can be set under the **Environment variables** section.

This includes some of the encryption options:
- **Encrypt at rest** using AWS KMS to manage encryption keys.
- **Encrypt in transit**: ensure that they aren't sent to the Lambda function in plain text. Execution role needs `kms:decrypt` permission.


## Use cases

Avoid to change the code itself to change some behavior:
- Feature toggles
- Localization: storing localized texts
- Service URLs


## When not to use it?

- Large values. Must less than 4 kb.
- Storing sensitive Data
- Highly dynamic data


## Default Environment Variables

Environment Variables provided by the Lambda service and runtime:
- `AWS_REGION`
- `AWS_LAMBDA_FUNCTION_NAME`
- `AWS_LAMBDA_RUNTIME_API`: The details of the runtime API, which is needed if you are building a custom runtime
- `LAMBDA_TASK_ROOT`: The path to the function package code
- `_X_AMZN_TRACE_ID`: the header X-Ray uses to trace a path through an application.