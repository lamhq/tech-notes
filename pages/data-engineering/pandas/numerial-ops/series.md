# Series Computation

## Arithmetic operations

Calculation of two series is performed on items have the same labels.

Two series to test:
```py
s1 = pd.Series([1, 2], index=['a', 'b'])
s2 = pd.Series([3, 4], index=['a', 'b'])
```

Add two series:
```py
s1 + s2
"""
a    4
b    6
dtype: int64
"""
```

Multiply a series with a number:
```py
s1 * 2
"""
a    2
b    4
dtype: int64
"""
```

Multiply two series:
```py
s1 * s2
"""
a    3
b    8
dtype: int64
"""
```

## Statistics

The series to test:
```py
s = pd.Series(['a', 'a', 'b', 'c', np.NaN])
```

Get descriptive statistics:
```py
s = pd.Series([1, 2, 3, 3, np.NaN])
s.describe()
"""
count    4.000000
mean     2.250000
std      0.957427
min      1.000000
25%      1.750000
50%      2.500000
75%      3.000000
max      3.000000
dtype: float64
"""
```

### Count
Counts of items (excluding `NaN`):
```py
s.count() # 4
```

Get the number of occurrences for every value:
```py
s.value_counts(dropna=False)
```

### Unique
Get a list of unique values:
```py
s.unique()
# array(['a', 'b', 'c', nan], dtype=object)
```

Get number of unique values (excluding `NaN`):
```py
s.nunique() # 3
```

Get number of unique values (including `NaN`):
```py
s.nunique(dropna=False) # 4
"""
a      2
b      1
c      1
NaN    1
Name: count, dtype: int64
"""
```


### Min, max
Get the top `n` smallest values:
```py
s.nsmallest(4)
```

Get the top `n` largest values:
```py
s.nlargest(4)
```


### Mean, median, mode

Mean:
```py
s.mean()
```

Median:
```py
s.median()
```

Mode:
```py
s.mode()
```

### Variance, Standard Deviation
Variance:
```py
s.var()
```

Standard deviation:
```py
s.std()
```


## Accumulations

Accumulations are statistical methods that determine a value by continuously applying the calculation on the current value to the last result.

Cumulative product:
```py
# calculate a cumulative product
# The result is another `Series` that represents the accumulated value at each position
pd.Series([1, 2, 3, 4]).cumprod()
```

Cumulative sum:
```py
# calculate a cumulative sum
pd.Series([1, 2, 3, 4]).cumsum()
```


## Quantiling

Quantiling is the process where values are divided into adjacent subgroups. Each subgroup is labeled with different names.

Quantiling helps in categorizing values.

The below example devide age values in to several groups:

```py
# generate 50 ages between 6 and 45
np.random.seed(123456)
ages = np.random.randint(6, 45, 50)

# cut into ranges and then get descriptive stats
ranges = [6, 12, 18, 35, 50]
agebins = pd.cut(ages, ranges)

# The resulting is a pandas Categorical variable.
# It consists of a set of labels and an index that describes how the data has been split.
agebins.describe()
```
