# Replication with Amazon Aurora

## Replication options

3 types of Aurora Repicas available:
- **Aurora Replicas**. 15 read replicas with Aurora. Include automatic failover feature
- **MySQL Replicas**. 5 read replicas with Aurora MySQL
- **PostgreSQL**. 5 read replicas with Aurora PostgreSQL

| Feature | Aurora Replica | MySQL Replica |
|---|---|---|
| Number of replicas | Up to 15 | Up to 5 |
| Replication type | Asynchronous (milliseconds) | Asynchronous (seconds) |
| Performance impact on primary | Low | High |
| Replica location | In-region | Cross-region |
| Act as failover target | Yes (no data loss) | Yes (potentially minutes of data loss) |
| Automated failover | Yes | No |
| Support for user-defined replication delay | No | Yes |
| Support for different data or schema vs. primary | No | Yes |


## Cross-Region Read Replicas

Cross-region read replicas allow you to:
- improve your disaster recovery posture
- scale read operations in regions closer to your application users
- easily migrate from one region to another.

Each region can have an additional 15 Aurora replicas to further scale local reads.

You can choose between Global Database (provides the best replication performance), and traditional binlog-based replication.

![](https://digitalcloud.training/wp-content/uploads/2022/01/aurora-cross-region-replica.jpeg)
