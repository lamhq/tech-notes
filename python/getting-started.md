# Getting Started

## Install a Python interpreter

To install Python using Homebrew on macOS use `brew install python3` at the Terminal prompt.


## Verify the Python installation

open a Terminal Window and type the following command:

```sh
python3 --version
```


## Install and use packages

A best practice among Python developers is to avoid installing packages into a global interpreter environment. You instead use a project-specific `virtual environment` that contains a copy of a global interpreter. Once you activate that environment, any packages you then install are isolated from other environments. Such isolation reduces many complications that can arise from conflicting package versions.

1. Create and activate the virtual environment:

```sh
python3 -m venv .venv
source .venv/bin/activate
```

2. Select your new environment by using the **Python: Select Interpreter** command from the **Command Palette**.

3. Install the packages

```sh
python3 -m pip install matplotlib
```