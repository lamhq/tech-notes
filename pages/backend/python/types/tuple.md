# Tuples

## Defining tuples

A tuple is a fixed-length, ordered, immutable sequence of Python objects

```py
thistuple = ("apple", "banana", "cherry")
print(thistuple[1])

# tuple with one item
thistuple = ("apple",)

# another way to define a tuple
t = 12345, 54321, 'hello!'
```


## Item access
Elements can be accessed with square brackets `[]`:
```py
thistuple[0]
```

It's not possible to modify which object is stored in each slot:
```py
# this won't work
thistuple[2] = False
```


## Convert tuple into a list
```py
y = list(thistuple)
```


## Concatenating tuples
```py
(4, None, 'foo') + (6, 0) + ('bar',)
```


## Unpacking tuples

When you have a function that returns a tuple, you can unpack its elements:
```py
foo, bar = get_foo_bar()

for foo, bar in get_foo_bar():
    pass
```

If you're only interested in one of the values, you can use the `*rest` syntax to collect the remaining elements into a list:
```py
a, *rest = (1, 2, 3, 4, 5)
print(a)  # Outputs: 1
print(rest)  # Outputs: [2, 3, 4, 5]
```

To ignore the rest values, use `*_` syntax:
```py
a, *_ = (1, 2, 3, 4, 5)
print(a)  # Outputs: 1
```

To swap variable names:
```py
a, b = 1, 2
b, a = a, b
```


## Tuple methods
Count the number of occurrences of a value:
```py
a = (1,2,2,2,3,4,2)
a.count(2)
```


## The `in` keyword

This tests whether or not a sequence contains a certain value.

```py
ok = input('Enter a value')
if ok in ('y', 'ye', 'yes'):
    print('ok')
```