# Logging and Auditing

## Overview

Amazon EC2 and Amazon EBS are integrated with AWS CloudTrail.

CloudTrail captures all API calls for Amazon EC2 and Amazon EBS as events, including calls from the console and from code calls to the APIs.

If you create a trail, you can enable continuous delivery of CloudTrail events to an Amazon S3 bucket, including events for Amazon EC2 and Amazon EBS.

A trail enables you to store records indefinitely.

If you don’t configure a trail, you can still view the most recent events in the CloudTrail console by viewing Event history (past 90 days only).

Using the information collected by CloudTrail, you can determine the request that was made to Amazon EC2 and Amazon EBS, the IP address from which the request was made, who made the request, when it was made, and additional details.