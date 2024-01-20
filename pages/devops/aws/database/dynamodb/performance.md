# Performance and Optimization

## Throttling

Throttling occurs when the configured RCU or WCU are exceeded.

`ProvisionedThroughputExceededException` error indicates that your request rate is too high for the read / write capacity provisioned for the table. The AWS SDKs for DynamoDB automatically retry requests that receive this exception.

Possible causes of performance issues:

- Hot keys – one partition key is being read too often.
- Hot partitions – when data access is imbalanced, a “hot” partition can receive a higher volume of read and write traffic compared to other partitions.
- Large items – large items consume more RCUs and WCUs.


Resolution:

- Reduce the frequency of requests and use exponential backoff.
- Try to design your application for uniform activity across all logical partition keys in the table and its secondary indexes.
- Use burst capacity effectively – DynamoDB currently retains up to 5 minutes (300 seconds) of unused read and write capacity which can be consumed quickly.


## Exponential backoff

When a request to a server fails, request will be retried after a certain amount of time.

If the request fails again, it will waits for a longer period of time before retrying.

The waiting time between retries increases exponentially with each failed attempt.

In addition to simple retries all AWS SDKs use Exponential Backoff.


## DynamoDB Accelerator (DAX)

Fully managed, highly available, in-memory cache

10× read performance improvement than using just DynamoDB on its own (microseconds)

You do not need to modify application logic, since DAX is compatible with existing DynamoDB API calls.

Provides managed cache invalidation, data population, and cluster management.

Provisioned through clusters and charged by the node.

Is not designed for applications that are write-intensive.

Run within an Amazon VPC.

Use write-through caching: data is written to the cache as well as the back-end store at the same time.

Full control. You determine the node size and count for the cluster, TTL for the data, and maintenance windows for changes and updates

![](https://d1.awsstatic.com/product-marketing/DynamoDB/dax_high_level.e4af7cc27485497eff5699cdf22a9502496cba38.png)


### How it work?

- You to point your DynamoDB API calls at the DAX cluster.
- If the item is in the cache (cache hit), DAX returns the result to the application.
- If the item requested is not in the cache (cache miss) then DAX performs an Eventually Consistent `GetItem` operation against DynamoDB


### Pricing

Nodes run on EC2 instances.

Pricing is per node-hour consumed and is dependent on the instance type you select.
