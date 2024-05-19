# Row

## Get number of rows
```py
len(df)
```

## Row access

### By index

```py
# get the row with index '2016-04-01'
df.loc['2016-04-01']

# select rows with specific indexes
df.loc[['2016-04-01', '2016-04-03']]

# get the location of 2016-04-01 and 2016-04-03 in the index
i1 = df.index.get_loc('2016-04-01')
i2 = df.index.get_loc('2016-04-03')
```

### By position

```py
# get the row at array position 1
df.iloc[1]

# select rows from postion 1 to 3
df.iloc[1:3]

# get rows by positions
df.iloc[[1, 2]]
```
