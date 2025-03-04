# Running Test

Running pytest without mentioning a filename will run all files of format `test_*.py` or `*_test.py` in the current directory and subdirectories.

## Running a subset of tests

Run tests in a file:
```sh
pytest test_one.py
```

Run tests in a directory:
```sh
pytest tests/
```

Run tests matching a name pattern:
```sh
pytest -k pattern
```
```sh
pytest -k equality
pytest -k "equality and not equality_fail"
pytest -k "(dict or ids) and not TestEquality"
```

Run single test function:
```sh
pytest path/test_module.py::test_function
```

Run single test method in a class:
```sh
pytest path/test_module.py::TestClass::test_method
```

Run tests in current working directory and all subdirectories:
```sh
pytest
```


## Modify test output

Turn off tracebacks:
```sh
pytest --tb=no
```

View verbose output:
```sh
pytest -v test_two.py
```

View full diff when assert fail:
```sh
pytest -vv test_two.py
```

Shows the order of operations of tests and fixtures:
```sh
pytest --setup-show test_count.py
```
