# Health Checks

Health checks check the instance health by connecting to it.

You can set health checks on individual record sets.

If a record set fails a health check, it will be removed from Route 53 until it passes the health check.

Health checks can be pointed at:
- Endpoints: can be IP addresses or domain names.
- Status of other health checks.
- Status of a CloudWatch alarm.

You can set SNS notifications to alert vou about failed health checks.

You can create the following types of health checks:

- **HTTP**: Route 53 tries to establish a TCP connection. If successful, Route 53 submits an HTTP request and waits for an HTTP status code of 200 or greater and less than 400.
- **HTTPS**: Route 53 tries to establish a TCP connection. If successful, Route 53 submits an HTTPS request and waits for an HTTP status code of 200 or greater and less than 400.
- **HTTP_STR_MATCH**: Route 53 tries to establish a TCP connection. If successful, Route 53 submits an HTTP request and searches the first 5,120 bytes of the response body for the string that you specify in SearchString.
- **HTTPS_STR_MATCH**: Route 53 tries to establish a TCP connection. If successful, Route 53 submits an HTTPS request and searches the first 5,120 bytes of the response body for the string that you specify in SearchString.
- **TCP**: Route 53 tries to establish a TCP connection.
- **CLOUDWATCH_METRIC**: The health check is associated with a CloudWatch alarm. If the state of the alarm is OK, the health check is considered healthy. If the state is ALARM, the health check is considered unhealthy. If CloudWatch doesn’t have sufficient data to determine whether the state is OK or ALARM, the health check status depends on the setting for InsufficientDataHealthStatus**: Healthy, Unhealthy, or LastKnownStatus.
- **CALCULATED**: For health checks that monitor the status of other health checks, Route 53 adds up the number of health checks that Route 53 health checkers consider to be healthy and compares that number with the value of HealthThreshold.
