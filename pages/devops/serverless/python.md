# Lambda guide for Python

## Packaging python dependencies

- You need to install [Serverless Python Requirements plugin](./python/plugin.md).
- The dependencies will be installed in to a Lambda layer for Linux x86 platform
- This config is using Poetry for package manager, you need to have the file `pyproject.toml` in your project root

```yml
service: python-lambda
frameworkVersion: '3'

provider:
  name: aws
  runtime: python3.12
  deploymentMethod: direct
  architecture: x86_64

package:
  individually: true
  patterns:
    - '!.pytest_cache/**'
    - '!.venv/**'
    - '!build/**'
    - '!infra/**'
    - '!tests/**'
    - '!__pycache__/**'

custom:
  pythonRequirements:
    usePoetry: true
    layer:
      name: dependencies
      description: project dependencies
      compatibleRuntimes:
        - python3.12
      compatibleArchitectures:
        - x86_64
      allowedAccounts:
        - '*'
    pipCmdExtraArgs:
      - "--platform manylinux2014_x86_64"
      - "--implementation cp"
      - "--python-version 3.12"
      - "--only-binary=:all:"
      - "--upgrade"
    useStaticCache: true
    useDownloadCache: true

functions:
  app:
    handler: app.main.lambda_handler    # The lambda handler named `lambda_handler` is defined in `app/main.py`
    layers:
      - Ref: PythonRequirementsLambdaLayer
    events:
      - http:
          method: any
          path: /{proxy+}  # captures one or more segments in the URL and passes them as a parameter to the function.

plugins:
  - serverless-python-requirements
```
