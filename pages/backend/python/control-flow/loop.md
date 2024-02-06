# Loop

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
