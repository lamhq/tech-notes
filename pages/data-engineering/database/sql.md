# SQL Databases

## Overview

SQL databases are suitable for storing structured data.

Data is stored in a table. Each record (row) has the same number of attributes (columns) of the same type.

There are two kinds of applications: OLTP and OLAP.


## OLTP

OLTP (Online Transaction Processing) is about capturing, storing, and processing large numbers of small transactions in real time.

OLTP applications need datastores that support low latency reads and writes of individual records.

Examples: customer orders, banking transactions, payments, and booking systems.


## OLAP

OLAP (Online Analytical Processing) is all about data analysis using large amounts of data, as well as complex queries that take a long time to complete.

OLAP applications need datastores that support high throughput reads on a large number of (read-only) records.

Examples:
- **Net Profit Analysis**: You have been asked to produce a report comparing net profits for car sales in 3 different regions.
- **Large Amounts of Data**:
  - Sum of cars sold in each region
  - Unit cost for each region
  - Sales price of each car
  - Sales price compared to the unit cost
