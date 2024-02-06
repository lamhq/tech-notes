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

## The `in` keyword

This tests whether or not a sequence contains a certain value.

```py
ok = input('Enter a value')
if ok in ('y', 'ye', 'yes'):
    print('ok')
```