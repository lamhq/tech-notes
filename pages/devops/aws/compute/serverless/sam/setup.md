# Set up

## Set up an AWS Profile

Using AWS Management Console, create an IAM user for using in the CLI.

Get AWS credentials, including Access key ID and Secret access key.


## Set up Development Environment

1. Set up VS Code and [AWS Toolkit](https://marketplace.visualstudio.com/items?itemName=AmazonWebServices.aws-toolkit-vscode)
2. Install [AWS CLI](../../dev-tools/cli.md)
3. Install [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html#install-sam-cli-instructions)
4. Set up IAM credentials on your machine
5. Set up AWS configurations (region, ...)
6. Install Docker

Verify SAM installation:
```sh
sam --version
```
