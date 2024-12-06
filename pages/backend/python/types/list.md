# List

## Defining lists

List is a collection which is ordered and changeable. Allows duplicate members.

```py
# create a list
squares = [1, 4, 9, 16, 25]
x = [['a', 'b', 'c'], [1, 2, 3]]
```


## Get list's size
```py
len(squares)
```


## Item Operations
Access elements:
```py
squares[0]  # 1
squares[-1] # 25
```

Append item to the end of the list:
```py
squares.append(5)
```

Insert an element at a specific location (index must be between 0 and the length of the list, inclusive):
```py
squares.insert(1, 28)
```

Slicing:
```py
a = squares[2:4]
b = squares[:4]
```

Replace item's values:
```py
squares[2] = 64
squares[2:5] = [15, 14, 33]
```

Remove an item from a list by index:
```py
del thislist[0]
```

Remove an item by value:
```py
squares.remove(5)
```


## Copy 
```py
# return a shallow copy of a list
squares[:]  # [1, 4, 9, 16, 25]
```


## Concatenate
```py
# concatenation
squares + [36, 49, 64, 81, 100]
# [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
```


## Sorting
You can sort a list in place:
```py
a = [7,2,5,1,3]
a.sort()
```


## Loop
```py
# loop through a List
thislist = ["apple", "banana", "cherry"]
for x in thislist:
    print(x)
```


## Check Item Exists
```py
thislist = ["apple", "banana", "cherry"]
if "apple" in thislist:
```


## List methods

- `append(x)`: Add an item to the end of the list.
- `insert(i, x)`: Insert an item at a given position
- `remove(x)`: Remove the first item from the list whose value is equal to `x`. It raises a `ValueError` if there is no such item.
- `pop([i])`: Remove the item at the given position in the list, and return it. If no index is specified, `a.pop()` removes and returns the last item in the list.
- `clear()`: Remove all items from the list.
- `index(x[, start[, end]])`: Return zero-based index in the list of the first item whose value is equal to `x`. Raises a `ValueError` if there is no such item.
- `count(x)`: Return the number of times x appears in the list.
- `sort(key=None, reverse=False)`: Sorts the list
- `reverse()`: Reverse the elements of the list in place.
- `copy()`: Return a shallow copy of the list.
- `extend(iterable)`: Extend the list by appending all the items from the iterable.


## List Comprehension

List comprehensions provide a concise way to create lists.

### Mapping

Create a list from another list:
```py
origins = [1, 3, 5, 7, 9]

# generates a list of squared values based on the original list
squares = [x**2 for x in origins]
```

Nested list comprehensions:
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


### Filtering

```py
vec = [-4, -2, 0, 2, 4]

# filter the list to exclude negative numbers
filtered = [x for x in vec if x >= 0]
```

## Reduce a list
```py
from functools import reduce

# Example list
numbers = [1, 2, 3, 4, 5]

# Reduce the list by summing up all the elements
result = reduce(lambda prev, cur: prev + cur, numbers, 0)

print(result)  # Output will be 15
```


## Sequence Functions

### `enumerate` 

Allow to iterate over a sequence and keep track of the index of the current item:

```py
index = 0
for index, value in enumerate(collection):
    # do something with value
```


### `sorted`

Returns a new sorted list from the elements of any sequence:
```py
sorted([7, 1, 2, 6, 0, 3, 2])
```


### `zip`

Pairs up the elements of a number of lists, tuples, or other sequences to create a list of tuples, return an iterator:
```py
seq1 = ["foo", "bar", "baz"]
seq2 = ["one", "two", "three"]
for key, value in zip(seq1, seq2):
    pass
```


### `reversed`

Iterates over the elements of a sequence in reverse order:
```py
for item in reversed([7, 1, 2, 6, 0, 3, 2]):
    print(item)
```
