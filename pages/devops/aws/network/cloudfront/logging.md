# Logging and Auditing

## Real Time Logs

Enable yous to get all the requests that are received by CloudFront to be sent in real time to a Kinesis Data Stream.

Use case: Monitor, analyze, and take actions based on content delivery performance.

You can configure:
- Sampling Rate - percentage of requests for which you want to receive
- Specific fields and specific Cache Behaviors (path patterns) to send to Kinesis Data Stream


## Auditing

CloudFront is integrated with CloudTrail.

CloudTrail captures information about all API calls make to CloudFront.

CloudTrail can be used to determine which requests were made, the source IP address, who made the request etc.

CloudTrail saves logs to the S3 bucket you specify.

S3 buckets can be configured to create access logs and cookie logs which log all requests.

Amazon Athena can be used to analyze access logs.

To view CloudFront API requests in CloudTrail logs you must update an existing trail to include global services.
