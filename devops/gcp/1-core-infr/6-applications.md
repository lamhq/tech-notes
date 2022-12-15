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


## Google Cloud API management tools

Google Cloud provides three API management tools: Cloud Endpoints, API Gateway, and Apigee Edge.

### Cloud Endpoints

- Distributed API management system
- Provides an API console, hosting, logging, monitoring, and other features
- Use with any APIs that support the OpenAPI specification
- Supports applications running in App Engine, Google Kubernetes Engine, Compute Engine
- Clients include Android, iOS, and Javascript

### API Gateway

- Backend implementations can vary for a single service provider
- Provide secure access to your backend services through a well-defined REST API
- Clients consume your REST APIs to implement standalone apps

### Apigee Edge

- Specific focus on business problems, like rate limiting, quotas, and analytics
- Many Apigee Edge users provide a software service to other companies.
- Backend services for Apigee Edge don't have to be in Google Cloud


## Cloud Run

- A managed compute platform that lets you run stateless Containers
- Serverless, removing all infrastructure management tasks
- Built on Knative, an open API and runtime environment built on Kubernetes 
- Can automatically scale up and down from zero almost instantaneously
- Charging only for the resources used

Development workflow:
- Write code
- Build and package
- Deploy to Cloud Run (can only deploy images that are stored in Artifact Registry)

Once you've deployed your container image, you'll get a unique HTTPS URL back. By default, your application is exposed on a unique sub domain of the `globalrun.appdomain`. You can also use your own custom domain.

You can use Cloud Run to run any binary as long as it's compiled for Linux 64 bit.

You can use a container-based workflow as well as a source-based workflow. If you use the source-based approach, you'll deploy your source code instead of a container image.

Pricing:

- You only pay for the system resources you use while a container is handling web requests and when it's starting or shutting down.
- You don't pay for anything if your container doesn't handle requests.
- There was a small fee for every one million requests you serve.
- The price of container time increases with CPU and memory


## Quiz

1. App Engine is best suited to the development and hosting of which type of application?
    > web application

2. Which statements are true about App Engine?
    > The daily billing for an App Engine application can drop to zero.
    > App Engine manages the hardware and networking infrastructure required to run your code. 

3. What are the advantages of using App Engine’s flexible environment instead of its standard environment?
    > Your application can write to the local disk.
    > You can use SSH to connect to the virtual machines on which your application runs.
    > You can install third-party binaries.

4. Which Google Cloud service should you choose to perform business analytics and billing on a customer-facing API?
    > Apigee Edge

5. Select the managed compute platform that lets you run stateless containers through web requests or Pub/Sub events.
    > Cloud Run

6. Cloud Run can only pull images from: 
    > Artifact Registry