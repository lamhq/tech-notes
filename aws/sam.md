# AWS Serverless Application Model

## Install AWS SAM CLI

- Create an IAM User with Administrator Permissions
- Install Homebrew
- Install the AWS SAM CLI

```sh
brew tap aws/tap
brew install aws-sam-cli
sam --version
```

Upgrading AWS SAM CLI:

```sh
brew upgrade aws-sam-cli
```

## Deploying a Hello World Application

### Create Sample AWS SAM Application

```sh
sam init
```

- `template.yaml`: Contains the AWS SAM template that defines your application's AWS resources.
- `hello_world/app.js`: Contains your actual Lambda handler logic.

### Build and Deploy

```sh
sam build
sam deploy --guided
```

### Run your API Locally

Start docker before running below command:

```sh
sam local start-api
```

### Making One-off Invocations

```sh
sam local invoke "HelloWorldFunction" -e events/event.json
```

### Clean Up

If you no longer need the AWS resources you created by running this tutorial, you can remove them by deleting the AWS CloudFormation stack that you deployed.

```sh
aws cloudformation delete-stack --stack-name sam-app --region region
```
