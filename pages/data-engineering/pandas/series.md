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

By default, the values are labeled with their index number. First value has index `0`.

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

Create from a dictionary:
```python
calories = {"day1": 420, "day2": 380, "day3": 390}
myvar = pd.Series(calories, index = ["day1", "day2"])

myvar
"""
day1    420
day2    380
dtype: int64
"""
```

Create using NumPy functions:
```python
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

Create a series with `n` elements:
```py
import numpy as np

s = pd.Series([np.nan]*4, index=range(4))
```

## Series's properties

`.index` and `.values` properties:
```python
import pandas as pd
import numpy as np

s = pd.Series([1, 2, 3])
print(s.values)
# [1 2 3]

print(s.index)
# RangeIndex(start=0, stop=3, step=1)
```


`size` and `shape` properties:
```python
import pandas as pd
s = pd.Series([0, 1, 2, 3])
len(s)  # 4

s.size  # 4

s.shape  # (4,)
```
