# Virtual Environments

Recommend to use [Poetry](./poetry.md) instead, it offers several advantages.

## Overview

A virtual environment is a semi-isolated Python environment, allows packages to be installed for use by a particular application, rather than being installed system wide.

They are just directories into which pip writes downloaded packages.

When you activate a virtual environment, your shell looks there first when loading Python modules.


## Creating Virtual Environments

```shell copy
python3 -m venv .venv
```

Activate a virtual environment (MacOS):

```shell copy
source .venv/bin/activate
```

Now, anytime you run pip install, it will install packages under `.venv`. And when you run Python programs, that’s where your Python interpreter and modules will be found.


## Deactivate

To deactivate your virtual environment, press Control-D (Linux or Mac).
