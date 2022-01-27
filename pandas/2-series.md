# Pandas Series

## What is a Series?

A Pandas Series is like a column in a table. It is a one-dimensional array holding data of any type.

```python
import pandas as pd

a = [1, 7, 2]

myvar = pd.Series(a)

print(myvar)

"""
0    1
1    7
2    2
dtype: int64
"""
```


## Labels

If nothing else is specified, the values are labeled with their index number. First value has index 0, second value has index 1 etc.

This label can be used to access a specified value.

With the `index` argument, you can name your own labels.

```python
import pandas as pd

a = [1, 7, 2]

myvar = pd.Series(a, index = ["x", "y", "z"])

print(myvar["y"])
# 7
```


## Creating Series

```python
import pandas as pd

# create from a dictionary
calories = {"day1": 420, "day2": 380, "day3": 390}
myvar = pd.Series(calories, index = ["day1", "day2"])
print(myvar)
"""
day1    420
day2    380
dtype: int64
"""

# creation using NumPy functions
import numpy as np
pd.Series(np.arange(4, 9))
"""
0    4
1    5
2    6
3    7
4    8
dtype: int64
"""
```


## The `.index` and `.values` properties

```python
import pandas as pd
import numpy as np

s = pd.Series([1, 2, 3])
print(s.values)
# [1 2 3]

print(s.index)
# RangeIndex(start=0, stop=3, step=1)
```


## The `size` and `shape` of a Series

```python
import pandas as pd
s = pd.Series([0, 1, 2, 3])
len(s)  # 4

s.size  # 4

s.shape  # (4,)
```


## Lookup

```python
s1 = pd.Series(np.arange(10, 15), index=list('abcde'))
print(s1)

"""
a    10
b    11
c    12
d    13
e    14
dtype: int64
"""

# get the value with label 'a'
s1['a']   # 10

# get multiple items
s1[['d', 'b']]
"""
d    13
b    11
dtype: int64
"""

# explicitly lookup by position
s1.iloc[[0, 2]]
"""
a    10
c    12
dtype: int64
"""
```


## Slicing

```py
import pandas as pd

s = pd.Series(np.arange(100, 110), index=np.arange(10, 20))

# slice showing items at position 1 through 5
# equivalent to s.iloc[[1, 2, 3, 4, 5]]
s[1:6]
"""
11    101
12    102
13    103
14    104
15    105
dtype: int64
"""

# items at position 1, 3, 5
s[1:6:2]
"""
11    101
13    103
15    105
dtype: int64
"""

# first five by slicing, same as .head(5)
s[:5]

# fourth position to the end
s[4:]

# reverse the Series
s[::-1]

# -4:, which means the last 4 rows
s[-4:]
```


## Filter

```py
s = pd.Series(np.arange(0, 5), index=list('abcde'))
"""
a    0
b    1
c    2
d    3
e    4
dtype: int64
"""

# which rows have values that are > 3
s[s > 3]
"""
e    4
dtype: int64
"""

# multiple logical operator
s[(s >=2) & (s < 5)]

# return True if all items >= 0
(s >= 0).all()
# True

# return True if any items < 2
s[s < 2].any()

# return total value of items whose values < 3
(s < 3).sum()
# 3
```


## Modifying

```py
# generate a Series to play with
np.random.seed(123456)
s = pd.Series(np.random.randn(3), index=['a', 'b', 'c'])
"""
a    0.469112
b   -0.282863
c   -1.509059
dtype: float64
"""

# modify the value at 'd' in-place
s['d'] = -100

# remove a row / item
del(s['a'])
```

Modification of values through the result of the slice operation will modify the original `Series`:

```py
copy = s.copy() # preserve s
slice = copy[:2] # slice with first two rows

# change item with label 10 to 1000
slice['b'] = 0
# and see it in the source
copy
```


## Calculation with index alignment

```py
s1 = pd.Series([1, 2], index=['a', 'b'])
s2 = pd.Series([4, 3], index=['b', 'a'])

# add them
s1 + s2
"""
a    4
b    6
dtype: int64
"""

# multiply all values in s1 by 2
s1 * 2
"""
a    2
b    4
dtype: int64
"""

s1 * s2
"""
a    3
b    8
dtype: int64
"""
```


## Re-indexing

```py
# sample series of five items
np.random.seed(123456)
s = pd.Series(np.random.randn(5))

# change the index
s.index = ['a', 'b', 'c', 'd', 'e']

# reindex with different number of labels
# results in dropped rows and/or NaN's
s2 = s.reindex(['a', 'c', 'g'])

# different types for the same values of labels
# causes big trouble
s1 = pd.Series([0, 1, 2], index=[0, 1, 2])
s2 = pd.Series([3, 4, 5], index=['0', '1', '2'])
s1 + s2

# reindex by casting the label types
# and we will get the desired result
s2.index = s2.index.values.astype(int)
s1 + s2

# create example to demonstrate fills
s3 = pd.Series(['red', 'green', 'blue'], index=[0, 3, 5])
# forward fill with latest value
s3.reindex(np.arange(0,7), method='ffill')
```