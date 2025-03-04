# pytest

## Version

This document is for [pytest 7.4.x](https://docs.pytest.org/en/7.4.x/contents.html).


## Requirements

- Python 3.7+


## Installation

```sh
pip install pytest==7.4.4
```


## Writting test

Create a file `test_one.py` with content:
```py
def test_passing():
    assert (1, 2, 3) == (1, 2, 3)
```

## Running test

Open terminal and run this command:
```sh
pytest test_one.py
```

## Test result

Look at the console output after running the test:
```
========================= test session starts ========================== 
collected 1 item
test_one.py .                                                    [100%]
========================== 1 passed in 0.01s ===========================
```

- The dot after `test_one.py` means that one test was run and it passed
- The `[100%]` is a percentage indicator showing how much of the test suite is done so far.


## Test Outcomes

Here are the possible outcomes of a test:
- PASSED (`.`) - The test ran successfully.
- FAILED (`F`) - The test did not run successfully.
- SKIPPED (`s`) - The test was skipped. You can tell pytest to skip a test by using either the `@pytest.mark.skip()` or `@pytest.mark.skipif()` decorators.
- XFAIL (`x`) - The test was not supposed to pass, and it ran and failed. You can tell pytest that a test is expected to fail by using the `@pytest.mark.xfail()` decorator
- XPASS (`X`) - The test was marked with xfail, but it ran and passed.
- ERROR (`E`) - An exception happened either during the execution of a fixture or hook function, and not during the execution of a test function.