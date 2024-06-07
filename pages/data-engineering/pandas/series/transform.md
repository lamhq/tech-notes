# Transforming Data

## Mapping values

Map values from a Series to a new Series using a dict, non mapped values result to `NaN`:
```py
x = pd.Series({"one": 1, "two": 2, "three": 3})
m = {1: "a", 2: "b", 3: "c"}
x.map(m)
"""
one      a
two      b
three    c
dtype: object
"""
```


## Transforming values
Apply a function to every item of a Series:
```py
s = pd.Series(range(0, 5))
s.apply(lambda v: v * 2)
"""
0    0
1    2
2    4
3    6
4    8
dtype: int64
"""
```
