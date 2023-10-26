# AWS CloudTrail

AWS CloudTrail records API calls for your account.

The recorded information includes the identity of the API caller, the time of the API call, the source IP address of the API caller, and more.

With CloudTrail, you can view a complete history of user activity and API calls for your applications and resources. 

> Suppose that the coffee shop owner is browsing through the AWS Identity and Access Management (IAM) section of the AWS Management Console. They discover that a new IAM user named Mary was created, but they do not who, when, or which method created the user.
>
> To answer these questions, the owner navigates to AWS CloudTrail.
>
> ![](images/cloudtrail.png)
> On January 1, 2020 at 9:00 AM, IAM user John created a new IAM user (Mary) through the AWS Management Console.


## CloudTrail Insights

Within CloudTrail, you can also enable 
**CloudTrail Insights**. This optional feature allows CloudTrail to automatically detect unusual API activities in your AWS account. 

> For example, CloudTrail Insights might detect that a higher number of Amazon EC2 instances than usual have recently launched in your account. You can then review the full event details to determine which actions you need to take next.