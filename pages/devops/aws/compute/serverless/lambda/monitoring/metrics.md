# Metrics

## Invocation Metrics

Invocation metrics show information about the invocations that are occurring across Lambda functions.

- Number of invocations: can be totals across a region, as well as by each function.
- **Errors**: for function and runtime errors that were uncaught and caused a failure, includes timeouts. Can be seen cross all functions or individual ones.
- **Throttles**: great for seeing if concurrency limits are being hit. Not included in **Errors** metrics
- **Async Events Received/Age/Dropped**: for tracking any events that aren't being processed fast enough and might be being lost
- Dead Letter Errors, Destination Delivery Failures: useful if there are problems on sending function's output to destinations
- Recursion Invocations Dropped: detects a function is repeatedly being invoked in a loop.


## Performance Metrics

- **Duration**: time that function took to process an event
- Post Runtime Extensions Duration: the duration of processing time
of the extensions following a function completing event processing.
- **Iterator Age**: shows the amount of time between the record (from DynamoDB Streams or Kinesis Streams) being placed into the stream and Lambda picking it up


## Concurrency Metrics

- **Concurrent Executions**: number of concurrently executing function instances. Track to ensure any account or function concurrency quotas aren't close to being breached.
- Provision Concurrent Executions: the same as a previous metric, but only for provision concurrency.
- Provisioned Concurrency Utilization: the percentage of provision concurrency that is being used, allows shooting of provisioning to be at the right amount.
- Unreserved Concurrent Executions: number of concurrent executions from functions that have no reserve concurrency set


## Custom Metrics

### Configuration
When publishing application metrics, the resolution should be considered:
- Standard resolution has one-minute granularity
- High resolution has one-second granularity

You can also use dimensions (a name/value pair attached to the metric):
- These increased the number of metrics being published due to the different combinations.
- Up to 30 dimensions are supported.
- Examples: WebsitePage, ProductType

### Cost
CloudWatch has a cost (not small). You're charged per metric, per month, as well as per API call to push the metric.


### Pushing metrics
Metrics can be pushed directly with the SDK or can use embedded metrics format logging (EMF).

EMF:
- More efficient for large batches of logs.
- Asynchronous
- Has JSON specification that informs CloudWatch logs to extract the embedded metric values.
- Consider using the power tools for AWS Lambda toolkit (support batching)


### Use cases

- Track customer signups and have a dimension for signup method. You can graph and see how many signups are happening, but also how they are signing up.
- Track API usage and have dimensions for the endpoints and the client.
- Track customer inquiries that could have dimensions for the inquiry type, support agent, resolution


## Dashboard

Make sure to set up dashboards with the key infrastructure and product level metrics. This can quickly show errors and track business KPIs.

Always add alarms to key metrics so notifications are sent.