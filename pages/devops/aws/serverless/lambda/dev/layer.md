# Lambda Layers

## Overview

A layer is a ZIP archive that contains libraries, a custom runtime, or other dependencies.

With layers, you can use libraries in your function without needing to include them in your deployment package.

A function can use up to **5** layers at a time.

The total unzipped size of the function and all layers cannot exceed **250 MB**.

Layers are extracted to the `/opt` directory in the function execution environment.

Each runtime (Node,js, Python, ...) looks for libraries in a different location under `/opt`, depending on the language.

![](https://docs.aws.amazon.com/images/lambda/latest/dg/images/lambda-layers-diagram.png)


## Using layer

Steps for creating and using layers:

1. Package your layer content in to zip file.
2. Create the layer in Lambda.
3. Add the layer to your function(s). 


## Layer versions

A **layer version** is an immutable snapshot of a layer.

New layers start at version number 1.

Updates to the layer result in an incremented version number and new layer version.

Each version has a unique ARN.

You must specify the exact version ARN when adding a layer to a function.


## Sample applications

- [Node.js](https://github.com/awsdocs/aws-lambda-developer-guide/tree/main/sample-apps/blank-nodejs)
- [Python](https://github.com/awsdocs/aws-lambda-developer-guide/tree/main/sample-apps/blank-python)


## Packaging your layer content

Bundle all of your layer content into a `.zip` file archive

Your layer content must be able to compile and build in a Linux environment.


### Layer paths for each Lambda runtime

To ensure that your layer content gets picked up by the `PATH` variable, include the content in the following folder paths:

Node.js:

- `nodejs/node_modules`
- `nodejs/node14/node_modules`
- `nodejs/node16/node_modules`
- `nodejs/node18/node_modules`

Python:
- `python`
- `python/lib/python3.x/site-packages`


## Creating a layer

To create a layer, you can either upload the `.zip` file archive from your local machine or from Amazon S3.


## Accessing layer content from your function

Lambda extracts the layer contents into the `/opt` directory in the function execution environment.

Lambda merges folders with the same name.

If the same file appears in multiple layers, the function uses the version in the last extracted layer.

Each Lambda runtime adds specific `/opt` directory folders to the `PATH` variable. Your function code can access the layer content without having to specify the path.