# Monitoring

## Status checks

EC2 status checks are performed every minute, and each returns a pass or a fail status.

If all checks pass, the overall status of the instance is OK.

If one or more checks fail, the overall status is impaired.

Instance status checks (`StatusCheckFailed_Instance`) detect problems that require your involvement to repair.

The following are examples of problems that can cause instance status checks to fail:

- Failed system status checks.
- Incorrect networking or startup configuration.
- Exhausted memory.
- Corrupted file system.
- Incompatible kernel.

Status checks cannot be disabled or deleted.


## Cloudwatch

You can create Amazon CloudWatch alarms that monitor Amazon EC2 instances and automatically perform an action if the status check fails.

Actions can include:
- Recover the instance (only supported on specific instance types and can be used only with `StatusCheckFailed_System`).
- Stop the instance (only applicable to EBS-backed volumes).
- Terminate the instance (cannot terminate if termination protection is enabled).
- Reboot the instance.

It is a best practice to use EC2 to reboot an instance rather than restarting through the OS.

CloudWatch Monitoring frequency:
- Standard monitoring = 5 mins.
- Detailed monitoring = 1 min (chargeable).


## Unified CloudWatch Agent

The unified CloudWatch agent enables you to do the following:

- **Collect more system-level metrics from Amazon EC2 instances**. The metrics can include in-guest metrics, in addition to the metrics for EC2 instances. The additional metrics that can be collected are listed in Metrics Collected by the CloudWatch Agent.
- **Collect system-level metrics from on-premises servers**. These can include servers in a hybrid environment as well as servers not managed by AWS.
- **Retrieve custom metrics** from your applications or services using the StatsD and collectd protocols. StatsD is supported on both Linux servers and servers running Windows Server. collectd is supported only on Linux servers.
- **Collect logs** from Amazon EC2 instances and on-premises servers, running either Linux or Windows Server.

You can download and install the CloudWatch agent manually using the command line, or you can integrate it with SSM.