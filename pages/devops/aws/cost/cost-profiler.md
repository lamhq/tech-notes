# AWS Application Cost Profiler

## Overview

AWS Application Cost Profiler is a managed service that allows you to view and allocate the cost of AWS resources for software applications shared by multiple users (often referred to as tenants).


## How it work?

1. **Data Collection**:
- The profiler collects data from various AWS services, including EC2 instances, RDS databases, S3 buckets, Lambda functions, and more.
- It tracks usage metrics, such as compute hours, storage, data transfer, and API requests.

2. **Cost Attribution**:
- The profiler assigns costs to specific resources based on usage data.
- It categorizes costs by service, region, and tags (if you've tagged your resources).

3. **Visualization and Analysis**:
- You can view your cost data in the AWS Management Console.
- The profiler generates charts, graphs, and reports to help you understand your spending patterns.
- It highlights areas where costs are high or unexpected.

4. **Recommendations**:
- Based on your usage and historical data, the profiler suggests cost-saving actions.
- These recommendations may include resizing instances, using reserved instances, or adjusting auto-scaling settings.

5. **Customization**:
- You can set budget thresholds and receive alerts when costs exceed them.
- The profiler allows you to customize your cost allocation rules and adjust resource groupings.