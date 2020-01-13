## Comment
```python
"""
This is a comment
written in
more than just one line
"""
```


## Types

```python
# getting data type
x = 5
print(type(x))

# type conversion
x = float(1) # x will be 1.0
y = int(2.8) # y will be 2
z = int("3") # z will be 3
w = float("4.2") # w will be 4.2
i = str(3.0)  # z will be '3.0'
```


## Numbers

Available operators:

- `+`, `-`, `*`, `/`
- `//`, `%`, `**`


## Strings

Python strings cannot be changed - they are immutable.

```python
a = 'a sample string'
b = "string with double quotes"
c = 'doesn\'t'
d = "doesn't"

# multiline string
e = """\
Usage: thingy [OPTIONS]
     -h                        Display this usage message
     -H hostname               Hostname to connect to
""")
f = '''Lorem ipsum dolor sit amet,
consectetur adipiscing elit,
sed do eiusmod tempor incididunt
ut labore et dolore magna aliqua.'''

# string literals next to each other are automatically concatenated
text = ('Put several strings within parentheses '
    'to have them joined together.')

# get string's length
f = len('abc')
```

### Indexing

```python
word = 'Python'
f = word[0]  # character in position 0: 'P'
l = word[5]  # character in position 5: 'n'
w1 = word[-1]   # last character: 'n'
w2 = word[-2]   # second-last character: 'o'
w3 = word[-6]   # 'P'
```

### Slicing

```python
s1 = word[0:2]  # characters from position 0 (included) to 2 (excluded): 'Py'
s2 = word[:2]   # character from the beginning to position 2 (excluded): 'Py'
s3 = word[4:]   # characters from position 4 (included) to the end: 'on'
```

### String methods

```python
a = " Hello, World!"
b = a.lower()
c = a.upper()
d = a.strip()
e = a.replace("H", "J")
f = a.split(",") # returns ['Hello', ' World!']
x = "Hello" in a # returns True
```

- `endswith`: Returns true if the string ends with the specified value
- `find`: Searches the string for a specified value and returns the position of where it was found
- `isalnum`: Returns True if all characters in the string are alphanumeric
- `isdigit`: Returns True if all characters in the string are digits
- `join`: Joins the elements of an iterable to the end of the string
- `split`: Splits the string at the specified separator, and returns a list
- `splitlines`: Splits the string at line breaks and returns a list


### String Format
```python
txt = "My name is John, and I am {}".format(36)
myorder = "I want to pay {price} dollars for {quantity} pieces of item {item}.".format(
    price = 5,
    quantity = 2,
    itemno = 'abcd'
)
```

## Boolean

Almost any value is evaluated to `True` if it has some sort of content.

Any string is `True`, except empty strings.

Any number is `True`, except `0`.

Any list, tuple, set, and dictionary are `True`, except empty ones.

Empty values, such as `()`, `[]`, `{}`, `""`, the number `0`, and the value `None`.

Available operators:

- `==`, `!=`, `>`, `<`, `>=`, `<=`
- `and`, `or`, `not`
- `is`, `is not`
- `in`, `not in`


## List

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


## Tuples

A tuple is a collection which is ordered and unchangeable. In Python tuples are written with round brackets.

```python
thistuple = ("apple", "banana", "cherry")

print(thistuple[1])

# convert tuple into a list
y = list(thistuple)

# tuple with one item
thistuple = ("apple",)
```


## Set

A set is a collection which is unordered and unindexed.

You cannot access items in a set by referring to an index. But you can loop through the set items using a `for` loop

```python
thisset = {"apple", "banana", "cherry"}

for x in thisset:
  print(x)

print("banana" in thisset)

thisset.add("orange")
thisset.update(["orange", "mango", "grapes"])
thisset.discard("banana")

# Join Two Sets
set1 = {"a", "b" , "c"}
set2 = {1, 2, 3}

set3 = set1.union(set2)
```