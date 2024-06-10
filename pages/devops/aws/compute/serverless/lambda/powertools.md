# Powertools for AWS Lambda

## Overview

The power tools are a suite of utilities for AWS Lambda.

Opinionated, to enforce best practices.

Can be deployed as a dependency or as a Lambda layer.

Available for multiple languages, but not all features exist in each language:
- Python (most fully-featured)
- TypeScript
- .NET
- Java


## Tracing

The tracing utility is a wrapper for AWS X-Ray.

X-ray is a distributed tracking system for visualizing requests throughout a distributed system.

Auto-captures a cold start annotation, for easily filtering traces between cold starts and warm starts

Auto patches supported modules to instrument downstream service calls (SDK calls for example)

Include full responses in metadata by default

Capture full exceptions as metadata.

The function must have tracing enabled in the configuration and have the correct permissions to be able to report details to x-ray.


## Logging

Can be used for structured logging.

By default, it captures key fields from the context, including the full event if enabled.

Supports log levels that can be switched with environment variables.

Supports sampling to log debug messages based on a configured percentage.

Captures unhandled exceptions and logs full error information.

Check the [Official Documentation](https://docs.powertools.aws.dev/lambda/python/latest/core/logger/) for more details.

```py
from aws_lambda_powertools import Logger
from aws_lambda_powertools.utilities.typing import LambdaContext

logger = Logger(service="SampleApp")

@logger.inject_lambda_context(log_event=True)
def lambda_handler(event: dict, context: LambdaContext) -> str:
    fields = {"request_id": "1123"}
    logger.info("Collecting payment", extra=fields)

    return "hello world"
```


## Metric

Can be used to create custom metrics using the CloudWatch embedded metric format.

CloudWatch will asynchronously create the metrics from the batched output.

It also validates metrics against common mistakes.

Extra key value dimensions can be added to any metrics

```py
from aws_lambda_powertools import Metrics
from aws_lambda_powertools.metrics import MetricUnit
from aws_lambda_powertools.utilities.typing import LambdaContext

metrics = Metrics(service="SampleApp", namespace="Project")

# ensures metrics are flushed upon request completion/failure
@metrics.log_metrics
def lambda_handler(event: dict, context: LambdaContext):
    # add dimension to any metrics
    metrics.add_dimension(name="environment", value="dev")
    # add the metric
    metrics.add_metric(name="SuccessfulBooking",
      unit=MetricUnit.Count, value=1)
```


## Parameters Retrieval

Utility to easily read parameter values from external sources.

Supports Systems Manager Parameter Store, Secrets Manager, AppConfig, DynamoDB, or your own.

Caches parameter values for short periods, default is 5 seconds.

Built-in deserialization/transformation (JSON, base64, ...)


## Idempotency Support

For asynchronous systems, it can be important that events aren't handled multiple times.

An idempotent function guarantees that if hit with the same event multiple times, it will produce the same result.

The idempotency utility adds a persistence layer containing a hash of the function event or key fields from the event.


## Other Features

Event handler for specific invocation methods like AppSync
or API gateway.

Helper for batch processing of records from sources like SQS.

Validation utility for JSON schema on events and responses.

Parser for data parsing and deep validation.

Simple feature flag rule engine, that can be used to check
whether features should be enabled.

Streaming utility for assisting handling large objects from Amazon S3.