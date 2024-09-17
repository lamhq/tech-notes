# Types of workflow

Each workflow has executions. Executions are instances where you run your workflows in order to perform your tasks.

## Standard (default)

Can run for up to 1 year

Have exactly-once execution

Execution rate over 2000 executions / second

History ip to 90 days or using CloudWatch to keep log forever

Pricing based per state transition

Useful for non-idempotent actions (e.g., processing Payments)


## Express


Can run for up to 5 minutes.

Execution rate over 100,000 executions / second

Execution results can only be viewed using CloudWatch Logs

Pricing based on number of executions, durations, consumed memory

Useful for high-event-rate workloads (e.g., IoT data ingestion, data streaming, mobile app backends).

Have 2 execution modes:
- Synchronous: run at-most once
- Asynchronous: run at-least once. You need to handle idempotence to ensure that executing the same action multiple times doesn’t result in duplicated effects.
