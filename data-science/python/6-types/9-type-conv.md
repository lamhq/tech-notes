# Type Conversion

## Type conversion functions

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


## Getting the type of a value

To get the type of a value, you use the `type(value)` function

```py
type(100)
type(2.0)
type(Hello)
type(True)
```


## Check variable is type
```py
val = 1.0
isinstance(val, float)
```


## Check if a value is `None`

```py
if foo is None:
    print('foo is None')
else:
    print('foo is not None')
```
