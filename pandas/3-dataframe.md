# Dataframe

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