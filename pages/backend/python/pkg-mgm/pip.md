# Managing Packages with pip

## Install packages

Install the latest version of a package:

```shell
pip install novas
```

Install a specific version of a package:

```shell
pip install requests==2.6.0
```


## Upgrade the package

```shell
pip install --upgrade requests
```

## Display package's information

```shell
pip show <package name>
```

## List installed packages

```shell
pip list
```


## Lock packages's version

Produce a list of the installed packages to a file:
```shell
pip freeze > requirements.txt
```

The `requirements.txt` can be used to install all the necessary packages:
```shell
pip install -r requirements.txt
```

Install all packages from `requirements.txt` to a directory:
```shell
pip install -r ../requirements.txt -t ../build/_deps
```


## Upgrade pip

```shell
pip install --upgrade pip
```