# Getting Started

## Create a sample application

```sh
sam init
```

- `template.yaml`: Contains the AWS SAM template that defines your application's AWS resources.
- `hello_world/app.js`: Contains your actual Lambda handler logic.


## Build

```sh
sam build
```

1. The build command uses npm to install dependencies specified in your `package.json`
2. It then copies your source code and dependencies into a build directory `.aws-sam`
3. If you use the `--use-container` option, sam build runs the build process inside a container image, ensuring a consistent build environment

Tip: by using `.npmignore`, you can control which files are excluded from the build process.


## Deploy

Starts an interactive session to guide you through the deployment:
```sh
sam deploy --guided
```

Deploy silently:
```sh
sam deploy --no-confirm-changeset --no-fail-on-empty-changeset
```

Deploy upon changes (watch mode):
```sh
sam sync --stack-name sam-app --watch
```


## Unit tests

Tests are defined in the `hello-world/tests` folder in the generated code.

To run unit tests:
```sh
npm run test
```


## Invoke functions locally

```sh
sam local invoke "HelloWorldFunction" -e events/event.json
```

You can [generates event payload samples](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-local-generate-event.html) for supported AWS services:
```sh
sam local generate-event s3 put >> S3PutEvent.json
```


## Monitoring

You can fetch logs of deployed Lambda function using the SAM CLI:
```sh
sam logs -n HelloWorldFunction --stack-name api-lambda --tail
```


## Run API locally

Require starting docker first.

If you make changes to the code, you need to rebuild and start the API again.

```sh
sam local start-api
```


## Clean Up

You can remove created AWS resources by deleting the CloudFormation stack:

```sh
sam delete --stack-name app-name
```
