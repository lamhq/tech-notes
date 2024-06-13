# Databases on AWS

## Use cases

### Database on EC2

- Ultimate control over database
- Preferred DB not available under RDS

### Amazon RDS

- Need traditional relational database for OLTP
- Your data is well formed and structured
- Existing apps requiring RDBMS


### Amazon DynamoDB

- Name/value pair data or unpredictable data structure
- In-memory performance with persistence
- High I/O needs
- Scale dynamically


### Amazon RedShift

- Massive amounts of data
- Primarily OLAP workloads


### Amazon Neptune

- Relationships between objects a major portion of data value


### Amazon Elasticache

Fast temporary storage for small amounts of dataHighly volatile data


### Amazon S3

- Lots of large binary objects (BLOBs)
- Static Websites


## High Availability Approaches for Databases

If possible, choose DynamoDB over RDS because of inherent fault tolerance.

If DynamoDB can’t be used, choose Aurora because of redundancy and automatic recovery features.

If Aurora can’t be used, choose Multi-AZ RDS.

Frequent RDS snapshots can protect against data corruption or failure, and they won’t impact performance of Multi-AZ deployment.

Regional replication is also an option but will not be strongly consistent.

If the database runs on EC2, you must design the HA yourself.