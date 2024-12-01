# Column

## Select

Select a single column:
```py
df.select('column_name').show()
```

Select multiple columns:
```py
df.select('column1', 'column2', 'column3').show()
```

You can combine `select` with other DataFrame methods:
```py
# Select and filter data
df.select('column1', 'column2').filter(df['column1'] > 10).show()
```

Selecting all columns except:
```py
# Select all columns except 'column_to_exclude'
df.select([col for col in df.columns if col != 'column_to_exclude']).show()
```

## Map value

Map column values using a dict:
```py
# Sample DataFrame
data = [("A",), ("B",), ("C",), ("D",)]
df = spark.createDataFrame(data, ["status"])

# Dictionary for mapping
mapping = {"A": "Active", "B": "Blocked", "C": "Closed"}

# Replace values of 'status' column
df = df.replace(mapping, subset=["status"])

# Show the updated DataFrame
df.show()
```


## Rename

```py
df.withColumnRenamed('existingName', 'newNam') \
  .withColumnRenamed('salary', 'salary_amount')
```

## Change Type

```py
df.withColumn("salary", col("salary").cast("Integer")).show()
```


## Add

Create a new column `CopiedColumn` by multiplying `salary` column with value 100:
```py
df.withColumn("CopiedColumn", col("salary")*100 ).show()
```

Create a new column `Country` with value `USA`:
```py
df.withColumn("Country", lit("USA") ).show()
```

Create a new column using custom condition:
```py
# add a new column `new_duration`
from pyspark.sql import functions as F

df.withColumn(
  "new_duration",
  F.when((F.col("duration_") == 1) & (F.col("duration_type") == "months_end_day"), "1 months")
  .when(F.col("duration_") == 24, "1 days")
  .when(F.col("duration_") == 168, "7 days")
  .when(F.col("duration_") == 240, "10 days")
  .when(F.col("duration_") == 30, "1 months")
  .when(F.col("duration_") == 720, "1 months")
  .when(F.col("duration_") == 1440, "2 months")
  .when(F.col("duration_") == 1545, "2 months")
  .when(F.col("duration_") == 90, "3 months")
  .when(F.col("duration_") == 2160, "3 months")
  .when(F.col("duration_") == 3600, "5 months")
  .when(F.col("duration_") == 4320, "6 months")
  .when(F.col("duration_") == 8640, "12 months")
  .when(F.col("duration_") == 8760, "12 months")
  .when(F.col("duration_") == 10080, "14 months")
  .when(F.col("duration_") == 20160, "28 months")
  .otherwise(None)
)
```


## Drop

```py
df.drop("salary").show() 
```
