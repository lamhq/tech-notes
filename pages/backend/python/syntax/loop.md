# Loop Statements

## `for` Loop

Iterate over a list/sequence:
```py
words = ['cat', 'window', 'defenestrate']
for w in words:
    print(w, len(w))

for i in range(1, 5):
    print(i)

a = ['Mary', 'had', 'a', 'little', 'lamb']
for i in range(len(a)):
    print(i, a[i])
```

Loop through each key-value pair in a dictionary;

```py
my_dict = {
    "name": "Alice",
    "age": 30,
    "city": "Wonderland"
}

for key, value in my_dict.items():
    print(f"Key: {key}, Value: {value}")
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


## `range` function

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

When you use the `break` statement in a nested loop, it'll terminate the innermost loop.

```py
while True:
    color = input('Enter your favorite color:')
    if color.lower() == 'quit':
        break
```


## `continue` Statements
