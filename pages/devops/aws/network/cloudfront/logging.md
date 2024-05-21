# Logging and Auditing

CloudFront is integrated with CloudTrail.

CloudTrail captures information about all requests whether they were made using CloudFront console, API, AWS SDKs, CLI, or another service.

CloudTrail can be used to determine which requests were made, the source IP address, who made the request etc.

CloudTrail saves logs to the S3 bucket you specify.

S3 buckets can be configured to create access logs and cookie logs which log all requests.

Amazon Athena can be used to analyze access logs.

To view CloudFront requests in CloudTrail logs you must update an existing trail to include global services.
