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
