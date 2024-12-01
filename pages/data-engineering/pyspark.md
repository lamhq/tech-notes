# PySpark

## Version

- Spark: `3.5.3`.


## What Is Spark?

Spark is an open-source unified analytics engine for processing large amounts of data.

Spark runs operations on distributed clusters 100 times faster than traditional applications. 

Spark is written in [Scala](https://scala-lang.org/) and runs on the [JVM](https://en.wikipedia.org/wiki/Java_virtual_machine).

Scala is a function-based programming language.

Spark has built-in components for:
- processing streaming data
- machine learning
- graph processing
- interacting with data via SQL


## What Is PySpark?

Spark is implemented in Scala language.

PySpark is a Python-based wrapper on top of the Scala API.

PySpark allows processing large amounts of data on a single machine or a cluster of machines.

PySpark communicates with the Spark Scala-based API via the Py4J library (it allows any Python program to talk to JVM-based code).

You run PySpark programs on a Hadoop cluster (or other supported cluster).


## Architecture

![](https://i0.wp.com/sparkbyexamples.com/wp-content/uploads/2020/02/spark-cluster-overview.png?w=596&ssl=1)

### Driver

Driver program coordinates tasks and interacts with a cluster manager to allocate resources.

The driver communicates with worker nodes, where tasks are executed within an executor’s JVM.


### Cluster manager

Cluster managers in PySpark are responsible for resource allocation and task scheduling across nodes in a distributed computing environment.

## PySpark vs pandas

**PySpark** is a distributed computing framework well-suited for processing large-scale datasets (that exceed the memory capacity of a single machine).

It can leverage parallel processing (across a cluster of machines), enabling faster computations on massive datasets.

**pandas** is optimized for smaller to medium-sized datasets that can fit into memory in a single machine. It typically performs well for data manipulation and analysis tasks on small to medium datasets.


## Supported file formats

PySpark can read and write several file formats:
- Text Files (.txt)
- CSV Files (.csv)
- TSV Files (.tsv)
- Avro Files (.avro)
- JSON Files (.json)
- Parquet (.parquet)
- ORC Files (.orc)
- XML Files and many other formats


## References

- [PySpark API documentation](http://spark.apache.org/docs/latest/api/python/index.html)
- [PySpark examples GitHub](https://github.com/spark-examples/pyspark-examples)
- [PySpark tutorial](https://sparkbyexamples.com/pyspark-tutorial/)