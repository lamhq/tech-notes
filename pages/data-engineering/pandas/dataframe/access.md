# Accessing Data

## Slicing

Get the first 5 rows:
```py
df[:5]
```

Get rows by index range:
```py
# from row with index `ABT` to `ACN`
df['ABT':'ACN']
```


## Filtering

Filter rows by a condition:
```py
# get the rows with Price < 100
df[df.Price < 100]
```

Filter rows by multiple conditions:
```py
# get the Price and Sector column from Rows where Price is < 40 and Sector = Health Care
r = df[(df.Price < 40) & (df.Sector == 'Health Care')]
```

Filter rows by negative condition:
```py
selection = df.Price > 300
price_less_than_300 = df[~selection]
```


## Column Access

Each column is a pandas Series.

Get a column by name (return a pandas Series):
```py
df['Missoula']
```

Get a column using property syntax:
```py
df.Missoula.head()
```

Get multiple columns (return a new dataframe):
```py
df[['Philadelphia', 'Missoula']]
```

Get column from sliced dataframe:
```py
# select column Price from rows with range indexes
df.loc['2016-04-01':'2016-04-03', 'Price']
```

## Row Access

### By index

Get a single row (return a pandas Series):
```py
# get the row with index '2016-04-01'
df.loc['2016-04-01']
```

Get multiple rows:
```py
# select rows with multiple indexes
df.loc[['2016-04-01', '2016-04-03']]
```

Get row's position by index:
```py
# get the location of row that has index 2016-04-01
idx = df.index.get_loc('2016-04-01')
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


## Cell Access

By index and column name:
```py
df.at['2016-04-03', 'Missoula']
```

By location: row 0, column 1
```py
df.iat[2, 0]
```