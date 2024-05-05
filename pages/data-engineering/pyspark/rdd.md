# RDD 

## Overview

PySpark RDD (Resilient Distributed Dataset) is a data structure that is:
- fault-tolerant
- immutable: any transformation on an RDD results in a new RDD.
- distributed collections of objects

Each dataset in RDD is divided into logical partitions, which can be computed on different nodes of the cluster.

Processing on RDDs is delayed until the result is requested (lazy avaluation). You can stack up multiple transformations on the same RDD without any processing happening.


## Use cases

- **Custom Transformations**: RDDs are more flexible than dataframe. You can define custom functions and transformations.
- **Non-Tabular Data**: RDDs can handle non-tabular data (e.g., graphs, text, images) without enforcing a schema.
- **Low-Level Operations**: RDDs allow direct access to partitions, elements, and low-level operations.
- **Legacy Code**: If you're migrating from older Spark versions or have existing RDD-based code, you might continue using RDDs.


## Creating RDD

Create a RDD from a text file using a `SparkContext`:
```py
# Create RDD from external Data source
rdd2 = spark.sparkContext.textFile("/path/test.txt")
```

Create a RDD from lists and tuples. The following code creates an iterator of 10,000 elements and then uses `parallelize()` to distribute that data into 2 partitions:
```py
big_list = range(10000)
rdd = sc.parallelize(big_list, 2)
odds = rdd.filter(lambda x: x % 2 != 0)
odds.take(5)
[1, 3, 5, 7, 9]
```


## RDD Operations

You can perform two types of operations on RDD: Transformations and Actions.

Transformation pperations are lazy operations and are executed only when an action is called on RDD. They are applied in a distributed manner across a cluster of machines and return a new RDD.

Examples: `map`, `filter`, `flatMap`, `groupByKey`, `reduceByKey`, `join`, `union`, `sortByKey`, `distinct`, `sample`, `mapPartitions`, and `aggregateByKey`.

RDD actions in PySpark trigger computations and return results to the Spark driver. Any RDD operation that returns non RDD is considered as an action. 

Examples: `collect`, `count`, `take`, `reduce`, `foreach`, `first`, `takeOrdered`, `takeSample`, `countByKey`, `saveAsTextFile`, `saveAsSequenceFile`, `saveAsObjectFile`, `foreachPartition`, `collectAsMap`, `aggregate`, and `fold`.


## Getting a subset of data

`take()` pulls a subset of data from the distributed system onto a single machine.

```py
rdd.take()
```