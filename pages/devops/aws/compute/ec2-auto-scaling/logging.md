# Logging and Auditing

AWS CloudTrail captures all API calls for AWS Auto Scaling as events.

The API calls that are captured include calls from the Amazon EC2 Auto Scaling console and code calls to the AWS Auto Scaling API.

If you create a trail, you can enable continuous delivery of CloudTrail events to an Amazon S3 bucket, including events for AWS Auto Scaling.

If you don’t configure a trail, you can still view the most recent (up to 90 days) events in the CloudTrail console in the Event history.

CloudTrail events include the calls made to AWS Auto Scaling, the IP address from which the requests were made, who made the requests, when they were made, and additional details.