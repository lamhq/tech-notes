# Manipulating DataFrame Structure

## Column

### Renaming columns

```py
# rename the Book Value column,
# this returns a copy with the column renamed
# but the columns in the original did not change
df_copy = df.rename(columns={'Book Value': 'BookValue'})
```

```py
# rename the column in-place
df.rename(columns= {'Book Value': 'BookValue'}, inplace=True)

# we can see the column is changed
df.columns
```

### Adding new columns

```py
df['RoundedPrice'] = df.Price.round()
```

```py
# make a copy so that we keep the original data unchanged
df_copy = df.copy()

# insert RoundedPrice as the second column in the DataFrame
df_copy.insert(1, 'RoundedPrice', df.Price.round())
```

Using concatenation:

```py
# create a DataFrame with only the RoundedPrice column
rounded_price = pd.DataFrame({'RoundedPrice': sp500.Price.round()})
# concatenate along the columns axis
concatenated = pd.concat([sp500, rounded_price], axis=1)
```


### Reverse columns's order (out-of-place)

```py
# return a new DataFrame with the columns reversed
reversed_column_names = sp500.columns[::-1]
```

### Replacing the contents of a column

```py
copy.Price = rounded_price.RoundedPrice
```

### Deleting columns

```py
# remove column in-place
del df['Book Value']
```

```py
# remove Sector column and return it as a series (in-place)
popped = copy.pop('Sector')
```

```py
# return a new DataFrame without the Sector column
# the original DataFrame object is not modified
afterdrop = df.drop(['Sector'], axis=1)
```

## Row

### Appending new rows

```py
appended = df1.append(df2)
```

### Concatenating rows

```py
pd.concat([df1, df2])
```

### Append or replacing row

```py
# create a new row with index label FOO
# and assign some values to the columns via a list
df.loc['FOO'] = ['the sector', 100, 110]
```

### Removing rows

```py
# drop rows with labels ABT and ACN (out-of-place)
afterdrop = df.drop(['ABT', 'ACN'])
```
