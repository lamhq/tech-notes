# Table Extraction

## Extract Tables from Websites

```py
import pandas as pd

simpsons = pd.read_html('https://en.wikipedia.org/wiki/List_of_The_Simpsons_episodes_(seasons_1%E2%80%9320)')

simpsons[1].head()
```


## Extract Tables from PDFs

```py
import camelot

tables = camelot.read_pdf('foo.pdf', pages='1', flavor='lattice')
print(tables)

tables.export('foo.csv', f='csv', compress=True)

# export the first table to a csv file
tables[0].to_csv('foo.csv')

print(tables[0].df)  # to a df
```
