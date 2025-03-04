# Markers

## Overview

Markers are a way to tell pytest there's something special about a particular test.

pytest includes a handful of builtin markers that modify the behavior of how tests are run.


## Skipping Tests

The skip marker allows us to skip a test.
```py
import pytest

@pytest.mark.skip(reason="Should be run locally")
def test_less_than():
    assert 4 < 5
```
Use cases:
- Skip tests that are not yet implemented or a feature that hasn't been fully developed
- Skip tests depends on an unavailable resource in testing


## Skipping Tests Conditionally

```py
import pytest

@pytest.mark.skipif(1 < 2, reason="OS not supported")
def test_less_than():
    assert 3 < 4
```

Use cases:
- Skip tests that are specific to certain platforms
    ```python
    @pytest.mark.skipif(sys.platform == "win32", reason="does not run on Windows")
    def test_windows_specific():
        # Your test logic here
    ```
- Skip tests based on the Python version
    ```python
    @pytest.mark.skipif(sys.version_info < (3, 6), reason="requires Python 3.6 or higher")
    def test_python_version():
        # Your test logic here
    ```
- Skip tests depend on an unavailable resource in testing


## Expecting Tests to Fail

Mark test functions that are expected to fail.

```py
import pytest

@pytest.mark.xfail(
    reason="Feature is not yet implemented",
    run=True,
    strict=True
)
def test_less_than():
    assert 4 < 3
```

- By default, failed tests are marked as `XFAIL`, it means "You were right, it did fail"
- `strict=True` tells pytest to mark passing tests as `FAIL` ("Caution! You thought it would fail, but it didn’t"), otherwise `XPASS` ("Good news, the test you thought would fail just passed")
- If `run=False`, pytest won't run the test

Use cases:
- When you encounter a known bug in your codebase. And the bug can't be fixed right away
- You’re writing tests first, you might have incomplete features or functionality during development


## Marking slow tests

To mark a test as slow in pytest, you can use the `@pytest.mark.slow` decorator:
```py
import pytest

@pytest.mark.slow
def test_example():
    # Your test code here
    pass
```

If you want to skip the slow tests, you can use:
```sh
pytest -m "not slow"
```

## Custom Markers

Custom markers are markers we make up ourselves and apply to tests.

Custom markers can be used to select tests to run or skip.

To create a custom marker, first, we register it in `pytest.ini`:

```ini filename="pytest.ini"
[pytest]
markers =
    smoke: subset of tests
```

Then apply it to our test:
```py
import pytest

@pytest.mark.smoke
def test_smoke():
    assert 3 < 4

def test_normal():
    assert 4 > 3
```

Finally, select tests with our custom marker when running pytest:

```sh
pytest -m smoke

pytest -m "(exception or smoke) and (not finish)"
```


Unregistered markers will result to warning when running test:
```
=============== warnings summary ===============
PytestUnknownMarkWarning: Unknown pytest.mark.smoke - is this a typo?
```

If we want that warning to be an error instead, we can use the `--strict-markers` flag:
```sh
pytest --strict-markers -m smoke
```

## Marking Files, Classes, Parameters

We can apply markers to files, test classes, test parameters, fixtures.

We can even put multiple markers on a single test.

File-level markers:
```py
import pytest

pytestmark = pytest.mark.smoke

def test_simple():
    assert 3 < 4
```

Class-level markers:
```py
import pytest

@pytest.mark.smoke
class TestFinish:

    def test_simple(self):
        assert 3 < 4
```

Parameter-level markers:
```py
import pytest
 
@pytest.mark.parametrize("value1, value2", [
    (3, 1),
    pytest.param(3, -1, marks=pytest.mark.slow),
    (2, 0),
])
def test_value(value1, value2):
    assert value1 > value2
```

## Listing Markers

```sh
pytest --markers
```
