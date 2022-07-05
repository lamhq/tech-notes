# Set

A set is an unordered collection with no duplicate elements.

You cannot access items in a set by referring to an index. But you can loop through the set items using a `for` loop

```py
thisset = {"apple", "banana", "cherry"}

# create an empty set
emp = set()

# loop through the set
for x in thisset:
    print(x)

# check set contain value
print("banana" in thisset)

# modify a set
thisset.add("orange")
thisset.update(["orange", "mango", "grapes"])
thisset.discard("banana")

# Join Two Sets
set1 = {"a", "b" , "c"}
set2 = {1, 2, 3}

set3 = set1.union(set2)
```

## Set comprehensions

```py
a = {x for x in 'abracadabra' if x not in 'abc'}
```