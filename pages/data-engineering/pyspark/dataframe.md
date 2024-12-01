# DataFrame

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


## Create

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

From a list of rows:
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

### Empty DataFrame
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

## Display size
```py
print(f"Number of rows: {df.count()}, Number of columns: {len(df.columns)}")
```

## Display data

```py
df.show()
```

```py
df.show(truncate=False)
```


## Display schema

```py
df.printSchema()
```

## Write to CSV
```py
df.write.options(header='True', delimiter=',') \
  .csv("/tmp/spark_output/zipcodes")
```

Saving modes: `overwrite`, `append`, `ignore`, `error`
```py
df.write.mode('overwrite').csv("/tmp/spark_output/zipcodes")
```


## Join

```py
# Sample DataFrames
data1 = [(1, 'Alice'), (2, 'Bob'), (3, 'Charlie')]
columns1 = ['id1', 'name']
df1 = spark.createDataFrame(data1, columns1)

data2 = [(1, 'Engineer'), (2, 'Doctor'), (4, 'Artist')]
columns2 = ['id2', 'profession']
df2 = spark.createDataFrame(data2, columns2)

# Inner join
joined_df = df1.join(df2, df1.id1 == df2.id2, how='inner')
joined_df.show()
```
- `how`: `inner`, `left`, `right`, `outer`