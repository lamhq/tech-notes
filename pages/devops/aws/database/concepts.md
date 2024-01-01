# Concepts

## Relational databases

In a relational database, data is stored in a way that relates it to other pieces of data. 

Relational databases use structured query language (SQL) to store and query data.


## OLTP (Online Transaction Processing)

OLTP is all about data processing and completing large numbers of small transactions in real time.

Examples: customer orders, banking transactions, payments, and booking systems.


## OLAP (Online Analytical Processing)

OLAP is all about data analysis using large amounts of data, as well as complex queries that take a long time to complete.

Examples:
- **Net Profit Analysis**: You have been asked to produce a report comparing net profits for car sales in 3 different regions.
- **Large Amounts of Data**:
  - Sum of cars sold in each region
  - Unit cost for each region
  - Sales price of each car
  - Sales price compared to the unit cost


## Read consistency

### Eventually consistent reads

Consistency across all copies of data is usually reached within a second.

Repeating a read after a short time should return the updated data. Best read performance.

### Strongly consistent reads

A strongly consistent read returns a result that reflects all writes that received a successful response prior to the read (you don't need to wait).


## High Availability Approaches for Databases

If possible, choose DynamoDB over RDS because of inherent fault tolerance.

If DynamoDB can’t be used, choose Aurora because of redundancy and automatic recovery features.

If Aurora can’t be used, choose Multi-AZ RDS.

Frequent RDS snapshots can protect against data corruption or failure, and they won’t impact performance of Multi-AZ deployment.

Regional replication is also an option but will not be strongly consistent.

If the database runs on EC2, you must design the HA yourself.