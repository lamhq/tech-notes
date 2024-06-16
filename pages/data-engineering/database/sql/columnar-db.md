# Columnar Databases

OLAP applications compute analytics properties from columns (attributes). They need an optimized column-read operation on a table.

Columnar databases are designed for high-throughput of column aggregations. 

Columnar DBs are column-oriented databases.

RDBMS does not scale to the Big Data scale common in analytics applications.

Modern Data Warehouses are built on Columnar databases. Data is stored by columns instead of by rows.

Available choices are:

- AWS: RedShift
- Azure: Synapse
- Google Cloud: BigQuery
- Apache: Druid, Kudu, Pinot
- Others: ClickHouse, Snowflake

![](https://www.ml4devs.com/images/illustrations/rdbms-vs-columnar-or-oltp-vs-olap-databases.webp)