# AWS Cost Explorer

## Overview

AWS Cost Explorer is an easy-to-use tool that allows you to visualize and analyze your cloud costs.

You can generate custom reports based on a variety of factors, including resource tags.

Break down cost by Monthly, Hourly, and more!

Built-in forecasting up to 12 months.


## Features

- Time: specifies the time period you want to cover for your reports.
- Filter: allows you to filter on tags, categories of services, account IDs, etc.
- Service: allows you to easily break down the cost based on service by service options. This is useful when you want to see how much a specific service is costing you compared to your overall bill.


## Example

This example of the AWS Cost Explorer dashboard displays monthly costs for Amazon EC2 instances over a 6-month period. The bar for each month separates the costs for different Amazon EC2 instance types (such as t2.micro or m3.large). 

![](./images/cost-explorer.png)


## Tips

- Think of Cost Explorer whenever the scenario is about budgeting and controlling spend. It works hand in hand with AWS Budgets.
- Use tags to track your spend. They are one of the most important ways to generate accurate reports and budget spend.
- If you're part of an organization and have consolidated billing in place, the payer account can break down costs per linked account. So you can see just one or two accounts out of your entire organization using that linked account view.
