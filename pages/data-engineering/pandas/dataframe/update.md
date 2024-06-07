# Updating Data

## Column 

### Replacing Values

Replace values in multiple columns:
```py
df = pd.DataFrame({'a': [0, 1, 2, 3, 4], 'b': [5, 6, 7, 8, 9]})

# replace value 1 in column a with value 100
# replace value 8 in column b with value 100
df.replace({'a': 1, 'b': 8}, 100)
"""
	a   b
0	0   5
1	100	6
2	2   7
3	3   100
4	4   9
"""

# replace value 1 in column a with value 3
# replace value 8 in column b with value 4
df.replace({'a': 1, 'b': 8}, {'a': 3, 'b': 4})
"""
	a   b
0	0   5
1	3 	6
2	2   7
3	3   4
4	4   9
"""
```


### Renaming

Return a new dataframe with column is renamed:
```py
# rename the Book Value column,
# this returns a copy with the column renamed
# but the columns in the original did not change
df_copy = df.rename(columns={'Book Value': 'BookValue'})
```

Rename column in the orginal dataframe:
```py
# rename the column in-place
df.rename(columns= {'Book Value': 'BookValue'}, inplace=True)
```

### Adding

Append new column:
```py
df['RoundedPrice'] = df.Price.round()
```

Insert a new column:
```py
# insert RoundedPrice as the second column in the DataFrame
df.insert(1, 'RoundedPrice', df.Price.round())
```

### Deleting

Remove a single column (in-place):
```py
del df['Book Value']
```

Remove sing column and return it as a series (in-place):
```py
popped = copy.pop('Sector')
```

Remove multiple columns (in-place):
```py
df.drop(['Sector'], axis=1, inplace=True)
```

Remove multiple columns and return modified dataframe:
```py
# return a new DataFrame without the Sector column
# the original DataFrame object is not modified
afterdrop = df.drop(['Sector'], axis=1)
```

### Re-ordering

```py
# method 1: define new column
new_cols = ['Title',
 'Rating',
 'Release Year',
 'Netflix Original',
 'Episode Count',
 'Season Count',
 'Maturity',
 'Maturity Level',
 'Maturity Detail',
 'Image']
df=df[new_cols]

# method 2: move last column to the first
df = pd.DataFrame(technologies)
temp_cols=df.columns.tolist()
new_cols=temp_cols[-1:] + temp_cols[:-1]
df=df[new_cols]
```


## Row

### Updating
Append or replacing row by index:
```py
# create a new row with index label FOO
# and assign some values to the columns via a list
df.loc['FOO'] = ['the sector', 100, 110]
```

### Removing rows
Remove rows by indexes:
```py
# drop rows with labels ABT and ACN (out-of-place)
afterdrop = df.drop(['ABT', 'ACN'])
```
