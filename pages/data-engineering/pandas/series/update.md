# Updating Data

## Modifying Item

The series to test:
```py
np.random.seed(123456)
s = pd.Series(np.random.randn(3), index=['a', 'b', 'c'])
"""
a    0.469112
b   -0.282863
c   -1.509059
dtype: float64
"""
```

Modify an item by label `'d'`:
```py
s['d'] = -100
```

Remove an item by label:
```py
del(s['a'])
```

Modify sliced items will modify the original `Series`:
```py
source_series = s.copy() # preserve s
sliced = source_series[:2] # slice with first two items
 
# change item with label 10 to 1000
sliced['b'] = 111

# and see it in the source
source_series
"""
a      0.469112
b    111.000000
c     -1.509059
dtype: float64
"""
```


## Replacing Items

Replace values in a Series with a new value:
```py
s = pd.Series([4, 5, 6, 8, 8])
s.replace(8, 5)
"""
0    4
1    5
2    6
3    5
4    5
dtype: int64
"""
```

Replaces values from a list with values in another list:
```py
s.replace([5, 8], [4, 1])
"""
0    4
1    4
2    6
3    1
4    1
dtype: int64
"""
```

Replace values using entries in a dict:
```py
s.replace({6: 2, 8: 3})
"""
0    4
1    5
2    2
3    7
4    3
5    3
dtype: int64
"""
```


## Re-indexing

The series to test:
```py
np.random.seed(123456)
s = pd.Series(np.random.randn(5))
```

Change the index:
```py
s.index = ['a', 'b', 'c', 'd', 'e']
```

Reindex with different number of labels:
- some items may be removed
- items with new labels will have value `NaN`
```py
s2 = s.reindex(['a', 'c', 'g'])
```

Reindex with different number of labels, fill missing values:
```py
s3 = pd.Series(['red', 'green', 'blue'], index=[0, 3, 5])
s3 = s3.reindex(np.arange(0,7), method='ffill')
```

Change index's type:
```py
s2 = pd.Series([3, 4, 5], index=['0', '1', '2'])
s2.index = s2.index.values.astype(int)
```
