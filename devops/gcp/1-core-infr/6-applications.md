# Applications in the Cloud

## App Engine

App Engine is a fully managed, serverless platform for developing and hosting web applications at scale.

You can upload your code and Google will manage your apps availability.

App Engine built-in services and APIs:

- NoSQL data stores
- memcache
- load balancing
- health checks
- application logging
- user authentication API

App Engine SDK includes:
- APIs and libraries
- sandbox environment
- deployment tools

The SDK manages your application locally, and the Google Cloud Console manages your application in production.

You can use Cloud Console's web-based interface to:

- Create new applications
- Configure domain names
- Change which version is live
- Examine access and error logs
- Use the Security Command Center to automatically scan and detect common web application vulnerabilities.


## App Engine Environments

There are two types of App Engine environments, standard and flexible.

### Standard environment

Based on container instances running on Google's infrastructure

Containers are pre-configured with a runtime from a standardized list of supported languages and versions, which includes libraries that support App Engine standard APIs

Features include:

- persistent storage with queries, sorting and transactions
- automatic scaling and load balancing
- asynchronous task queues for performing work outside the scope of a request
- scheduled tasks for triggering events at specified times or regular intervals
- integration with other Google Cloud services and APIs.

Requirements for using the standard environment:

- use specified versions of Java, Python, PHP, Go, Node.js, and Ruby
- application must conform to sandbox constraints that are dependent on runtime

Workflow:

- Develop web app and test locally
- Deploy to App Engine with SDK
- App Engine scales and services the app

### Flexible environment

Application run inside Docker containers on Google Cloud's Compute Engine virtual machines:

- Instances are health-checked, healed, and co-located
- Critical backward-compatible updates are automatically applied to the underlying operating system
- VM instances are automatically located by geographical region  according to the settings in your project.
- VM instances are restarted on a weekly basis

The flexible environment supports:

- microservices
- authorization
- SQL and NoSQL databases
- traffic splitting
- logging
- search
- versioning
- security scanning
- Memcache
- content delivery networks

Flexible environment allows users to:

- Benefit from custom configurations and libraries, while focusing on writing code
- customize the runtime and os of your virtual machine. standard runtims: pyhon, java, go, Node.js, PHP, .NET, Ruby
- customize or provide runtimes by supplying a custom Docker image or Dockerfile

### Comparing environments

|  | standard | flexible  |
|---|---|---|
| instance startup | seconds | minutes  |
| SSH access | no | yes (not by default)  |
| write to local disk | no (some can write to /tmp) | yes, ephemeral  |
| support 3rd-party binanries | for certain languages | yes  |
| network access | via App Engine services | yes  |
| pricing model | after free tier usage, pay per instance class with automatic shutdown | pay for resource allocation per hour; no 

Compare with GKE:

- App Engine standard environment is for people who want the service to take maximum control of their web and mobile applications deployment and scaling. 
- Google Kubernetes Engine, however, gives the application owner the full flexibility of Kubernetes
- App Engine's flexible environment is somewhere between the two.