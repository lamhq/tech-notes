# EAFP

## Overview

**EAFP** (Easier to Ask Forgiveness Than Permission) is a coding style in Python that encourages you to write code optimistically (assume things will work as expected) and handle exceptions if they occur (by the presence of many `try` and `except` statements).

EAFP emphasizes writing code that works first and deals with issues later, making your code more concise.

EAFP contrasts with the **LBYL** style.


## Example

Suppose you want to access a dictionary key. Using EAFP, you'd do this:

```python
try:
    value = my_dict["key"]
except KeyError:
    # Handle missing key
    value = None
```

In this approach, you try to access the key directly, and if it doesn't exist, you catch the `KeyError` exception and handle it gracefully. 


## Pros

- Concise and Pythonic.
- Avoids repetition and race conditions.
- More performant if the error case is rare.


## Cons
- May hide other exceptions if not handled properly.


## Use cases

Use EAFP when handling unexpected exceptions (e.g., working with external resources, APIs, or databases).

When performance matters and the error case is rare.