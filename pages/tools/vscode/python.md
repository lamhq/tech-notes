# VS Code Guide for python

## Installation

Install [Python extension](https://marketplace.visualstudio.com/items?itemName=ms-python.python) for VS Code.


## Python commands

Enter “Python: “ in the Command Palette to find the commands available through the Python extension.

![](https://code.visualstudio.com/assets/docs/python/quick-start/cmd-plt-v2.gif)


## Create virtual environment

VS Code can create a python virtual environment from your `requirements.txt` without you to run the `venv` command.

Create a virtual environment by opening the Command Palette and running the **Python: Create Environment** command.


## Enable Auto Imports

This enables import statements to be automatically added as you type.

Auto imports are disabled by default, but you can enable them by setting `python.analysis.autoImportCompletions` to `true` in your settings.


## Linter

Install [Pylint](https://marketplace.visualstudio.com/items?itemName=ms-python.pylint) extension.

Other extensions can be found in the [VS Code doc](https://code.visualstudio.com/docs/python/linting#_choose-a-linter).

Errors and warnings are shown in the Problems panel and are also highlighted in the code editor.


## Formatter

Install [Black formatter](https://marketplace.visualstudio.com/items?itemName=ms-python.black-formatter) extension.

Set it as the default formatter by adding below lines to `settings.json` file:

```json
  "[python]": {
    "editor.defaultFormatter": "ms-python.black-formatter"
  }
```

Enable formatting on save for your code:

```json
  "[python]": {
    "editor.formatOnSave": true
  }
```

## Debugging

To initialize debug configurations, click **Run and Debug** button, then click the link "**create a configuration (launch.json) file**":

![](https://code.visualstudio.com/assets/docs/python/debugging/debug-start.png)

The details of configuration properties are covered in [Standard configuration and options](https://code.visualstudio.com/docs/python/debugging#_set-configuration-options).

Other configurations are described in [Debugging specific app types](https://code.visualstudio.com/docs/python/debugging#_debugging-specific-app-types).


## Test

The Python extension provides robust testing support for [Unittest](https://docs.python.org/3.3/library/unittest.html) and [pytest](https://pytest.org/en/7.4.x/).

You can configure Python tests through the Testing view on the Activity Bar by selecting **Configure Python Tests** and selecting your test framework of choice.


## References

- [Getting Started with Python in VS Code](https://code.visualstudio.com/docs/python/python-quick-start)