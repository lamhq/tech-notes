# Loading External Data

## CSV

Read a CSV file from internet to a dataframe:
```py
df = pd.read_csv(
    "https://raw.githubusercontent.com/PacktPublishing/Learning-Pandas-Second-Edition/master/data/msft.csv")
```

Read a CSV file, specify the index column and the columns to load:
```py
df = pd.read_csv("data/msft.csv", usecols=['Date', 'Close'], index_col='Date')
```

Read a CSV file, specify a new set of names for the columns:
```py
df = pd.read_csv("data/msft.csv", 
    names=['date', 'open', 'high', 'low', 'close', 'volume'])
```

Common parameters:
- `sep=','` set separator to `,`
- `skiprows=[0, 2, 3]`: skip row with numbers
- `nrows=3`: only process 3 rows


Saving dataframe to a CSV:
```py
df.to_csv("data/msft_modified.csv", index_label='date')
```
- `index=False`: skip writting index column


## Excel

Install Openpyxl, a library for reading and writing Excel
```sh
pip install openpyxl
```

Read a worksheet in an excel file using pandas:
```py
df = pd.read_excel("data/stocks.xlsx", sheet_name='aapl')
```

Write a dataframe to a worksheet in an excel file:
```py
df.to_excel("data/msft2.xlsx")
```


## JSON

Read JSON:
```py
df = pd.read_json("https://raw.githubusercontent.com/PacktPublishing/Learning-Pandas-Second-Edition/master/data/stocks.json")
```

Write dataframe to a JSON:
```py
df.to_json("data/stocks.json")
```


## SQL Databases

Read data from SQL database:
```py
import sqlite3

# open the connection
connection = sqlite3.connect("data/stocks.sqlite")

# construct the query string
query = "SELECT * FROM STOCK_DATA WHERE " + \
        "Volume>29200100 AND Symbol='MSFT';"

# execute and close connection
df = pd.io.sql.read_sql(query, connection, index_col='index')
connection.close()

# report the query result
df
```

Write dataframe to SQL database:
```py
import pandas as pd
import sqlite3

# Create a sample DataFrame
df = pd.DataFrame({
    'id': [1, 2, 3],
    'name': ['Alice', 'Bob', 'Charlie'],
    'age': [25, 30, 22]
})

# Connect to an SQLite database (create a new one if it doesn't exist)
conn = sqlite3.connect('my_database.db')

# Write the DataFrame to an SQLite table named 'my_table'
df.to_sql('my_table', conn, if_exists='replace', index=False)

# Close the connection
conn.close()
```
