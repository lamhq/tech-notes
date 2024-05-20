# Dataframe

## Overview

A pandas DataFrame is a two-dimensional, size-mutable, tabular data structure in Python. Can be thought of as a table with rows and columns.

Each column of a data frame is a pandas `Series`.


## Creating

Create an empty dataframe:
```py
df = pd.DataFrame()
```

From a dict of columns:
```py
df = pd.DataFrame({
  "calories": [420, 380, 390],
  "duration": [50, 40, 45]
})
```

Setting row index when creating dataframe:
```py
df = pd.DataFrame({
  "calories": [420, 380, 390],
  "duration": [50, 40, 45]
}, index=['a', 'b', 'c'])
```

From a list of objects:
```py
data = [{'col_1': 3, 'col_2': 'a'},
        {'col_1': 2, 'col_2': 'b'},
        {'col_1': 1, 'col_2': 'c'},
        {'col_1': 0, 'col_2': 'd'}]
pd.DataFrame.from_records(data)
```

From pandas series:
```py
dates = pd.date_range('2016-04-01', '2016-04-06')
temps1 = pd.Series([80, 82, 85, 90, 83, 87], index = dates)
temps2 = pd.Series([70, 75, 69, 83, 79, 77], index = dates)
df = pd.DataFrame({
  'Missoula': temps1, 
  'Philadelphia': temps2
})
```

From CSV file:
```py
# read in the data and print the first five rows
# use the Symbol column as the index, and 
# only read in columns in positions 0, 2, 3, 7
df = pd.read_csv("data/df.csv", index_col='Symbol', usecols=[0, 2, 3, 7])
```


## Viewing

```py
# printing the first 5 rows of the DataFrame
df.head()

# Print the last 5 rows of the DataFrame
df.tail()

# Print information about the data
df.info()
```


## Copying

```py
df_copy = df.copy()
```

## Sorting

```py
df.sort_values(by=['Letter'], ascending=False)
```


## Looping

Loop through each rows in a dataframe:

```py
for index, row in df.iterrows():
  print(row['c1'], row['c2'])
```
