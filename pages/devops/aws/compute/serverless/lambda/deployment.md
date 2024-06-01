# Deployment

## Traffic Shifting

Traffic shifting makes it's possible to implement canary deployments of Lambda functions.

By updating additional version weights on an alias, invocation traffic is routed to the new function versions based on the weight specified.

Detailed CloudWatch metrics for the alias and version can be analyzed during the deployment, or other health checks performed, to ensure that the new version is healthy before proceeding.
