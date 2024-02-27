# Branching Statements

## `if` Statement

```py
x = int(input("Please enter an integer: "))
if x < 0:
    x = 0
elif x == 0:
    print('Zero')
else:
    print('More')
```


## Ternary operator

The ternary operator is a way of writing conditional statements in Python.

```py
msg = "Even" if to_check%2 == 0 else "Odd"
```


## `match` Statements

Python 3.10 was released in mid-2021 and comes with structural pattern matching, also known as a `match case` statement.

```py
def http_error(status):
    match status:
        case 400:
            return "Bad request"
        case 401 | 403 | 404:
            return "Not allowed"            
        case 418:
            return "I'm a teapot"
        case _:
            return "Something's wrong with the internet"
```

Note the last block: the "variable name" `_` acts as a wildcard and never fails to match.

Patterns can look like unpacking assignments, and can be used to bind variables:

```py
# point is an (x, y) tuple
match point:
    case (0, 0):
        print("Origin")
    case (0, y):
        print(f"Y={y}")
    case (x, 0):
        print(f"X={x}")
    case (x, y):
        print(f"X={x}, Y={y}")
    case _:
        raise ValueError("Not a point")
```
