# Basic

## Numbers

- `+`, `-`, `*`, `/`
- `//`, `%`, `**`

## Strings

- `'a sample string'`, `"string with double quotes"`
- `'doesn\'t'`, `"doesn't"`
- `len('abc')` return length of a string

String literals can span **multiple lines**

```python
print("""\
Usage: thingy [OPTIONS]
     -h                        Display this usage message
     -H hostname               Hostname to connect to
""")
```

Two or more string literals (i.e. the ones enclosed between quotes) next to each other are **automatically concatenated**.

```python
text = ('Put several strings within parentheses '
    'to have them joined together.')
```

Strings can be **indexed** (subscripted), with the first character having index 0.

```python
word = 'Python'
f = word[0]  # character in position 0: 'P'
l = word[5]  # character in position 5: 'n'
w1 = word[-1]   # last character: 'n'
w2 = word[-2]   # second-last character: 'o'
w3 = word[-6]   # 'P'
```

**Slicing**

```python
s1 = word[0:2]  # characters from position 0 (included) to 2 (excluded): 'Py'
s2 = word[:2]   # character from the beginning to position 2 (excluded): 'Py'
s3 = word[4:]   # characters from position 4 (included) to the end: 'on'
```

Python strings cannot be changed — they are immutable.

## List

Like strings, lists can be indexed and sliced, Lists also support operations like concatenation

```python
squares = [1, 4, 9, 16, 25]
squares[2] = 64
squares.append(216)
newArr = squares + [36, 49, 64, 81, 100]
squares[2:5] = [15, 14, 33]
squareSize = len(squares)
x = [['a', 'b', 'c'], [1, 2, 3]]
```

## `if` Statements`

```python
x = int(input("Please enter an integer: "))
if x < 0:
    x = 0
elif x == 0:
    print('Zero')
else:
    print('More')
```


## `for` Statements`

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

### Functions

```python
def fib(n):
    """Print a Fibonacci series up to n."""
    a, b = 0, 1
    while a < n:
        print(a, end=' ')
        a, b = b, a+b
    print()
```
