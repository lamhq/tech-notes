# Parametrization

## Overview

Parametrized testing refers to adding parameters to our test functions and passing in multiple sets of arguments to the test to create new test cases.


## Parametrizing Functions

To parametrize a test function, add parameters to the test definition and use the `@pytest.mark.parametrize()` decorator to define the sets of arguments to pass to the test.

```py
import pytest

@pytest.mark.parametrize("test_input,expected", [
    ("3+5", 8),
    ("2+4", 6),
    ("6*9", 54)
], ids=[
    '3+5',
    '2+4',
    '6*9',
])
def test_eval(test_input, expected):
    assert eval(test_input) == expected
```

The first argument to `@pytest.mark.parametrize()` is a list of names of the parameters. They can be a comma-separated string or a list of strings.

The second argument is list of test cases. Each element in the list is a test case represented by a tuple or list that has one element for each argument that gets sent to the test function.


## Parametrizing Fixtures

Fixture parametrization has the benefit of having a fixture run for each set of arguments. This is useful if you have setup or teardown code that needs to run for each test case.

```py
import pytest

@pytest.fixture(
    params=[21, 35, 61], 
    ids=['case1', 'case2', 'case3'])
def some_data(request):
    """Return a number"""
    return request.param

def test_some_data(some_data):
    """Assert value returned from fixture"""
    assert some_data > 40
```
