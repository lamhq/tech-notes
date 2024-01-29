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

## Upgrade the package to the latest version

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

`pip freeze` will produce a similar list of the installed packages

```sh
pip freeze > requirements.txt
```

The `requirements.txt` can be used to install all the necessary packages with `install -r`:

```sh
pip install -r requirements.txt
```

## Upgrade pip

```sh
pip install --upgrade pip
```