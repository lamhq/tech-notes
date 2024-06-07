# Reshaping Data

## Concatenating

```py
df1 = pd.DataFrame(np.arange(9).reshape(3, 3), 
                   columns=['a', 'b', 'c'])
df2 = pd.DataFrame(np.arange(9, 18).reshape(3, 3), 
                   columns=['a', 'c', 'd'])
```

Concat rows in two dataframes and return a new one:
```py
pd.concat([df1, df2])
"""
    a    b   c     d
0   0  1.0   2   NaN
1   3  4.0   5   NaN
2   6  7.0   8   NaN
0   9  NaN  10  11.0
1  12  NaN  13  14.0
2  15  NaN  16  17.0
"""
```

Concat columns in two dataframes:
```py
pd.concat([df1, df2], axis=1)
"""
   a  b  c   a   c   d
0  0  1  2   9  10  11
1  3  4  5  12  13  14
2  6  7  8  15  16  17
"""
```


## Joining

```py
left = pd.DataFrame({
    "key1": ["a", "b", "c"], 
    "key2": ["x", "y", "z"], 
    "lval1": [0, 1, 2]},
    index=[0, 1, 2],
)
right = pd.DataFrame({
    "key1": ["a", "b", "c"], 
    "key2": ["x", "a", "z"], 
    "rval1": [6, 7, 8]},
    index=[1, 2, 3],
)
```

### By columns (merge)

Merge using common columns (implicit):
```py
left.merge(right)
```

Merge using explicit column:
```py
left.merge(right, on='key1')
```

Merge using multiple columns (inner join):
```py
left.merge(right, on=['key1', 'key2'])
```

Outer join, merges all matched data, and fills unmatched items with `NaN`:
```py
left.merge(right, how='outer')
```

Left join, merges all matched data, fills unmatched items from the left dataframe with `NaN`:
```py
left.merge(right, how='left')
```

Right join:
```py
left.merge(right, how='right')
```


### By indexes (join)

Join using index labels (inner):
```py
pd.merge(left, right, left_index=True, right_index=True)
"""
  key1_x key2_x  lval1 key1_y key2_y  rval1
1      b      y      1      a      x      6
2      c      z      2      b      a      7
"""
```

Join using index labels (left join), specify suffixes for duplicated columns:
```py
left.join(right, lsuffix='_left', rsuffix='_right')
"""
  key1_left key2_left  lval1 key1_right key2_right  rval1
0         a         x      0        NaN        NaN    NaN
1         b         y      1          a          x    6.0
2         c         z      2          b          a    7.0
"""
```

Inner join:
```py
left.join(right, lsuffix='_left', rsuffix='_right', how='inner')
"""
  key1_left key2_left  lval1 key1_right key2_right  rval1
1         b         y      1          a          x      6
2         c         z      2          b          a      7
"""
```


## Pivoting

**Pivoting** is the process of transforming data from a **long format** to a **wide format**.

- **Wide Format**: each row represents a single observation, and columns represent different variables.
- **Long Format**: each row corresponds to a unique combination of identifiers (such as an ID or name) and a single variable value.

It involves reshaping a DataFrame by converting unique values from one column into multiple columns.

Example:
```py
df = pd.DataFrame({
    'interval': [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3],
    'axis': ['X', 'Y', 'Z', 'X', 'Y', 'Z', 'X', 'Y', 'Z', 'X', 'Y', 'Z'],
    'reading': [0.0, 0.5, 1.0, 0.1, 0.4, 0.9, 0.2, 0.3, 0.8, 0.3, 0.2, 0.7]
})
```

```py
df.pivot(index='interval', 
  columns='axis', 
  values='reading')
```

- `index='interval'`:The unique values in `interval` will become the index of the resulting pivot table.
- `columns='axis'`: Unique values in `axis` will become the columns of the pivot table.
- `values='reading'`: Cells will be filled with the values from the `reading` column corresponding to each `interval` and `axis`.

Result:
| interval | X   | Y   | Z   |
|----------|-----|-----|-----|
| 0        | 0.0 | 0.5 | 1.0 |
| 1        | 0.1 | 0.4 | 0.9 |
| 2        | 0.2 | 0.3 | 0.8 |
| 3        | 0.3 | 0.2 | 0.7 |


## Melting

The `melt()` function is used to **unpivot** a DataFrame from **wide format** to **long format** (see [Pivoting](#pivoting) section for more details).

It reshapes the DataFrame, leaving only two non-identifier columns: `variable` (which contains the original column names) and `value` (which contains the corresponding values).

Example:
```py
df = pd.DataFrame({
  'Name' : ['Mike', 'Mikael'],
  'Height' : [6.1, 6.0],
  'Weight' : [220, 185]
})
"""
     Name  Height  Weight
0    Mike     6.1     220
1  Mikael     6.0     185
"""
```

if we melt it using `id_vars=['Name']` and `value_vars=['Height', 'Weight']`, we get:
```py
pd.melt(df, id_vars=['Name'], value_vars=['Height', 'Weight'])
"""
     Name variable  value
0    Mike   Height    6.1
1  Mikael   Height    6.0
2    Mike   Weight  220.0
3  Mikael   Weight  185.0
"""
```


## Stacking

Create hierarchical indexes using stacking.

If your DataFrame has single-level columns, stacking it returns a Series with nested indexes.

Example:
```py
df = pd.DataFrame({
    'weight': [0, 1], 
    'height': [2, 3]
}, index=['cat', 'dog'])
"""
     weight  height
cat       0       2
dog       1       3
"""
```

```py
df.stack()
"""
cat  weight    0
     height    2
dog  weight    1
     height    3
"""
```
