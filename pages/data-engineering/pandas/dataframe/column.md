# Columns

### Get column list
```py
df.columns
```

## Column access

```py
# get column by name
df['Missoula']

# get columns by names
df[['Philadelphia', 'Missoula']]

# get column using property syntax
df.Missoula.head()

# select column Price from rows with range indexes
df.loc['2016-04-01':'2016-04-03', 'Price']
```


### Slicing

Getting a subset of a column:
```py
# get rows from location 1 through 4 
# of the Price column
df.Price[1:4]
```

```py
# get the values in the Price column 
# from rows at location 1, 3 and 5
df.iloc[[1, 3, 5]].Price
```