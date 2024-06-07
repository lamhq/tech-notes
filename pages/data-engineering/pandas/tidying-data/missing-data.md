# Missing Data

## What are missing data?

Data is missing in pandas when it has a value of `NaN`. Declared using `np.nan` value from NumPy.

Create a DataFrame that has some missing data points:
```py
df = pd.DataFrame({
    'a': np.nan,
    'b': [1,2,3],
    'c': [4,np.nan,3],
})
```

## Finding missing data

Finding missing data's location in a DataFrame:
```py
df.isnull()
```

Output:
```
  a     b     c
0 True	False False
1 True	False True
2 True	False False
```

Count the number of `NaN`'s in each column:
```py
df.isnull().sum()
"""
a    3
b    0
c    1
dtype: int64
"""
```

Get the number of `NaN` values in a DataFrame:
```py
df.isnull().sum().sum()
# 4
```

Get the number of non-NaN values in each column:
```py
df.count()
```


## Dropping missing data

Drop rows that contains at least one `NaN` value (out of place):
```py
df.dropna()
```

Drop rows that have all values as `NaN` (out of place):
```py
df.dropna(how='all')
```

Drop columns that have all values as `NaN` (out of place):
```py
df.dropna(how='all', axis=1)
```

Drop columns that at least 5 values as `NaN` (out of place):
```py
df.dropna(thresh=5, axis=1)
```

Remove `NaN` values from a pandas Series (out of place):
```py
df['c'].dropna()
```


## Behavior

For mathematical operations:
- When a **NumPy function** encounters a `NaN` value, it returns `NaN`
- **Pandas functions** typically ignore the `NaN` values and continue processing the function (`NaN` is often treated as `0`)

For example:
```py
c = np.array([4, np.nan, 3])
df = pd.DataFrame({
    'a': np.nan,
    'b': [1,2,3],
    'c': c,
})
```

```py
c.sum()    # nan
df.c.sum() # 7.0
```

```py
c.cumsum()    # array([ 4., nan, nan])
df.c.sum()
"""
0    4.0
1    NaN
2    7.0
Name: c, dtype: float64
"""
```


## Filling missing data

Fill all `NaN` values in a DataFrame with new value:
```py
df.fillna(4)
```

Fill all `NaN` values in each column with its mean value:
```py
df.fillna(df.mean())
```

Fill missing values in a Series with index-matched values from another Series:
```py
c1 = pd.Series()
df.c.fillna(c1)
```

Fill missing values in a Series with previous non-NaN values (forward):
```py
df.c.ffill()
```

Fill missing values in a Series with next non-NaN values (backward):
```py
c1 = pd.Series([9], index=[1])
df.c.fillna(c1)
"""
0    4.0
1    9.0
2    3.0
Name: c, dtype: float64
"""
```

### Intepolated values

Fill missing values in a Series using linear interpolate:
```py
s = pd.Series([1, np.nan, np.nan, np.nan, 2])
s.interpolate()
"""
0    1.00
1    1.25
2    1.50
3    1.75
4    2.00
dtype: float64
"""
```

Filling missing values using date index:
```py
from datetime import datetime

ts = pd.Series([1, np.nan, 3, 4], 
    index=[
        datetime(2024, 1, 1), 
        datetime(2024, 2, 1),                   
        datetime(2024, 3, 1),
        datetime(2024, 4, 1),
    ])
ts.interpolate(method="time")
"""
2024-01-01    1.000000
2024-02-01    2.033333
2024-03-01    3.000000
2024-04-01    4.000000
dtype: float64
"""
```


Filling missing values using distances between values in the index:
```py
s = pd.Series([0, np.nan, 100], index=[0, 1, 10])
s.interpolate(method="values")
"""
0       0.0
1      10.0
10    100.0
dtype: float64
"""
```
