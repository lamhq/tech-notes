# DataFrame Computation

## Arithmetic operations

Multiply all values in a dataframe with a number:
```py
# multiply everything by 2
df * 2
```

Subtract a Series from every row of the DataFrame:
```py
# get first row
s = df.iloc[0]

# subtract first row from every row of the DataFrame
diff = df - s
```

Subtract a Series from every column:
```py
# get the A column
a_col = df['A']

# subtract the A column values from every column
df.sub(a_col, axis=0)
```


## Statistics

Get descriptive statistics of all columns:
```py
df.describe()
```

Get descriptive statistics of one column:
```py
df['MSFT'].describe()
```

### Min, max
Get minimum values of columns:
```py
# minimum values for both columns
df[['MSFT', 'AAPL']].min()
```

Get maximum values of columns:
```py
# maximum values for both columns
df[['MSFT', 'AAPL']].max()
```

Get location of the min values of columns:
```py
df[['MSFT', 'AAPL']].idxmin()
```

Get the top `n` smallest values:
```py
# get the 4 smallest values
df.nsmallest(4, ['MSFT'])['MSFT']
```

Get the top `n` largest values (numeric values only):
```py
# get the 4 largest values
df.nlargest(4, ['MSFT'])['MSFT']
```


### Mean, median, mode

Get mean of each columns:
```py
df.mean()
```

Get mean of each row:
```py
df.mean(axis=1)
```

Get median of each columns:
```py
df.median()
```


### Variance, Standard Deviation
Variance of each column:
```py
df.var()
```

Standard deviation:
```py
df.std()
```


## Covariance, Correlation

Covariance of two columns:
```py
df.MSFT.cov(df.AAPL)
```

Correlation of two columns:
```py
df.MSFT.corr(df.AAPL)
```
