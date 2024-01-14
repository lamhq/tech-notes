# Database Instance & Storage

## Database Instance

A DB instance is a database environment in the cloud with the compute and storage resources you specify.

AWS fully manages database instances. You can't connect to them using SSH, and they don’t show up under your EC2 instances.

Database instances are accessed via endpoints (retrieved via the DB instance description).

By default, customers are allowed to have up to a total of **40** instances (only 10 of these can be Oracle or MS SQL unless you have your own licenses).


## Database Instance Classes

When you create your DB instance, you choose the instance class (processing power, memory, network bandwidth, disk throughput).

Amazon RDS supports three **instance classes**:
- **Standard**: meet the needs of most databases
- **Memory Optimized**: optimized for memory-intensive applications (3,904 GB of memory)
- **Burstable Performance**: for development, test, nonproduction databases

You can switch your instance to a different class


## Instance Storage

Amazon RDS uses EBS volumes for DB and log storage.

You can choose between three storage types:

### General purpose SSD (gp2)

- Use for Database workloads with moderate I/O requirement.
- Cost effective.
- 3 IOPS/GB.
- Burst up to 3000 IOPS.
- The larger your volume, the better performance you’ll get, minimum 20 GB

### Provisioned IOPS SSD (io1)

- Use for I/O intensive workloads.
- Low latency and consistent I/O.
- User specified IOPS (see table below).

| Database Engine | Range of Provisioned IOPS  | Range of Storage |
|---|---|---|
| MariaDB | 1,000-80,000 IOPS | 100 GiB-64TiB |
| SQL Server | 1,000-64,000 IOPS | 20 GiB-16TiB |
| MySQL | 1,000-80,000 IOPS | 100 GiB-64TiB |
| Oracle | 1,000-256,000 IOPS | 100 GiB-64TiB |
| PostgreSQL | 1,000-80,000 IOPS | 100 GiB-64TiB |


### Magnetic storage (not recommended)

- Not recommended anymore, available for backwards compatibility.
- Doesn’t allow you to scale storage when using the SQL Server database engine.
- Doesn’t support elastic volumes.
- Limited to a maximum size of 4 TiB.
- Limited to a maximum of 1,000 IOPS.
