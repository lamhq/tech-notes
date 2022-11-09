# Boolean

## Introduction

To represent true and false, Python provides you with the boolean data type. The boolean value has a technical name as `bool`.


## The bool() function

To find out if a value is `True` or `False`, you use the `bool()` function.

```py
>>> bool('Hi')
True

>>> bool('')
False

>>> bool(100)
True

>>> bool(0)
False
```

- Almost any value is evaluated to `True` if it has some sort of content.
- Any string is `True`, except empty strings.
- Any number is `True`, except `0`.
- Any list, tuple, set, and dictionary are `True`, except empty values, such as `()`, `[]`, `{}`, `""`, the number `0`, and the value `None`.


## Available operators

- `==`, `!=`, `>`, `<`, `>=`, `<=`
- `and`, `or`, `not`
- `is`, `is not`
- `in`, `not in`
