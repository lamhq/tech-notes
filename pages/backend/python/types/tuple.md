# Tuples

A tuple is a collection which is ordered and unchangeable. In Python tuples are written with round brackets.

```py
thistuple = ("apple", "banana", "cherry")
print(thistuple[1])

# convert tuple into a list
y = list(thistuple)

# tuple with one item
thistuple = ("apple",)

# another way to define a tuple
t = 12345, 54321, 'hello!'
```


## Unpacking tuples

When you have a function that returns a tuple, you can unpack its elements:
```py
foo, bar = get_foo_bar()
```

If you’re only interested in one of the values, you can use the `*rest` syntax to collect the remaining elements into a list:
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


## The `in` keyword

This tests whether or not a sequence contains a certain value.

```py
ok = input('Enter a value')
if ok in ('y', 'ye', 'yes'):
    print('ok')
```