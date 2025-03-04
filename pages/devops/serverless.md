# Serverless Framework

## Version

This documentation is for version `3.38.0`.


## Overview

Serverless Framework is a Node.js command line tool for building and deploying serverless applications.

Supports various programming languages like Node.js, Python, Java, Go, ...

It use YAML-based syntax to define your infrastructure and application.

Allows you to test your applications locally.

Pros:
- Support multiple cloud providers including AWS, Microsoft Azure, GCP
- Support building and deploying application with different programming languages
- Support local development for AWS by using `serverless-offline` plugin 

Cons:
- Require Node.js to install the tool
- Require a learning curve to learn its template syntax


## Requirements

- Node.js


## Installation

Install `serverless` module via NPM:

```sh
npm install -g serverless
```


## Setting up AWS credentials

Refer to [AWS CLI guide](./aws/cli.md#configure).


## Initialize new project

Create a new serverless project:
```sh
sls
```

Move into the newly created directory:
```sh
cd sls-demo
```

## Initialize existing project

TBC


## Development

You can [invoke your function locally](./serverless/commands.md#invoke) without deploying it.


## Deploy

You deploy functions by running [shell commands](./serverless/commands.md#deploy).

You can find URLs for your functions in the command output, or retrieve them via `serverless info`.


## Remove

You can delete all the AWS resources created by your project using [`remove` command](./serverless/commands.md#remove).