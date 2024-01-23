# AWS X-Ray for Application Insights

## Overview

AWS X-Ray is a service that collect data within your application for viewing, filtering, and **gaining insights about requests & responses** of your application.

X-Ray provides an end-to-end view of requests as they travel through your application and shows a map of your application’s underlying components.

AWS X-Ray helps developers analyze and debug production, distributed applications, such as those built using a microservices architecture.

With X-Ray, you can understand how your application and its underlying services are performing to identify and troubleshoot the root cause of performance issues and errors.

You can use X-Ray to analyze both applications in development and in production, from simple three-tier applications to complex microservices applications consisting of thousands of service.

The service receives traces from your applications for allow insights:
- A lot of AWS services can automatically provide traces to this service
- For different integrated services, you can add tracing headers, trace data, or run the X-Ray Daemon on the server running your app.

Integrates with AWS Lambda and Amazon API Gateway, help you gain deeper insights and understanding of your workload requests and responses.

Keywords: application insights, app request insights, viewing response times of downstream resources, HTTP response analysis


## Concepts

- **Segments**: Data containing resource names, request details, and other information
- **Subsegments**: Segments providing more granular timing information and details
- **Service graph**: Graphical representation of interacting services in requests
- **Traces**: Trace ID tracks paths of requests and traces collect all segments in a request
- **Tracing header**: Extra HTTP header containing sampling decisions and trace ID

Tracing header containing added information is named `X-Amzn-Trace-Id`.


## AWS X-Ray daemon

AWS X-Ray daemon is a software application that listens on UDP port 2000. It collects raw segment data and sends it to the AWS X-Ray API.

When the daemon is running, it works along with the AWS X-Ray SDKs.

It makes collecting your trace data and all your insights far easier when you're running this Daemon on your workers.

Integration:
- You can install and run this agent on your application's server (e.g. EC2)
- You can also install this Daemon on Amazon ECS tasks
- It is tightly integrated with AWS Lambda
and it's literally a simple on/off toggle
for your functions
- You can also use AWS Elastic Beanstalk with it
and it's a configuration option that you set
when you're creating your environment.
- You can add X-Ray insights to each stage of Amazon API Gateway
- You can integrate it with services
like even SNS and SQS to view times that are taken
for messages within queues and within topics.