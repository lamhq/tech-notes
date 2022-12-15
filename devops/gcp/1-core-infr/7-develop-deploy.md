# Developing and Deploying in the Cloud

## Cloud Source Repositories 

You can have any number of private Git repositories.

It allows Google Cloud diagnostics tools, like Debugger and Error Reporting, to use the code from Git repositories to track down issues to specific errors in deployed code.

You can migrate code from GitHub or BitBucket repositories.


## Cloud Functions

- Cloud Functions is a lightweight, event-based, asynchronous compute solution
- Allows you to create small, single-purpose functions that respond to cloud events, without the need to manage a server or a runtime environment
- Billed to the nearest 100 milliseconds, only while your code is running
- Supports writing source code in a number of programming languages: Node.js, Python, Go, Java, .NET Core, Ruby, PHP
- Events from Cloud Storage and Pub/Sub can trigger Cloud Functions asynchronously, or you can use HTTP invocation for synchronous execution


## Deployment: Infrastructure as Code

To use Terraform, you create a template file using HashiCorp Configuration Language, HCL, that describes what you want the components of the environment to look like.

Terraform uses that template to determine the actions needed to create the environment your template describes.

You can edit your template and then use Terraform to update the environment to match the change.

You can store in version-control your Terraform templates in Cloud Source Repositories.


## Quiz

1. Why would a developer choose to store source code in Cloud Source Repositories?
    > To reduce work \
    > To keep code private to a Google Cloud project

2. Why might a Google Cloud customer choose to use Cloud Functions?
    > Their application contains event-driven code that they don't want to provision compute resources for.

3. Select the advantage of putting the event-driven components of your application into Cloud Functions.
    > Cloud Functions handles scaling these components seamlessly.

4. Why might a Google Cloud customer choose to use Terraform?
    > Terraform can be used as an infrastructure management system for Google Cloud resources.