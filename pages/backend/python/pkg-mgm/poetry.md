# Poetry

## System requirements

Python 3.8+

## Installation (macOS)

### Install Homebrew

1. run this script in the terminal
    ```shell
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    ```
1. follow instruction in the terminal


### Install `pipx`

```shell
brew install pipx
pipx ensurepath
```

Upgrade `pipx`:

```shell
brew update && brew upgrade pipx
```

### Install Poetry

```shell
pipx install poetry
```

## Set up virtual environment

Configure Poetry to create virtual environments within your project directory:

```shell
poetry config virtualenvs.in-project true
```

## Setup project

Create a new project:

```shell
poetry new poetry-demo
```

Initialize an existing project:

```shell
cd pre-existing-project
```

```shell
poetry init
```

## Activating the virtual environment

```shell
poetry shell
```

To deactivate the virtual environment without leaving, use:

```shell
deactivate
```


## Install dependencies

```shell
poetry install --no-root
```


## Add a package

```sh
poetry add fastapi
```

## Remove a package

```sh
poetry remove fastapi
```


## Show installed packages

```shell
poetry show
```
