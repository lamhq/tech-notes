# Create a Dev Container

This guide will set up a python development environment with Redis as the main database.


## Create configuration

Create configuration files for Dev Containers:

1. Open the Command Palette and run the **Dev Containers: Add Dev Container Configuration Files…**.

2. Select **Python 3**:

    ![Python 3 option selected in the Dev Containers configuration files list](https://code.visualstudio.com/assets/docs/python/fastapi-tutorial/devcontainers_python3.png)

3. Select **Redis Server** as an additional feature to be installed, press **OK**, and then select **Keep Defaults**.

    ![Redis Server option selected in the Dev Containers configuration files list](https://code.visualstudio.com/assets/docs/python/fastapi-tutorial/devcontainers_redis_server_feature.png)

This creates a `.devcontainer` folder in your workspace, with a `devcontainer.json` file.


## Install dependencies

Install project dependencies when the container is set up.

Add the following setting to `devcontainer.json`:

```jsonc
  // Use 'postCreateCommand' to run commands after the container is created.
  "postCreateCommand": "pip3 install --user -r requirements.txt",
```

## Install VS Code extensions in the container

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


## Run the container

Run the **Dev Containers: Reopen in Container** command from the Command Palette.

**Note**: It may take several minutes to build the container, depending on internet speed and machine performance.
