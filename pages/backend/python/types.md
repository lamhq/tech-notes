# Types

## Type categories

- Scalar types: `None`, `str`, `bytes`, `float`, `bool`, `int`
- Sequence types: `tuple`, `list`, `dictionary`


## Type conversion

- `int(str)` – convert a string to a number.
- `float(str)` – convert a string to a floating-point number.
- `bool(val)` – convert a value to a boolean value, either `True` or `False`.
- `str(val)` – return the string representation of a value.

```py
x = float(1) # x will be 1.0
y = int(2.8) # y will be 2
z = int("3") # z will be 3
w = float("4.2") # w will be 4.2
i = str(3.0)  # z will be '3.0'
```


## Getting type

To get the type of a value, you use the `type(value)` function

```py
type(100)
type(2.0)
type(Hello)
type(True)
```


## Type checking
```py
val = 1.0
isinstance(val, float)
```


## Check variables refer to same object

use the `is` keyword:
```py
a is b
```


## `None` checking

```py
if foo is None:
    print('foo is None')
else:
    print('foo is not None')
```

## Dynamic references

A variable can refer to a different type of object simply by doing an assignment.

There is no problem with the following:
```py
a = 5
type(a)
# int

a = "foo"
type(a)
# str
```


## Strong types

Every object has a specific type (or class), and implicit conversions will occur only in certain permitted circumstances (such as convert an interger to float)

Implicit cast like this is not allowed:
```py
"5" + 5
```
