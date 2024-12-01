# RDD 

## Overview

PySpark RDD (Resilient Distributed Dataset) is collection of elements that can be operated on in parallel across a cluster.

RDD is:
- **Immutable**: Once an RDD is created, it cannot be changed
- **Lazy Evaluation**: Transformations on RDDs are not computed immediately. The actual computation is carried out when an action is called.
- **Fault Tolerance**: If part of the data is lost, the RDD can be recomputed from the original data and previous transformations.
- **Partitioning**: RDDs are divided into partitions. Operations on RDDs are performed on each partition in parallel


## Use cases

- **Custom Transformations**: RDDs are more flexible than dataframe. You can define custom functions and transformations.
- **Non-Tabular Data**: RDDs can handle non-tabular data (e.g., graphs, text, images) without enforcing a schema.
- **Low-Level Operations**: RDDs allow direct access to partitions, elements, and low-level operations.
- **Legacy Code**: If you're migrating from older Spark versions or have existing RDD-based code, you might continue using RDDs.


## Creating RDD

Create a RDD from a text file:
```py
# Create RDD from external Data source
rdd2 = spark.sparkContext.textFile("/path/test.txt")
```

Create a RDD from lists and tuples:
```py
# creates an iterator of 10,000 elements
big_list = range(10000)

# distribute data into 2 partitions
rdd = sc.parallelize(big_list, 2)

odds = rdd.filter(lambda x: x % 2 != 0)

# pulls a subset of data
odds.take(5)
# [1, 3, 5, 7, 9]
```


## Operations

You can perform two types of operations on RDD: **Transformations** and **Actions**.

Transformation operations:
- executed only when an action is called on RDD (lazy operations)
- applied across a cluster of machines (distributed)
- return a new RDD
- examples: `map`, `filter`, `flatMap`, `groupByKey`, `reduceByKey`, `join`, `union`, `sortByKey`, `distinct`, `sample`, `mapPartitions`, and `aggregateByKey`.

RDD actions:
- trigger computations and return results to the Spark driver
- any operation that returns non RDD is considered as an action 
- examples: `collect`, `count`, `take`, `reduce`, `foreach`, `first`, `takeOrdered`, `takeSample`, `countByKey`, `saveAsTextFile`, `saveAsSequenceFile`, `saveAsObjectFile`, `foreachPartition`, `collectAsMap`, `aggregate`, and `fold`.

Here's an example demonstrates how you can create an RDD, apply a transformation to it, and then retrieve the results with an action:

```python
from pyspark import SparkContext

# Create a SparkContext
sc = SparkContext("local", "RDD Example")

# Create an RDD from a list of numbers
data = [1, 2, 3, 4, 5]
rdd = sc.parallelize(data)

# Apply a transformation (map) to multiply each element by 2
transformed_rdd = rdd.map(lambda x: x * 2)

# Apply an action (collect) to retrieve the results
results = transformed_rdd.collect()

print(results)  # Output: [2, 4, 6, 8, 10]

# Stop the SparkContext
sc.stop()
```
