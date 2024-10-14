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

If you make changes to the code, you need to rebuild and start the API again.

```sh
sam local start-api
```


## Invoke Lambda functions

```sh
sam local invoke "HelloWorldFunction" -e events/event.json
```


## Monitoring

You can fetch logs of deployed Lambda function using the SAM CLI:
```shell
sam logs -n HelloWorldFunction --stack-name api-lambda --tail
```


## Unit tests

Tests are defined in the `hello-world/tests` folder in the generated project.

To run unit tests:
```shell
npm run test
```


## Clean Up

You can remove created AWS resources by deleting the CloudFormation stack:

```sh
sam delete --stack-name app-name
```
