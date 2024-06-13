# Cloud Solutions

## Infrastructure as a Service (IaaS)

Service Providers manage the hardware (virtualization, servers, storage, networking, electricity).

Customers are responsible for managing aspects such as applications, data, virtual machines, runtime, middleware, OS.

Examples:
- Amazon EC2
- Google Compute Engine
- Google Cloud Storage
- Azure Virtual Machines


## Platform as a Service (PaaS)

PaaS delivers a framework for developers that they can use to create customized applications.

Service provider manage the hardware, plus runtime, middleware, OS, virtualization, servers, storage, network.

Customers manage the application and data on a platform.

Characteristics:
- Customers pay for the resources they actually use
- Resources can easily be scaled up or down as your business changes
- Integrates web services and databases

Limitations:
- Data security
- Integrations
- Vendor lock-in
- Customization of legacy systems
- Runtime issues
- Operational limitation

Examples:
- AWS Elastic Beanstalk
- Google App Engine
- Google Cloud SQL
- Heroku
- OpenShift


## Backend as a Service (BaaS)

A cloud service model that enables developers to outsource the backend part to service provider. So they can focus on building the frontend of applications.

This model provides developers with a suite of tools to manage server-side operations such as:
- database management
- user authentication
- cloud storage
- push notifications
- hosting

Benefits:
- Help developers concentrate on the frontend and user experience.
- Cost-effective. Offer pre-built backend services that can be easily integrated via APIs and SDKs, eliminates the need to manage backend infrastructure.
- Scale automatically with the application's needs.
- Help speed up the development process and bring their applications to market faster.

Use case:
- Small teams or individual developers who may not have the resources to manage a full backend infrastructure but still want to create robust, scalable applications.

Limitations:
- Limited Control over backend environment
- Vendor Lock-in. Challenging to migrate to another service without significant rework.
- Can sometimes lead to unforeseen costs if the application's usage exceeds the estimated values


## Function as a Service (FaaS)

A cloud computing service that allows you to execute code (functions) in response to events.

You will be responsible for managing only the **application**.

Everything else is managed by service provider.

Examples:
- AWS Lambda
- Google Cloud Functions
- Azure Functions


## Software as a Service (SaaS)

SaaS is a way of delivering applications over the internet to the end user without local installation.

Customers don't have to manage anything at all, they simply use the application.

Characteristics:
- Customers pay for the resources they allocate ahead of time

Examples:
- Zoom
- Dropbox
- Mailchimp
- Slack
- Google Workspace (Gmail, Docs and Drive)
- Salesforce
- Cisco WebEx
- Concur
- GoToMeeting.

Use cases:
- Startups or small companies that need to launch ecommerce quickly and don't have time for server issues or software
- Short-term projects that require quick, easy, and affordable collaboration
- Applications that aren't needed too often
- Applications that need both web and mobile access


Limitations:
- Interoperability. Integration with existing apps and services
- Vendor lock-in
- Lack of integration support
- Data security
- Customization
- Lack of control
- Feature limitations.
- Performance and downtime.


## Who manages what?

|                | Traditional IT | IaaS | Paas | Saas |
|---------------:|:--------------:|:----:|:----:|:----:|
| Applications   | You            | You  | You  |      |
| Data           | You            | You  | You  |      |
| Runtime        | You            | You  |      |      |
| Middleware     | You            | You  |      |      |
| OS             | You            |      |      |      |
| Virtualization | You            |      |      |      |
| Servers        | You            |      |      |      |
| Storage        | You            |      |      |      |
| Networking     | You            |      |      |      |
