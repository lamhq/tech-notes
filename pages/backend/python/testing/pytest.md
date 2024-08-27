# pytest

## Version

This document is for [pytest 7.4.x](https://docs.pytest.org/en/7.4.x/contents.html).


## Requirements

- Python 3.7+


## Installation

```shell
pip install pytest==7.4.4
```


## Naming convention

Name your code file to be easily discoverable by pytest:

- Test files should be named `test_<something>.py` or `<something>_test.py`. 
- Test methods and functions should be named `test_<something>`.
– Test classes should be named `Test<Something>`.


## Organize test files

Here we define how to structure test files in the project source code.

Test files should be in a separate `tests/` folder (instead of sitting next to the code file):

```
module/
    __init__.py
    module.py
    another_module.py
tests/
    test_module.py
    test_another_module.py
```

**Advantages**:
- This separation keeps your codebase cleaner and avoids cluttering the main code directory with test files.
- Clean codebase helps locate code file easier
- Isolated Work: allows individuals to concentrate on writing tests without interfering with others' code files.

**Disadvantages**:
- It's not easy to find and import code files.
- You can not use relative imports in test files to import code files.