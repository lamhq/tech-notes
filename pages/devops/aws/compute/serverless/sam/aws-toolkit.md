# AWS Toolkit

Develop AWS SAM Serverless Application with AWS Toolkit (VS Code).

## Benefits

1. Seamlessly integrates with popular IDEs like Visual Studio Code
2. Simplifies AWS configuration and management without needing to switch between command-line and IDE
3. Supports local debugging for serverless applications through VS Code's debugger


## Create a sample application

To generate a SAM application using AWS Toolkit:
1. Open the command palette in VS Code and select AWS: Create Lambda SAM Application.
2. Choose the desired runtime and application name.
3. Wait a few seconds for the application to be generated.

The path to a handler can be found in the `template.yaml` file through a resource's `CodeUri` and `Handler` fields.


## Debug

VS Code launch configurations for all Lambda handlers have been generated in `.vscode/launch.json`.

You can debug the Lambda handlers locally by adding a breakpoint to the source file, then running the launch configuration.

This works by using Docker on your local machine.

Invocation parameters, including payloads and request parameters, can be edited either by the `Edit SAM Debug Configuration` command (through the Command Palette) or by editing the `launch.json` file.


## Deploy

AWS Toolkit runs `sam sync` command to deploy your serverless applications.

To deploy your serverless applications:
1. Select the **AWS profile** in the **Status Bar** (bottom).
2. Open the Command Palette in VS Code
3. Select `AWS: Sync SAM Application`
4. Choose AWS region, SAM template file
5. Select a S3 bucket to deploy the code to
6. Select or enter a CloudFormation stack name
7. When the deployment is complete, you see your application listed in the **AWS Explorer** (Side Bar).

You can monitor your deployment's progress through the `AWS Toolkit Logs` Output Channel.


## Interact with AWS services

A deployed application can be found in the **AWS Explorer** under region and **CloudFormation node**.

You can invoke _remote_ AWS Lambda Functions by right-clicking the **Lambda node** and selecting "Invoke on AWS".

Similarly, the API Gateway API can be found in the **API Gateway node**, and can be invoked via right-clicking the API node and selecting "Invoke on AWS".