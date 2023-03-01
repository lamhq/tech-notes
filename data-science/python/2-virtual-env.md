# Virtual Environments and Packages

## Install and use packages

A best practice among Python developers is to avoid installing packages into a global interpreter environment. You instead use a project-specific `virtual environment` that contains a copy of a global interpreter.

A virtual environment is a semi-isolated Python environment that allows packages to be installed for use by a particular application, rather than being installed system wide.

Once you activate that environment, any packages you then install are isolated from other environments. Such isolation reduces many complications that can arise from conflicting package versions.

## Creating Virtual Environments

```sh
python3 -m venv .venv
```

Activate a virtual environment (MacOS):

```sh
source .venv/bin/activate
pip install --upgrade pip
```

Activating the virtual environment will change your shell's prompt to show what virtual environment you're using, and modify the environment so that running `python` will get you that particular version and installation of Python:


```sh
(tutorial-env) $ python
Python 3.5.1 (default, May  6 2016, 10:59:36)
```


## Managing Packages with pip

### Install packages

```sh
# install the latest version of a package
python -m pip install novas

# install a specific version of a package
python -m pip install requests==2.6.0

# upgrade the package to the latest version
python -m pip install --upgrade requests

```

### Display package's information

```sh
pip show requests
```


### Display all of the packages installed

```sh
pip list
```


### Lock packages's version

`pip freeze` will produce a similar list of the installed packages

```sh
pip freeze > requirements.txt
```

The `requirements.txt` can be used to install all the necessary packages with `install -r`:

```sh
pip install -r requirements.txt
```

### Upgrade pip

```sh
pip install --upgrade pip
```