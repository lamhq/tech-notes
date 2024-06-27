# LBYL

## Overview

Look before you leap. This coding style explicitly tests for pre-conditions before making calls or lookups (by the presence of many `if` statements).

```py
if key in my_dict:
    value = my_dict[key]
else:
    value = None
```


## Pros

- Prevents errors from happening by explicitly checking conditions.
- Provides clarity and readability when conditions are well-named.


## Cons

- Can lead to repetition of checks, making code verbose.
- May introduce race conditions if external state changes between the check and the action

For example, the code, `if key in mapping: return mapping[key]` can fail if another thread removes key from mapping after the test, but before the lookup. This issue can be solved with locks or by using the EAFP approach.


## Use cases

When preventing errors is critical (e.g., validating user input, avoiding file overwrites).

When you need to handle specific error cases explicitly.