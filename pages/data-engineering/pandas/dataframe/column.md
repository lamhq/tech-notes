# Columns

## Get column list
```py
df.columns
```

## Column access

Columns are pandas Series.

Get a single column (return a pandas Series):
```py
df['Missoula']
```

Get multiple columns (return a new dataframe):
```py
df[['Philadelphia', 'Missoula']]
```

Get column using property syntax:
```py
df.Missoula.head()
```

Get column from sliced dataframe:
```py
# select column Price from rows with range indexes
df.loc['2016-04-01':'2016-04-03', 'Price']
```

## Renaming

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

## Re-ordering

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
