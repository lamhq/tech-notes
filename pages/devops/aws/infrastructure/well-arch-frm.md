# AWS Well-Architected Framework

## Overview

Amazon provided guidelines for all the essential areas of cloud-native development, called the **well-architected framework**, to help people overcome challenges when developing cloud-native business applications, such as scaling, costing, efficiency, infrastructure, etc.

It is a collection of design principles and best practices to ensure that the product one develops contains all the traits required for a successful application.


## Why use it?

- **Learn the best practices for building highly efficient software**: efficient, reliable, cost-effective, secure, and dependable.
- **You can focus on functional requirements**. The framework provides recipes to build an efficient system, allowing you to focus on developing business requirements instead of spending time on technical challenges.
- **Continued excellence**. You can track the various aspects of your system and fix any issues proactively base on design values and best practices from the framework
- **Get AWS Certified**. Becoming AWS certified is the best way to understand the well-architected framework.


The Well-Architected Framework is based on six pillars:

## Security

Protecting data and infrastructure.

Core values of the security pillar:
- Manager user and role permissions to access data, services, and servers
- Keep the data confidential and maintain the integrity of the data
- Implement processes to detect any security-related anomalies

Best practices:
- Implement a centralized mechanism for user authentication and authorization (e.g. IAM)
- Static credentials must be avoided at all costs.
- Implement the principle of least privilege for every user and every cloud service.
- Have a strong system of tracking, logging, and alerting user access. Put security audit controls in place.
- Protect both the data in transit (e.g. SSL, tokenization, etc.) and data in rest (e.g. encryption)
- Apply security at all layers (load balancer, VPC, instances, service, os access, code access, database access, etc.)


## Operational Excellence

This pillar focuses on continued excellence in delivering value to the customer.

Core values:
- Release small and frequent product updates that can be reversed easily (smaller code PR is one example).
- Optimize and refine the processes frequently
- Anticipate failure and keep the action items ready if failure happens
- Perform operations-as-code

Best practices:
- Design and architect your workload such that it can tolerate frequent updates.
- Changes must be reversible in a quick time without impacting customer experience
- Keep improving your processes. Convene regular meetings like scrum retrospective meetings or "lessons learned" meetings to achieve continued excellence.
- Perform "Pre-mortem" exercises and maintain a "Risk register" to identify potential sources of failure so you can plan the mitigation in advance.
- Define all your applications, infrastructure, and services through code and update them with code only. This will limit human error and enforce consistent responses to all incidents.


## Reliability

Ensures that the application is performing its intended functions and is able to recover from failure to meet demands

Core values:
- Monitoring workloads for KPI’s so you can trigger automation when a performance threshold is triggered.
- Automatic notification, tracking, and recovery from failures
- Automate to simulate different failure scenarios to validate your recovery procedures
- Scale horizontally instead of vertical scaling to reduce single point of failure

Best practices:
- Automate the changes in infrastructure, applications, and the automation itself.
- Set up triggers and alarms based on the health of the server/service and implement horizontal scaling to add more resources when a health check is triggered. *E.g. Launch another EC2 server into the cluster if the existing EC2 server’s CPU exceeds 80%*.
- Perform stress and load testing on your system to identify and rectify any scaling issues
- Implement an automatic failover strategy. *One example is blue-green deployments if you are handling deployments yourself, or you can use serverless components to achieve automatic failover*.
- Maintain proper backup of data, including database automatic backups and server disk storage. You need to ensure optimal recovery time objective (RTO) and recovery point objective (RPO) KPI’s.


## Performance Efficiency

Using IT and computing resources efficiently. The system should be able to scale according to the needs.

Core values:
- Design a high-performance architecture that considers future needs related to scaling, performance, data, etc.
- Delegate complex tasks to your cloud vendor instead of managing them inhouse. Some workloads require special expertise. *For example, the cloud should handle NoSQL databases, machine learning, and database replication*.
- Use serverless architecture as much as possible.
- Experiment more often with different configuration options

Best practices:
- Combine different approaches in your implementation
- Implement what you do best and delegate the rest to the cloud vendor. *For example, it is difficult to maintain on-premise read-only replicas for any RDBMS; you should use a fully managed service like RDS*.
- Choose the cloud service which is ideal for your specific business need. *Take the example of an IO-intensive workload, you should select IO-intensive SSD storage instead of general-purpose SSD storage.*
- Implement a proper monitoring solution to monitor different areas of your application. *One example is to use AWS cloud watch to see the logs of different activities and set up alarms based on various metrics*.
- Review the latest trends and offering in the cloud world, specifically your cloud vendor. Take advantage of the latest technologies. Keep evolving your architecture over time.


## Cost Optimization

Avoiding unnecessary costs.

Core values:
- Identify overspending
- Control fund allocation
- Select cloud resources that are the best fit for your needs
- Ability to scale without overspending

Best practices:
- Use the right-sizing approach to ensure that your cost is aligned with your actual demand. *For example, instead of provisioning a large server, start with a small server and gradually upgrade it to see the best fit for your needs*.
- Stop development and test servers during non-working hours to save cost
- Take advantage of the pay-as-you-go modal instead of buying reserved servers. Adopting a serverless approach is recommended.
- Take advantage of ad-hoc cheaper resources for needs that are not mission critical. *One example is using AWS spot instances, which are much cheaper*.
- Instead of manually provisioning resources, take advantage of automation. That includes dynamic scaling, IaC (Infrastructure as code), etc.
- Use the cost reports, financial insights, and cost dashboards provided by the cloud vendor to keep an eye on detailed costs for different application areas.
- Regularly review the costs and your services. Keep optimizing your services and costs based on the dynamic needs of your solution.


## Sustainability

Minimizing the environmental impacts of running cloud workloads.

Core design principles:
- Set long-term sustainability goals for your workloads and model your ROI
- Preferably use managed services as they reduce the amount of infrastructure required to maintain a broad range of workloads
- Choose the infrastructure and services for your workloads such that it maximizes the efficiency of the underlying hardware and minimizes idle resources.
- Adopt new and efficient hardware/software to maximize your efficiency

Best practices:
- Optimize the geographical location of your workloads; e.g. use CDN, edge computing, etc.
- Optimize the code, which takes the most time and resource.
- Use life cycle policies to delete unneeded data. *One example is AWS S3 life cycle policies*.
- Minimize network traffic between different networks.
- Increase the utilization of your build environment.