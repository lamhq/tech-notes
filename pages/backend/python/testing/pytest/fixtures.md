# pytest Fixtures

## Overview

Fixtures are functions that are run by pytest before/after the actual test functions.

You can use fixtures to:
- get a data set for the tests to work on
- get a system into a known state before running a test
- get data ready for multiple tests

An exception happens during a fixture is reported as "Error".


## Fixture scopes

Fixtures are created when first requested by a test, and are destroyed based on their `scope`:

- `function`: the default scope, the fixture is destroyed at the end of the test.
- `module`: the fixture is destroyed during teardown of the last test in the module.
- `package`: the fixture is destroyed during teardown of the last test in the package, or test directory.
- `class`: the fixture is destroyed during teardown of the last test in the class.
- `session`: Run once per session. All test methods and functions using a fixture of session scope share one setup and teardown call.

The scope is set at the definition of a fixture, and not at the place where it’s called. 

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

For example, a function-scope fixture can depend on other function-scope fixtures, class-, module-, and session-scope fixtures, but you can’t go in the reverse order.




## Snippets

**Prepare database resource:**
```py
import pytest

@pytest.fixture(scope="session")
def db():
    """CardsDB object connected to a temporary database"""
    with TemporaryDirectory() as db_dir: db_path = Path(db_dir)
        db_ = cards.CardsDB(db_path)
        yield db_
        db_.close()

@pytest.fixture(scope="function")
def cards_db(db):
    """CardsDB object that's empty"""
    db.delete_all() return db

def test_empty(cards_db):
    assert cards_db.count() == 0

def test_two(cards_db):
    cards_db.add_card(cards.Card("first"))
    cards_db.add_card(cards.Card("second"))
    assert cards_db.count() == 2    
```