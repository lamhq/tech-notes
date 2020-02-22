# List

List is a collection which is ordered and changeable. Allows duplicate members.

```python
# create a list
squares = [1, 4, 9, 16, 25]
x = [['a', 'b', 'c'], [1, 2, 3]]

# get list's size
squareSize = len(squares)

# access item
a = squares[2:4]
b = squares[:4]

# Change Item Value
squares[2] = 64
squares[2:5] = [15, 14, 33]

# loop through a List
thislist = ["apple", "banana", "cherry"]
for x in thislist:
    print(x)

# Check if Item Exists
thislist = ["apple", "banana", "cherry"]
if "apple" in thislist:
    print("Yes, 'apple' is in the fruits list")

# add items
squares.append(216)

# Remove Item
thislist.remove('banana')
thislist.pop()
del thislist[0]
thislist.clear()

# Copy a list
thislist = ["apple", "banana", "cherry"]
mylist = thislist.copy()
mylist = list(thislist)

# Join Two Lists
list1 = ["a", "b" , "c"]
list2 = [1, 2, 3]
list3 = list1 + list2
```

- `count`: Returns the number of elements with the specified value
- `insert`: Adds an element at the specified position
- `index`: Returns the index of the first element with the specified value
- `pop`: Removes the element at the specified position
- `reverse`: Reverses the order of the list
- `sort`: Sorts the list
