# Monitoring on AWS

When operating a website on AWS you may have questions like:

- How many people are visiting my site day to day?
- How can I track the number of visitors over time?
- How will I know if the website is having performance or availability issues?
- What happens if my Amazon Elastic Compute Cloud (EC2) instance runs out of capacity?
- Will I be alerted if my website goes down?

You need a way to collect and analyze data about the operational health and usage of your resources. The act of collecting, analyzing, and using data to make decisions or answer questions about your IT resources and systems is called monitoring.

You can use the data you collect to watch for operational issues caused by events like over-utilization of resources, application flaws, resource misconfiguration, or security-related events.


## Use Metrics to Solve Problems

The resources that host your solutions on AWS all create various forms of data that you might be interested in collecting. You can think of each individual data point that is created by a resource as a metric.

*Consider this example: One way to evaluate the health of an Amazon EC2 instance is through CPU utilization. Generally speaking, if an EC2 instance has a high CPU utilization, it can mean a flood of requests. Or it can reflect a process that has encountered an error and is consuming too much of the CPU. When analyzing CPU utilization, take a process that exceeds a specific threshold for an unusual length of time. Use that abnormal event as a cue to either manually or automatically resolve the issue through actions like scaling the instance.*

## Types of Metrics

Different resources in AWS create different types of metrics.

*An Amazon Simple Storage Service (S3) bucket would not have CPU utilization like an EC2 instance does. Instead, S3 creates metrics related to the objects stored in a bucket like the overall size, or the number of objects in a bucket. S3 also has metrics related to the requests made to the bucket such as reading or writing objects.*


## Benefits of Monitoring

- Respond to operational issues proactively before your end users are aware of them.
- Improve the performance and reliability of your resources.
- Recognize security threats and events.
- Make data-driven decisions for your business. *Let's say you launched a new feature for your cat photo app, and want to know whether it's being used. You can collect application-level metrics and view the number of users who use the new feature. With your findings, you decide whether to invest more time into improving the new feature.*
- Create more cost-effective solutions. *You can view resources that are being underutilized and rightsize your resources to your usage. This helps you optimize cost and make sure you aren't spending more money than necessary.*
