# Set up Development environment using Container

Using docker container as your development environment.

## Overview

The VS Code [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension helps creating a full-featured development environment by including project's dependencies, and all necessary tools (database, ) into one tidy container. 

The extension lets you open your project inside (or mounted into) the container in VS Code, where you have all the dependencies and software set up.


## Benefits

Ensure that your development environment closely mirrors the production environment.

Easy to reproduce the same environment across different machines.

Isolating dependencies and avoiding conflicts between different software versions.

Avoid messing up your machine.


## Drawbacks

Slower than running project/software directly on your machine.

Consume more power and resources on your laptop.


## Use cases

You have to work on multiple projects with different tech stacks and software (Python, Node.js, Postgres, MongoDB, ...)

You need to switch between machine (home computer, laptop, ...)

There are so many software programs to install, and they are time-consuming.


## How to do it?

Set up a python development environment with Redis as the main database.


### Requirements

* [Docker Desktop](https://www.docker.com/)
* [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension


### Create the Dev container configuration

1. Open the Command Palette and run the **Dev Containers: Add Dev Container Configuration Files…**.

2. Select **Python 3**:

    ![Python 3 option selected in the Dev Containers configuration files list](https://code.visualstudio.com/assets/docs/python/fastapi-tutorial/devcontainers_python3.png)

3. Select **Redis Server** as an additional feature to be installed, press **OK**, and then select **Keep Defaults**.

    ![Redis Server option selected in the Dev Containers configuration files list](https://code.visualstudio.com/assets/docs/python/fastapi-tutorial/devcontainers_redis_server_feature.png)

This creates a `.devcontainer` folder in your workspace, with a `devcontainer.json` file.


### Install project dependencies

we will add the necessary dependency installation commands to the `postCreateCommand` property in the `devcontainer.json` file, so our application is ready to run once the container is set up.

Add the following setting to `devcontainer.json`:

```jsonc
  // Use 'postCreateCommand' to run commands after the container is created.
  "postCreateCommand": "pip3 install --user -r requirements.txt",
```

### Install VS Code extensions

Add the VS Code extensions we want installed in the container to the `customizations` property in `devcontainer.json`:

```jsonc
  // Configure tool-specific properties.
  "customizations": {
    "vscode": {
      "extensions": [
        "ms-python.python", //Python extension ID
        "ms-python.vscode-pylance" //Pylance extension ID
      ]
    }
  }
```

### Run the container

Run the **Dev Containers: Reopen in Container** command from the Command Palette.

**Note**: It may take several minutes to build the container, depending on internet speed and machine performance.


## References

- [Setting up a Docker Container on Windows](https://code.visualstudio.com/docs/python/tutorial-fastapi#_setting-up-a-docker-container-on-windows)
- [Developing inside a Container](https://code.visualstudio.com/docs/devcontainers/containers)