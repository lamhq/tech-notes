# Getting Started

## Create a sample application

```sh
sam init
```

- `template.yaml`: Contains the AWS SAM template that defines your application's AWS resources.
- `hello_world/app.js`: Contains your actual Lambda handler logic.


## Build and Deploy

```sh
sam build
sam deploy --guided
```


## Run API Locally

Require starting docker first.

```sh
sam local start-api
```

## Invoke Lambda functions

```sh
sam local invoke "HelloWorldFunction" -e events/event.json
```


## Clean Up

You can remove created AWS resources by deleting the CloudFormation stack:

```sh
aws cloudformation delete-stack --stack-name sam-app --region region
```
