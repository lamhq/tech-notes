# PySpark SQL

## Overview

PySpark SQL is a module in Spark that enables you to write SQL queries against structured data.


## How it work?

- You create a temporary table/view on DataFrame.
- The table can be accessed throughout the SparkSession using SQL
- The table is scoped to the SparkSession that created them. The temporary table is removed from memory when SparkSession is terminated.


## Example

```py
# Create temporary table
df.createOrReplaceTempView("PERSON_DATA")

# Run SQL query
df2 = spark.sql("SELECT * from PERSON_DATA")
df2.printSchema()
df2.show()
```

- You create a view `PERSON_DATA` for the datafame `df`
- You use `sql()` method to run SQL queries
- The `sql()` method returns a new DataFrame `df2`.