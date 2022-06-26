# AWS App Runner

## What is AWS App Runner?

AWS App Runner is an AWS service that provides a fast, simple, and cost-effective way to deploy from source code or a container image directly to a scalable and secure web application in the AWS Cloud

App Runner enables automatic deployments each time a commit is pushed to the code repository or a new container image version is pushed to the image repository.


## Pricing

You are charged for the compute and memory resources used by your application. 

In addition, if you automate your deployments, you will pay a set monthly fee for each application that covers all automated deployments for that month. 

If you opt to deploy from source code, you will pay a build fee for the amount of time it takes App Runner to build a container from your source code.

When you create an application in AWS App Runner, you configure the amount of memory and vCPU required for your application to run.

### Provisioned container instances

**$0.007 / GB-hour**

When your application is idle, you pay per GB of memory for provisioned container instances which keep your application warm and eliminate cold starts.


### Active container instances

- **$0.064 / vCPU-hour\***
- **$0.007 / GB-hour\***

When requests come in, your application responds in milliseconds, and you pay for the vCPU and memory consumed by your active container instances as your application is processing requests.

App Runner scales your active container instances up and down automatically to meet the processing demands of your application, and you pay only for the vCPU and memory used.

You can set a maximum limit on the number of active container instances your application uses so that costs do not exceed your budget. 

When your active container instances are idle, App Runner scales back to your provisioned container instances 


## Architecture and concepts

![](https://docs.aws.amazon.com/apprunner/latest/dg/images/architecture.png)

- **App Runner service**
- **Source type**: source code or source image.
- **Repository provider**
- **App Runner connection**: An AWS resource that lets App Runner access a repository provider account (for example, a GitHub account or organization)
- **Runtime**: A base image for deploying a source code repository. 
- **Deployment**: An action that applies a version of your source repository (code or image) to an App Runner service.
  - **Automatic deployment** – You can configure an App Runner service to automatically build (for source code) and deploy each version of your application as it appears in the repository. This can be a new commit in a source code repository or a new image version in a source image repository.
  - **Manual deployment** – A deployment to your App Runner service that you explicitly start.
- **Custom domain**
- **Maintenance**: An activity that App Runner occasionally performs on the infrastructure that runs your App Runner service.

> App Runner doesn't support automatic deployment for Amazon ECR Public images, and for images in an Amazon ECR repository that belongs to a different AWS account than the one that your service is in.

## Resource quotas

https://docs.aws.amazon.com/apprunner/latest/dg/architecture.html#architecture.quotas


## App Runner service based on a source image

A source image is a public or private container image stored in an image repository. You point App Runner to an image, and it starts a service running a container based on this image. No build stage is necessary.

App Runner supports the following image repository providers:

- Amazon Elastic Container Registry (Amazon ECR) – Stores images that are private to an AWS account.
- Amazon Elastic Container Registry Public (Amazon ECR Public) – Stores images that are publicly readable.

### Using an image stored in Amazon ECR in your AWS account

Amazon ECR stores images in repositories. To deploy your image to an App Runner service from a private repository, App Runner needs permission to read your image from Amazon ECR. 

To give that permission to App Runner, you need to provide App Runner with an **access role**. This is an AWS Identity and Access Management (IAM) role that has the necessary Amazon ECR action permissions.

When you use the App Runner console to create the service, you can choose an existing role in your account. Alternatively, you can use the IAM console to create a new custom role. Or, you can choose for the App Runner console to create a role for you based on managed policies.


## Custom domain

If you own a domain name, you can associate it to your App Runner service. After App Runner validates your new domain, it can be used to access your application in addition to the App Runner domain. You can associate up to five custom domains.

When you associate a custom domain with your service, App Runner provides you with a set of CNAME records to add to your Domain Name System (DNS). Add certificate validation records to your DNS. This way, App Runner can validate that you own or control the domain.

In addition, add DNS target records to your DNS to target the App Runner domain. Add one record for the custom domain, and another for the `www` subdomain, if you chose this option. Then, wait for the custom domain status to become **Active** in the App Runner console. At this point, your custom domain is validated, and App Runner starts routing traffic from this domain to your web application.

You can specify a domain to associate with your App Runner service in the following ways:

- A root domain – *example.com*. You can optionally associate www.example.com too as part of the same operation.
- A subdomain – *login.example.com* or *admin.login.example.com*. 
- A wildcard – **.example.com*. You can't use the `www` option in this case.


## Limitation

There're limitations at the time of research (June 2022):
- Just support a few regions
- Don't support setting environment variables through AWS Secret Manager

Consider using Google Cloud Run instead.

## Code Snippets

```sh
# login to ECR using aws cli
aws ecr get-login-password --region ap-northeast-1 | docker login --username AWS --password-stdin 427736512271.dkr.ecr.ap-northeast-1.amazonaws.com

# buid a test image
docker build -t app-runner-demo:1.0.1 .
docker run --name app_runner --rm -p 8080:80 app-runner-demo:1.0.1
# test at http://localhost:8080

# push image to ECR
docker tag app-runner-demo:1.0.1 427736512271.dkr.ecr.ap-northeast-1.amazonaws.com/app-runner-demo:1.0.1
docker push 427736512271.dkr.ecr.ap-northeast-1.amazonaws.com/app-runner-demo:1.0.1
```

Continue reading at https://docs.aws.amazon.com/apprunner/latest/dg/network-vpc.html