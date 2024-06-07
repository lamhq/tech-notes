# Accessing Data

## Accessing item

The series to test:
```python
s1 = pd.Series(np.arange(10, 15), index=list('abcde'))
s1
"""
a    10
b    11
c    12
d    13
e    14
dtype: int64
"""
```

Get item by label:
```python
s1['a']   # 10
```

Get multiple items:
```python
s1[['d', 'b']]
"""
d    13
b    11
dtype: int64
"""
```

Get item by position:
```python
s1.iloc[[0, 2]]
"""
a    10
c    12
dtype: int64
"""
```


## Slicing

The series to test:
```py
s = pd.Series(np.arange(100, 110), index=np.arange(10, 20))
```

Get items at position 1 through 5:
```py
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
```

Get items from position 1 to 5, step by 2:
```py
s[1:6:2]
"""
11    101
13    103
15    105
dtype: int64
"""
```

Get first five items (same as `.head(5)`):
```py
s[:5]
```

Get items from position 4 to the end:
```py
s[4:]
```

Get all items in reverse order:
```py
s[::-1]
```

Get the last 4 items:
```py
s[-4:]
```


## Filtering

The series to test:
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
```

Filter values that are > 3:
```py
s[s > 3]
"""
e    4
dtype: int64
"""
```

Filter by multiple logical operators:
```py
s[(s >=2) & (s < 5)]
```

Return `True` if all items >= 0:
```py
(s >= 0).all()
# True
```

Return `True` if any items < 2:
```py
s[s < 2].any()
```

Return total value of items whose values < 3:
```py
(s < 3).sum()
# 3
```
