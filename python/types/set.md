# Set

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