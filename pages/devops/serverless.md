# Serverless

## Version

This documentation is for version `3.38.0`.

## Requirements

- Node.js


## Installation

Install `serverless` module via NPM:

```shell
npm install -g serverless
```


## Setting up local AWS credentials


## Initialize new project

Create a new serverless project:
```shell
sls
```

Move into the newly created directory:
```shell
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