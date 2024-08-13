# DataFrame

## Overview

A pandas DataFrame is a two-dimensional, size-mutable, tabular data structure in Python. Can be thought of as a table with rows and columns.

Each column of a data frame is a pandas `Series`.


## Creating DataFrame

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

Specify index when creating:
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

From pandas Series of columns:
```py
dates = pd.date_range('2016-04-01', '2016-04-06')
temps1 = pd.Series([80, 82, 85, 90, 83, 87], index = dates)
temps2 = pd.Series([70, 75, 69, 83, 79, 77], index = dates)
df = pd.DataFrame({
  'Missoula': temps1, 
  'Philadelphia': temps2
})
```


## Dataframe Information

```py
df = pd.DataFrame({
  "calories": [420, 380, 390],
  "duration": [50, 40, 45]
})
```

Get shape:
```py
df.shape
# (3, 2) -> 3 rows, 2 columns
```

Get column list:
```py
df.columns
```

Get number of values:
```py
df.size
# 6 -> 6 items in both rows and columns
```

Get number of rows:
```py
len(df)
```

## Check dataframe is empty
```py
df_empty = pd.DataFrame()

if df_empty.empty:
    print("DataFrame is empty")
```

## Viewing Data

Print the first 5 rows of the DataFrame:
```py
df.head()
```

Print the last 5 rows of the DataFrame
```py
df.tail()
```

Print information about the data:
```
df.info()
"""
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 3 entries, 0 to 2
Data columns (total 2 columns):
 #   Column    Non-Null Count  Dtype
---  ------    --------------  -----
 0   calories  3 non-null      int64
 1   duration  3 non-null      int64
dtypes: int64(2)
memory usage: 176.0 bytes
"""
```


## Copying DataFrame

```py
df_copy = df.copy()
```


## Sorting DataFrame

```py
df.sort_values(by=['Letter'], ascending=False)
```


## Looping through DataFrame

Loop through each rows in a dataframe:

```py
for index, row in df.iterrows():
  print(row['c1'], row['c2'])
```
