# Session and Context

## SparkSession

SparkSession provides a single interface to work with structured data processing.

SparkSession combines all the APIs available in different contexts (SparkContext, SQLContext, StreamingContext, HiveContext).

SparkSession can be used for:
- Creating DataFrames and Datasets
- Executing SQL Queries
- Reading Data from Various Sources (CSV files, Parquet files, JSON files, Avro files, Hive tables, JDBC databases)
- Writing Data to Various Destinations

Spark session can be created using a `builder()` or `newSession()` methods of the `SparkSession` class.


## SparkContext

A SparkContext represents the connection to a Spark cluster.

It allows you to connect to a Spark cluster, create RDDs, and broadcast variables on the cluster.

SparkSession internally creates a `sparkContext` variable of `SparkContext` class.

Only one SparkContext should be active per JVM, and you must stop the active one (with `stop()` method) before creating a new instance.


## Connect to a Spark cluster

To connect to local cluster:
```py
from pyspark.sql import SparkSession

# Create SparkSession 
spark = SparkSession.builder \
  .master("local[*]") \
  .appName("SparkByExamples.com") \
  .getOrCreate() 
```

- `local[*]` denotes that Spark will run in local mode, utilizing only a single JVM  on the local machine where your Python script is executed.
- `*` tells Spark to create as many worker threads as logical cores on your machine.


To connect to a Spark cluster:
```py
conf = pyspark.SparkConf()
conf.setMaster('spark://head_node:56887')
conf.set('spark.authenticate', True)
conf.set('spark.authenticate.secret', 'secret-key')
sc = SparkContext(conf=conf)
```


## Set log level

```py
from pyspark.context import SparkContext

spark_context = SparkContext.getOrCreate()
spark_context.setLogLevel("WARN")
```
