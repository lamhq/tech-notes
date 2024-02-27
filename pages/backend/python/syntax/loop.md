# Loop Statements

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

## The `range` function

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


## List Comprehensions

List comprehensions provide a concise way to create lists.

Mapping example:

```py
# create a new list from a list
squares = []
for x in range(10):
    squares.append(x**2)

# this code is equal with above
squares = list(map(lambda x: x**2, range(10)))

# this code is equal with above (list comprehensions)
squares = [x**2 for x in range(10)]
```

Filtering example:

```py
vec = [-4, -2, 0, 2, 4]

# filter the list to exclude negative numbers
filtered = [x for x in vec if x >= 0]
```

Custom:

```py
# create a list from two loops
combs = []
for x in [1,2,3]:
    for y in [3,1,4]:
        if x != y:
            combs.append((x, y))

# this code is equal with above
[(x, y) for x in [1,2,3] for y in [3,1,4] if x != y]
```

```py
# apply a function to all the elements
vec = [-4, -2, 0, 2, 4]
v2 = [abs(x) for x in vec]

# call a method on each element
freshfruit = ['  banana', '  loganberry ', 'passion fruit  '][weapon.strip() for weapon in freshfruit]
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
