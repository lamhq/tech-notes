## Scaling

You can scale relational database by:

## Vertical scaling
- Increase database size for greater performance.
- Scaling compute will cause downtime.


## Scaling storage

- Increase storage size.
- You can scale storage and change the storage type for all DB engines except MS SQL. The workaround is to create a new instance from a snapshot with the new configuration.
- Scaling storage can happen while the RDS instance is running without outage however there may be performance degradation.
- You can choose to have changes take effect immediately, default is within the maintenance window.
- All RDS DB types support a maximum DB size of **64 TiB** except for MS SQL (**16 TiB**).


## Horizontal scaling

- Create [read replicas](./read-replicas.md) for scaling read performance.

## Using Aurora serverless

- offload scaling to AWS
- Good for unpredictable workloads.