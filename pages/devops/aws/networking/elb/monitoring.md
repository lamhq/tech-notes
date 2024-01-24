# Monitoring

Monitoring takes place using:

## CloudWatch
- Metrics sent every 1 minute.
- ELB service only sends information when requests are active.
- Can be used to trigger SNS notifications.

## Access Logs
- Disabled by default.
- Includes information about the clients (not included in CloudWatch metrics).
- Can identify requester, IP, request type etc.
- Can be optionally stored and retained in S3.
- ALB also logs requests that never reached targets.

## CloudTrail
- Can be used to capture API calls to the ELB.
- Can be stored in an S3 bucket.
