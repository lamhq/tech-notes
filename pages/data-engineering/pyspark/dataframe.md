# DataFrame

## Overview

A DataFrame is a distributed dataset comprising data arranged in rows and columns with named attributes.

It shares similarities with relational database tables or R (Python) data frames but incorporates sophisticated optimizations.

## Use cases

- Structured Data: data that hase well-defined schema (CSV, Parquet, JSON)
- SQL-Like Queries: DataFrames provide a SQL-like API
- Optimized Execution Plans: DataFrame queries are optimized resulting in efficient execution plans.
- Integration with Spark Ecosystem: DataFrames seamlessly integrate with other Spark components like Spark SQL, MLlib, and GraphX.

## Dataframes vs RDDs
**API Complexity**:
- RDDs have a lower-level API.
- DataFrames provide a higher-level API.

**Ease of Use**:
- DataFrames abstract away low-level details, making them easier to work with.
- RDDs require more manual handling.

**Schema Enforcement**:
- DataFrames enforce a schema, ensuring consistent data types and column names.
- RDDs do not enforce a schema, allowing more flexibility but requiring manual handling.

**Performance**:
- DataFrames are generally faster due to optimizations
- RDDs can be more efficient for specific use cases.


## Creating DataFrame

### From CSV
```py
df = spark.read.csv("/tmp/resources/zipcodes.csv")
```

Using Header Record For Column Names:
```py
df = spark.read.options(
    delimiter=',', 
    # use header record for column names
    header='True',
    # automatically infers column types based on the data
    inferSchema='True'.
    # string to consider as null
    nullValues='1900-01-01',
    # format of date and timestamp
    dateFormat='M.d.y',
  ).csv("/tmp/resources/zipcodes.csv")
```

Read Multiple CSV Files:
```py
df = spark.read.csv("path1,path2,path3")
```

Read all CSV Files in a Directory:
```py
df = spark.read.csv("Folder path")
```

- PySpark supports all `java.text.SimpleDateFormat` formats.
- Check [this](https://docs.databricks.com/data/data-sources/read-csv.html) for other `read` options.


### From python list
```py
data = [('James','','Smith','1991-04-01','M',3000),
  ('Michael','Rose','','2000-05-19','M',4000),
  ('Robert','','Williams','1978-09-05','M',4000),
  ('Maria','Anne','Jones','1967-12-01','F',4000),
  ('Jen','Mary','Brown','1980-02-17','F',-1)
]

columns = ["firstname","middlename","lastname","dob","gender","salary"]
df = spark.createDataFrame(data=data, schema=columns)
```

Create a Dataframe with nested columns: 
```py
from pyspark.sql import SparkSession
from pyspark.sql.types import StructType,StructField 
from pyspark.sql.types import StringType, IntegerType, ArrayType

# Create SparkSession object
spark = SparkSession.builder.appName('SparkByExamples.com').getOrCreate()

# Create data
data = [
    (("James","","Smith"),["Java","Scala","C++"],"OH","M"),
    (("Anna","Rose",""),["Spark","Java","C++"],"NY","F"),
    (("Julia","","Williams"),["CSharp","VB"],"OH","F"),
    (("Maria","Anne","Jones"),["CSharp","VB"],"NY","M"),
    (("Jen","Mary","Brown"),["CSharp","VB"],"NY","M"),
    (("Mike","Mary","Williams"),["Python","VB"],"OH","M")
 ]

# Create schema        
schema = StructType([
     StructField('name', StructType([
        StructField('firstname', StringType(), True),
        StructField('middlename', StringType(), True),
         StructField('lastname', StringType(), True)
     ])),
     StructField('languages', ArrayType(StringType()), True),
     StructField('state', StringType(), True),
     StructField('gender', StringType(), True)
 ])

# Create dataframe
df = spark.createDataFrame(data=data, schema=schema)
df.printSchema()
df.show(truncate=False)
```

### From RDD
```py
df = rdd.toDF()
```

### Create an empty DataFrame
```py
#Create Schema
from pyspark.sql.types import StructType,StructField, StringType

schema = StructType([
  StructField('firstname', StringType(), True),
  StructField('middlename', StringType(), True),
  StructField('lastname', StringType(), True)
])
df = spark.createDataFrame([], schema)
df.printSchema()
```

## Display DataFrame

```py
df.show()
```

```py
df.show(truncate=False)
```


## Display Schema

```py
df.printSchema()
```

## Write DataFrame to CSV file
```py
df.write.options(header='True', delimiter=',') \
  .csv("/tmp/spark_output/zipcodes")
```

Saving modes: `overwrite`, `append`, `ignore`, `error`
```py
df.write.mode('overwrite').csv("/tmp/spark_output/zipcodes")
```

## Rename column

```py
df.withColumnRenamed('existingName', 'newNam') \
  .withColumnRenamed('salary', 'salary_amount')
```

## Change DataType of a column

```py
df.withColumn("salary",col("salary").cast("Integer")).show()
```


## Create a column

Creates a new column `CopiedColumn` by multiplying `salary` column with value 100:
```py
df.withColumn("CopiedColumn",col("salary")*100).show()
```

Creates a new column with a constant value:
```py
df.withColumn("Country", lit("USA")).show()
```


## Drop Column

```py
df.drop("salary") \
  .show() 
```


## Filter rows

Using equal condition:
```py
df.filter(df.state == "OH")
```

Using not equal filter condition:
```py
df.filter(df.state != "OH") \
    .show(truncate=False) 

# Another expression
df.filter(~(df.state == "OH")) \
    .show(truncate=False)
```

Use the `col()` function to refer to the column name:
```py
from pyspark.sql.functions import col

df.filter(col("state") == "OH") \
    .show(truncate=False) 
```

Use SQL Expression:

```py
# Using SQL Expression
df.filter("gender == 'M'").show()

# For not equal
df.filter("gender != 'M'").show()
df.filter("gender <> 'M'").show()
```

Use multiple conditions:
```py
# AND
df.filter( (df.state  == "OH") & (df.gender  == "M") )

# OR
df.filter( (df.state  == "OH") | (df.gender  == "M") )
```

Filter by a list of values:
```py
li=["OH","CA","DE"]
df.filter(df.state.isin(li))

# not
df.filter(~df.state.isin(li))
```

Start with/end with/contains:
```py
df.filter(df.state.startswith("N"))

df.filter(df.state.endswith("H"))

df.filter(df.state.contains("H"))
```

Regular Expression:
```py
# like - SQL LIKE pattern
df.filter(df2.name.like("%rose%"))

# rlike - SQL RLIKE pattern (LIKE with Regex), case insensitive
df.filter(df.name.rlike("(?i)^*rose$"))
```

For columns that have type array:
```py
from pyspark.sql.functions import array_contains

df.filter(array_contains(df.languages,"Java")) \
    .show(truncate=False)

# Output
#+----------------+------------------+-----+------+
#|name            |languages         |state|gender|
#+----------------+------------------+-----+------+
#|[James, , Smith]|[Java, Scala, C++]|OH   |M     |
#|[Anna, Rose, ]  |[Spark, Java, C++]|NY   |F     |
#+----------------+------------------+-----+------+
```


## Sort

```py
df.sort("department", "state", ascending=[True, False]) 
df.sort(df.department.asc(), df.state.desc())
```

```py
df.orderBy("department","state")
df.orderBy(col("department").asc(), col("state").desc())
```


## Group by

TBD


## Aggregate

TBD


## Join

TBD
