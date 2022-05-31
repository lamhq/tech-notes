# List

List is a collection which is ordered and changeable. Allows duplicate members.

```py
# create a list
squares = [1, 4, 9, 16, 25]
x = [['a', 'b', 'c'], [1, 2, 3]]

# get list's size
len(squares)    # 5

# access item
squares[0]  # 1
squares[-1] # 25
a = squares[2:4]
b = squares[:4]

# replace some values
squares[2] = 64
squares[2:5] = [15, 14, 33]

# return a shallow copy of a list
squares[:]  # [1, 4, 9, 16, 25]

# concatenation
squares + [36, 49, 64, 81, 100]
# [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

# loop through a List
thislist = ["apple", "banana", "cherry"]
for x in thislist:
    print(x)

# Check if Item Exists
thislist = ["apple", "banana", "cherry"]
if "apple" in thislist:
    print("Yes, 'apple' is in the fruits list")

# Join Two Lists
list1 = ["a", "b" , "c"]
list2 = [1, 2, 3]
list3 = list1 + list2

# remove an item from a list by index
del thislist[0]
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
