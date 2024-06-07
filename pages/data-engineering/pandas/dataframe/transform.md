# Transforming Data

## Column transform

```py
df = pd.DataFrame(
  np.arange(12).reshape(4, 3), 
  columns=['a', 'b', 'c'])
"""
	a	b   c
0	0	1   2
1	3	4   5
2	6	7   8
3	9	10  11
```

Apply a function on each column:
```py
df.apply(lambda col: col.sum())
"""
a    18
b    22
c    26
dtype: int64
"""
```


## Row transform
Apply a function on each row:
```py
df.apply(lambda row: row.sum(), axis=1)
"""
0     3
1    12
2    21
3    30
dtype: int64
"""
```

Add new column with value computed from other columns:
```py
df['d'] = df.apply(lambda r: r.a * r.b, axis=1)
df
"""
  a b   c   d
0 0 1   2   0
1 3 4   5   12
2 6 7   8   42
3 9 10  11	90
"""
```
