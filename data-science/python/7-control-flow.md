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


## Ternary operator

The ternary operator is a way of writing conditional statements in Python.

```py
msg = "Even" if to_check%2 == 0 else "Odd"
```


## `for` Loop

```py
words = ['cat', 'window', 'defenestrate']
for w in words:
    print(w, len(w))

# iterate over a sequence of numbers
for i in range(1, 5):
    print(i)

a = ['Mary', 'had', 'a', 'little', 'lamb']
for i in range(len(a)):
    print(i, a[i])
```

### The `range` function

The `range(n)` syntax generates a sequence of numbers: `0`,`1`, `2`, … `n-1`. It increases the value by one until it reaches `n`.

The `range(start, stop)` syntax increases the `start` value by one until it reaches the `stop` value (excluded).

```py
for index in range(1, 6):
    print(index)
1
2
3
4
5
```

The `range(start, stop, step)` syntax increases the `start` value by `step` value until it reaches the `stop` value (excluded).

```py
for index in range(0, 11, 2):
    print(index)
0
2
4
6
8
10
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
# output: no item match the condition
```

The `continue` statement, continues with the next iteration of the loop:

```py
for num in range(2, 10):
    if num % 2 == 0:
        print("Found an even number", num)
        continue
    print("Found a number", num)
```


## `while` Loop

```py
max = 5
counter = 0

while counter < max:
    print(counter)
    counter += 1
```


## `break` Statements

Sometimes, you wan to terminate a `for` loop or a `while` loop prematurely regardless of the results of the conditional tests. In these cases, you can use the `break` statement:

```py
for index in range(0, 10):
    print(index)
    if index == 3:
        break
0
1
2
3    
```

When you use the `break` statement in a nested loop, it’ll terminate the innermost loop.

```py
while True:
    color = input('Enter your favorite color:')
    if color.lower() == 'quit':
        break
```


## `continue` Statements


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
