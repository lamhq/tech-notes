# Flow control statements

## `if` Statement

```python
x = int(input("Please enter an integer: "))
if x < 0:
    x = 0
elif x == 0:
    print('Zero')
else:
    print('More')
```


## `for` Statement

```python
words = ['cat', 'window', 'defenestrate']
for w in words:
    print(w, len(w))

for i in range(5):
    print(i)

a = ['Mary', 'had', 'a', 'little', 'lamb']
for i in range(len(a)):
    print(i, a[i])
```

### `for ... else`

Loop statements may have an `else` clause, it is executed when the loop terminates through exhaustion of the iterable (with `for`) or when the condition becomes `false` (with `while`), but not when the loop is terminated by a `break` statement.

```python
for n in range(10):
    if n > 10:
        print('found item', n)
        break;
else:
    print('no item match the condition')
```

The `continue` statement, continues with the next iteration of the loop:

```python
for num in range(2, 10):
    if num % 2 == 0:
        print("Found an even number", num)
        continue
    print("Found a number", num)
```


## Ternary operator

The ternary operator is a way of writing conditional statements in Python.

```python
msg = "Even" if to_check%2 == 0 else "Odd"
```
