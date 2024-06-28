# AWS Cost and Usage Reports

## Overview

AWS Cost and Usage Reports (AWS CUR) is a comprehensive report that includes metadata about: services, pricing, credits, fees, taxes, discounts, cost categories, savings plans, and reserved instances.

Can be published to an S3 bucket for centralized collection and are updated **once a day**.

Can be broken down by certain time span (hour, day, month), service, resource, tags (similar to Cost Explorer).

Can be exported into XML or CSV files.

Can be used with analytics services like Athena to query your data, or ingested to Redshift or visualized with QuickSight.

The report can be found in the billing console of your AWS account.


## Use cases

1. **Organizational granularity**: You can use this within an organization or entire OU groups or individual accounts.
2. **Savings plan tracking**: you can track things like utilization, charges, current allocations.
3. **Monitor on-demand capacity reservations**: to see what you're spending on your on-demand instances.
4. **Break down data transfer charges**: you can easily generate a daily report to see what your external and inter-region charges are for your data. This can be extremely useful for realizing that you need to implement VPC endpoints instead of using public internet transfers.
5. **Dive deeper into Cost allocation tags**: for your resource spending. So if you set cost allocation tags at the organization level, you're requiring people go ahead and use those tags on the resources. You can easily dive deep into resource spending based on those tags. An example could be an environment like development or production or maybe an application team owner where they have their own member ID that you leverage in your billing reports.
