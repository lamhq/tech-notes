# Managing Packages with pip

## Install packages

Install the latest version of a package:

```sh
pip install novas
```

Install a specific version of a package:

```sh
pip install requests==2.6.0
```


## Uninstall package
```sh
pip uninstall --yes requests
```


## Upgrade the package

```sh
pip install --upgrade requests
```

## Display package's information

```sh
pip show <package name>
```

## List installed packages

```sh
pip list
```


## Lock packages's version

Produce a list of the installed packages to a file:
```sh
pip freeze > requirements.txt
```

The `requirements.txt` can be used to install all the necessary packages:
```sh
pip install -r requirements.txt
```

Install all packages from `requirements.txt` to a directory:
```sh
pip install -r ../requirements.txt -t ../build/_deps
```


## Upgrade pip

```sh
pip install --upgrade pip
```