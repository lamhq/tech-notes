# Linter

Pylint is a powerful tool that not only checks PEP 8 compliance but also performs syntax error checking.

## Install Pylint package

```sh
poetry add pylint --dev
```


## VS Code setup

If you use VS Code, install [Pylint extension](https://marketplace.visualstudio.com/items?itemName=ms-python.pylint)


## Disable Pylint

Use cases: viewing code of external libraries, legacy codebase.

To disable Pylint for a file, add this at the beginning of a file:
```py
# pylint: skip-file
```
