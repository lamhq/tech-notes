# Monitoring and Reporting

When Auto Scaling group metrics are enabled the Auto Scaling group sends sampled data to CloudWatch every minute (no charge).

Metrics are sent to CloudWatch every 1 minute:
- GroupMinSize
- GroupMaxSize
- GroupDesiredCapacity
- GroupInServiceInstances
- GroupPendingInstances
- GroupStandbyInstances
- GroupTerminatingInstances
- GroupTotalInstances

EC2 Auto Scaling uses health checks to check if instances are healthy and available.
- By default Auto Scaling uses EC2 status checks.
- Auto Scaling supports ELB health checks and custom health checks in addition to the EC2 status checks.
- If any of the configured health checks returns an unhealthy status the instance will be terminated.
- If connection draining is enabled, EC2 Auto Scaling will wait for any in-flight requests to complete or timeout before terminating instances.
- The health check grace period is a period of time in which a new instance is allowed to warm up before health check are performed (300 seconds by default).

*When using Elastic Load Balancers it is an AWS best practice to enable the ELB health checks. If you don’t, EC2 status checks may show an instance as being healthy that the ELB has determined is unhealthy. In this case the instance will be removed from service by the ELB but will not be terminated by Auto Scaling.*
