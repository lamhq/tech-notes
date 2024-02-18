# Dataframe

A Pandas DataFrame is a 2 dimensional data structure, like a 2 dimensional array, or a table with rows and columns.

Each column of a data frame is a pandas `Series`

## Create DataFrame

### Create an empty dataframe

```py
df = pd.DataFrame()
```


### From arrays

```py
data = {
  "calories": [420, 380, 390],
  "duration": [50, 40, 45]
}
df = pd.DataFrame(data)
```

Using named indexes:

```py
df = pd.DataFrame(data, index = ["day1", "day2", "day3"])
```

### From objects

```py
data = [{'col_1': 3, 'col_2': 'a'},
        {'col_1': 2, 'col_2': 'b'},
        {'col_1': 1, 'col_2': 'c'},
        {'col_1': 0, 'col_2': 'd'}]
pd.DataFrame.from_records(data)
```

### From Series

```py
dates = pd.date_range('2016-04-01', '2016-04-06')
temps1 = pd.Series([80, 82, 85, 90, 83, 87], index = dates)
temps2 = pd.Series([70, 75, 69, 83, 79, 77], index = dates)
df = pd.DataFrame({
  'Missoula': temps1, 
  'Philadelphia': temps2
})
```

### From CSV file

```py
# read in the data and print the first five rows
# use the Symbol column as the index, and 
# only read in columns in positions 0, 2, 3, 7
df = pd.read_csv("data/df.csv", index_col='Symbol', usecols=[0, 2, 3, 7])
```

## Get column list

```py
df.columns
```

## Get number of rows

```py
len(df)
```

## Viewing data

```py
# printing the first 5 rows of the DataFrame
df.head()

# Print the last 5 rows of the DataFrame
df.tail()

# Print information about the data
df.info()
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

## Cell access

```py
# get cell value by index and column name
df.at['2016-04-03', 'Missoula']

# get cell value by location: row 0, column 1
df.iat[2, 0]
```

## Slicing data

### Slicing Rows

```py
# first five rows
df[:5]

# from row with index `ABT` to `ACN`
df['ABT':'ACN']
```

### Slicing Columns

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

## Filtering

```py
# what rows have a price < 100?
df.Price < 100

# get the rows with Price < 100
df[df.Price < 100]

# get the Price and Sector column from Rows where Price is < 40 and Sector = Health Care
r = df[(df.Price < 40) & (df.Sector == 'Health Care')] [['Price','Sector']]

# get the Price and Sector column from Rows at index ABT and ZTS
df.loc[['ABT', 'ZTS']][['Sector', 'Price']]

# negative filter
selection = df.Price > 300
price_less_than_300 = df[~selection]
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

## Re-order columns

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

## Visualization

```py
# display plots chart for the values in the Close column
df.Close.plot()
```

## Copy dataframe

```py
df_copy = df.copy()
```