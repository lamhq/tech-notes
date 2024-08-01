# Duplicated data

## Finding duplicated data

```py
df = pd.DataFrame({
  'a': ['x'] * 3 + ['y'] * 4, 
  'b': [1, 1, 2, 3, 3, 4, 4]
})
```

Find duplicated rows in a DataFrame:
```py
df.duplicated()
"""
0    False
1     True
2    False
3    False
4     True
5    False
6     True
dtype: bool
"""
```


## Dropping

Drop duplicate rows, retaining first row of the duplicates:
```py
df.drop_duplicates()
```

Drop duplicate rows, keep last row of the duplicates:
```py
df.drop_duplicates(keep='last')
```

Drop duplicate rows with values from specific columns:
```py
df.drop_duplicates(['a'])
"""
   a  b
0  x  1
3  y  3
"""
```
