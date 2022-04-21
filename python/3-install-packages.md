# Installing Python Modules

## Basic usage

```sh
# install the latest version of a module and its dependencies
python -m pip install SomePackage

# install specific version
python -m pip install SomePackage==1.0.4  

# minimum version
python -m pip install "SomePackage>=1.0.4"

# Upgrading existing modules
python -m pip install --upgrade SomePackage
```


## Upgrade pip

```sh
pip install --upgrade pip
```


## Common installation issues

### Installing into the system Python on Linux

On Linux systems, a Python installation will typically be included as part of the distribution. It is often better to use a virtual environment or a per-user installation when installing packages with `pip`.

### Pip not installed

```sh
python -m ensurepip --default-pip
```