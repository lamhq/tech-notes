# Computation

## Arithmetic operations

Multiply every values in a dataframe:
```py
# multiply everything by 2
df * 2
```

Subtract first row from every row of the DataFrame:
```py
# get first row 
s = df.iloc[0] 
# subtract first row from every row of the DataFrame
diff = df - s 
diff
```

Subtract a column from every column:
```py
# get the A column
a_col = df['A']
# subtract the A column values from every column
df.sub(a_col, axis=0)
```
