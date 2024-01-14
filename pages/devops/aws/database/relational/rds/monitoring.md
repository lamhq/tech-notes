# Monitoring, Logging and Reporting

## Events and Notifications

You can subscribe to Amazon RDS events to be notified when changes occur with a DB instance, DB snapshot, DB parameter group, or DB security group.

You can view events from the last 14 days using the CLI (`DescribeEvents` API).

Using the AWS Console you can only view RDS events for the last 1 day.

Amazon RDS uses AWS SNS to send RDS events via notifications.


## Amazon RDS console

View, download, or watch database log files using the Amazon RDS console or Amazon RDS API operations.

You can also query some database log files that are loaded into database tables.


## Amazon RDS Performance Insights

Amazon RDS Performance Insights allows to assess the load on your database and determine when and where to act.


## Amazon RDS Recommendations

Look at automated recommendations for database resources, such as DB instances, read replicas, and DB parameter groups.


## Amazon CloudWatch

**Amazon CloudWatch Metrics**: You can view metrics sent from Amazon RDS and perform actions based on the metric and a threshold you set.

**Amazon CloudWatch Logs**: You can monitor, store, and access your database log files.


## Amazon EventBridge

Amazon EventBridge – You can automate AWS services and respond to system events such as application availability issues or resource changes.

Events from AWS services are delivered to CloudWatch Events and EventBridge nearly in real time.

You can write simple rules to indicate which events interest you and what automated actions to take when an event matches a rule


## AWS CloudTrail 

You can view a record of actions taken by a user, role, or an AWS service in Amazon RDS. 

CloudTrail captures all API calls for Amazon RDS as events.

These captures include calls from the Amazon RDS console and from code calls to the Amazon RDS API operations.

If you create a trail, you can enable continuous delivery of CloudTrail events to an Amazon S3 bucket, including events for Amazon RDS.

If you don’t configure a trail, you can still view the most recent events in the CloudTrail console in Event history.