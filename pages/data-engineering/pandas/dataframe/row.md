# Row

## Get number of rows
```py
len(df)
```

## Row access

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


## Concatenating

Concat rows in two dataframes and return a new one:
```py
pd.concat([df1, df2])
```


## Updating
Append or replacing row by index:
```py
# create a new row with index label FOO
# and assign some values to the columns via a list
df.loc['FOO'] = ['the sector', 100, 110]
```

## Removing rows
Remove rows by indexes:
```py
# drop rows with labels ABT and ACN (out-of-place)
afterdrop = df.drop(['ABT', 'ACN'])
```
