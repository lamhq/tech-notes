# pytest

## Version

This document is for [pytest 7.4.x](https://docs.pytest.org/en/7.4.x/contents.html).


## Requirements

- Python 3.7+


## Installation

```shell
pip install pytest==7.4.4
```


## Test Discovery

Naming conventions to keep your test code discoverable by pytest:

- Test files should be named `test_<something>.py` or `<something>_test.py`. 
- Test methods and functions should be named `test_<something>`.
– Test classes should be named `Test<Something>`.

Given no arguments, pytest looks at your current directory and all subdirectories for test files and runs the test code it finds.


## Commands

Run tests in a file:
```shell
pytest test_one.py
```

Run tests in a directory:
```shell
pytest tests/
```

Run tests in the current working directory and subdirectories:
```shell
pytest
```

Turn off tracebacks:
```shell
pytest --tb=no
```

View verbose output:
```shell
pytest -v test_two.py
```
