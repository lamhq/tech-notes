# pytest Fixtures

## Overview

Fixtures are functions that are run by pytest before/after the actual test functions.

You can use fixtures to:
- get a data set for the tests to work on
- get a system into a known state before running a test
- get data ready for multiple tests

An exception happens during a fixture is reported as "Error".

Here's a simple fixture that returns a number:
```py
import pytest
@pytest.fixture()
def some_data():
    """Return answer to ultimate question."""
    return 42

def test_some_data(some_data):
    """Use fixture return value in a test."""
    assert some_data == 42
```


## Fixture scopes

Fixtures are created when first requested by a test, and are destroyed based on their `scope`:

- `function`: the default scope, the fixture is destroyed at the end of the test.
- `module`: the fixture is destroyed during teardown of the last test in the module.
- `package`: the fixture is destroyed during teardown of the last test in the package, or test directory.
- `class`: the fixture is destroyed during teardown of the last test in the class.
- `session`: Run once per session. All test methods and functions using a fixture of session scope share one setup and teardown call.

The scope is set at the definition of a fixture, and not at the place where it's called. 

```py
@pytest.fixture(scope="module")
def cards_db():
    with TemporaryDirectory() as db_dir: db_path = Path(db_dir)
        db = cards.CardsDB(db_path)
        yield db
        db.close()
```


## Sharing Fixtures

You can put fixtures into a `conftest.py` file, and share fixtures among multiple test files.

The `conftest.py` file must be either in the same directory as the test file or in some parent directory.

```py filename="path/conftest.py"
@pytest.fixture()
def cards_db():
    with TemporaryDirectory() as db_dir:
        db_path = Path(db_dir)
        db = cards.CardsDB(db_path)
        yield db
        # teardown part, run after test code
        db.close()
```

```py filename="path/test_count.py"
import cards

def test_empty(cards_db):
    assert cards_db.count() == 0

def test_two(cards_db):
    cards_db.add_card(cards.Card("first"))
    cards_db.add_card(cards.Card("second"))
    assert cards_db.count() == 2    
```


## Fixtures dependency

Fixtures can only depend on other fixtures of their same scope or wider.

For example, a function-scope fixture can depend on other function-scope fixtures, class-, module-, and session-scope fixtures, but you can't go in the reverse order.


## Listing Fixtures

Below command list available fixtures in a directory or test file:
```sh
pytest --fixtures -v path/to/directory
```

You can also use `--fixtures-per-test` to see what fixtures are used by each test and where the fixtures are defined:
```sh
pytest --fixtures-per-test test_count.py::test_empty
```


## Multi Level Fixtures

```py
import pytest

@pytest.fixture(scope="session")
def first_number():
    """Get the first value"""
    return 10

@pytest.fixture(scope="function")
def second_number(first_number):
    """Get the second value"""
    return first_number * 3

def test_value(second_number):
    assert second_number == 30
```


## Using Multiple Fixtures per Test

```py
import pytest

@pytest.fixture(scope="session")
def first_number():
    """Get the first value"""
    return 10

@pytest.fixture(scope="function")
def second_number():
    """Get the second value"""
    return 30

def test_value(first_number, second_number):
    value = first_number + second_number
    assert value == 40
```


## Always run fixtures

You can use `autouse=True` to get a fixture to run all of the time. This works well for code you want to run at certain times, but tests don’t really depend on any system state or data from the fixture.

```py filename="test_autouse.py"
import pytest
import time

@pytest.fixture(autouse=True)
def footer_function_scope():
    """Report test durations after each function."""
    start = time.time()
    yield
    stop = time.time()
    delta = stop - start
    print("\ntest duration : {:0.3} seconds".format(delta))

def test_1():
    """Simulate long-ish running test."""
    time.sleep(1)
```

Run the test with turning off output capture:
```sh
pytest -v --capture=no test_autouse.py
```

Output:
```
===================== test session starts ======================
collected 1 item

test/test_demo.py::test_1 PASSED
test duration : 1.01 seconds
=================== 1 passed in 1.01 seconds ===================
```

Without turning off output capture, pytest only prints the output of tests that fail.


## Monkey patch

The `monkeypatch` fixture is a powerful tool that helps you safely modify behavior during tests.

It allows you to set or delete attributes, dictionary items, environment variables, or even modify `sys.path` for importing. 

Some methods provided by the `monkeypatch` fixture:

1. **`monkeypatch.setattr(obj, name, value, raising=True)`**: patch an attribute or property of an object with your desired testing behavior.

2. **`monkeypatch.delattr(obj, name, raising=True)`**: Remove an attribute or property from an object for testing purposes.

3. **`monkeypatch.setitem(mapping, name, value)`**: Patch a dictionary item for the test. Useful for modifying global configurations or other dictionaries.

4. **`monkeypatch.delitem(obj, name, raising=True)`**: Remove an item from a dictionary.

5. **`monkeypatch.setenv(name, value, prepend=None)`**: Modify environment variables for a test. Useful for testing program behavior when an environment variable is missing or setting multiple values for a known variable.

6. **`monkeypatch.syspath_prepend(path)`**: Modify `sys.path`.

7. **`monkeypatch.chdir(path)`**: Change the current working directory during a test.

8. **`monkeypatch.context()`**: Apply patches only in a specific scope, which can help control teardown of complex fixtures or patches to the standard library.


Here's how we modify the behavior of the `Path.home` function to return `/abc`:

```python
import pytest
from pathlib import Path

def get_user_directory():
    # Some logic to determine user directory
    return Path.home()

def test_user_directory(monkeypatch):
    # Patch Path.home() to always return a specific path
    monkeypatch.setattr(Path, "home", lambda: Path("/abc"))

    # Now, get_user_directory() will always return Path("/abc")
    assert get_user_directory() == Path("/abc")
```

All modifications made using `monkeypatch` are undone after the test function or fixture finishes.