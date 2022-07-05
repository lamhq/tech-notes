# Flow control statements

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


## `for` Statement

```py
words = ['cat', 'window', 'defenestrate']
for w in words:
    print(w, len(w))

# iterate over a sequence of numbers
for i in range(5):
    print(i)

a = ['Mary', 'had', 'a', 'little', 'lamb']
for i in range(len(a)):
    print(i, a[i])
```

### `for ... else`

Loop statements may have an `else` clause, it is executed when the loop terminates through exhaustion of the iterable (with `for`) or when the condition becomes `false` (with `while`), but not when the loop is terminated by a `break` statement.

```py
for n in range(10):
    if n > 10:
        print('found item', n)
        break;
else:
    print('no item match the condition')
```

The `continue` statement, continues with the next iteration of the loop:

```py
for num in range(2, 10):
    if num % 2 == 0:
        print("Found an even number", num)
        continue
    print("Found a number", num)
```

## `pass` Statements

The `pass` statement does nothing. It can be used when a statement is required syntactically but the program requires no action.

```py
while True:
    pass  # Busy-wait for keyboard interrupt (Ctrl+C)

def initlog(*args):
    pass

class MyEmptyClass:
    pass
```

## `match` Statements

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

## Ternary operator

The ternary operator is a way of writing conditional statements in Python.

```py
msg = "Even" if to_check%2 == 0 else "Odd"
```
