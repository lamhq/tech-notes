# Running Test

Running pytest without mentioning a filename will run all files of format `test_*.py` or `*_test.py` in the current directory and subdirectories.

## Running a subset of tests

Run tests in a file:
```shell
pytest test_one.py
```

Run tests in a directory:
```shell
pytest tests/
```

Run tests matching a name pattern:
```shell
pytest -k pattern
```
```shell
pytest -k equality
pytest -k "equality and not equality_fail"
pytest -k "(dict or ids) and not TestEquality"
```

Run single test function:
```shell
pytest path/test_module.py::test_function
```

Run single test method in a class:
```shell
pytest path/test_module.py::TestClass::test_method
```

Run tests in current working directory and all subdirectories:
```shell
pytest
```


## Modify test output

Turn off tracebacks:
```shell
pytest --tb=no
```

View verbose output:
```shell
pytest -v test_two.py
```

View full diff when assert fail:
```shell
pytest -vv test_two.py
```

Shows the order of operations of tests and fixtures:
```shell
pytest --setup-show test_count.py
```
