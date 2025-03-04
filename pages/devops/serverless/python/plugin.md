# Serverless Python Requirements

Serverless plugin to bundle Python packages.

## Install

```py
sls plugin install -n serverless-python-requirements
```

This will automatically add the plugin to your project's `package.json` and the plugins section of its `serverless.yml`.


## Docker Compiling

Docker image to use: [docker-lambda](https://github.com/lambci/docker-lambda).

To enable docker usage, add the following to your `serverless.yml`:
```yml
custom:
  pythonRequirements:
    dockerizePip: true
```

To use your own Docker image:
```yml
custom:
  pythonRequirements:
    dockerImage: <image name>:tag
```

To use your own Dockerfile:
```yml
custom:
  pythonRequirements:
    dockerFile: ./path/to/Dockerfile
```


## Poetry

If you include a `pyproject.toml` and have `poetry` installed, this will use below command to generate `requirements.txt`:
```sh
poetry export --without-hashes -f requirements.txt -o requirements.txt --with-credentials
```

Set the following option:
```yml
custom:
  pythonRequirements:
    usePoetry: true
```

## Lambda Layer

Put dependencies into a Lambda Layer:
```yml
custom:
  pythonRequirements:
    layer: true
```

Add the reference to the functions that will use the layer:
```yml
functions:
  hello:
    handler: handler.hello
    layers:
      - Ref: PythonRequirementsLambdaLayer
```

You can specify layer configuration:
```yml
custom:
  pythonRequirements:
    layer:
      name: ${self:provider.stage}-layerName
      description: Python requirements lambda layer
      compatibleRuntimes:
        - python3.7
      licenseInfo: GPLv3
      allowedAccounts:
        - '*'
```


## Omitting Packages

```yml
custom:
  pythonRequirements:
    noDeploy:
      - pytest
```

## Caching

Two kinds of caching:
- a download cache that will cache downloads that pip needs to compile the packages
- caches output of pip after compiling everything for your requirements file.

```yml
custom:
  pythonRequirements:
    useDownloadCache: true
    useStaticCache: true
```


## Other features

- [Extra pip arguments](https://www.serverless.com/plugins/serverless-python-requirements#extra-pip-arguments)
- [Extra Docker arguments](https://www.serverless.com/plugins/serverless-python-requirements#extra-docker-arguments)
- [Customize requirements file name](https://www.serverless.com/plugins/serverless-python-requirements#customize-requirements-file-name)


## References

https://www.serverless.com/plugins/serverless-python-requirements