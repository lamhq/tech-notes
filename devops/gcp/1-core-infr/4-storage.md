# Storage in the Cloud

## Cloud Storage

### Cloud Storage

A service that offers durable and highly available object storage.

It's a fully managed scalable service.

Has no minimum fee, pay only for what you use. 

From a security perspective, Cloud Storage always encrypts data on the server side, before it's written to disk.


### Versioning

The storage objects offered by Cloud Storage are immutable. Administrators have the option to either allow each new version to completely overwrite the older one, or to keep track of each change made to a particular object by enabling "versioning" within a bucket. If you don't turn on object versioning, by default new versions will always overwrite older versions.

### Access control

There are a couple of options to control user access to objects and buckets. For most purposes, IAM is sufficient. 

Roles are inherited from project to bucket to object.

If you need finer control, you can create access control lists. Each access control list consists of two pieces of information:

- Scope: who can access and perform an action (user or group)
- Permission: what actions can be performed (read or write).

### Lifecycle policies

Examples:
- Delete objects older than 365 days
- Delete objects created before January 1, 2013
- Keep only the 3 most recent versions

Having this control ensures that you're not paying for more than you actually need.


### Data transfer

Data traveling between a customer's device and Google is encrypted by default using HTTPS/TLS.

Ways to bring data into Cloud Storage:

- gsutil: Cloud Storage command from the Cloud SDK
- Cloud Console, accessed through the Google Chrome web browser
- Storage Transfer Service enables you to import large amounts of online data into Cloud Storage quickly and cost-effectively. From another cloud provider, from a different Cloud Storage region, or from an HTTP(S) endpoint.
- Transfer Appliance, which is a rackable, high-capacity storage server that you lease from Google Cloud. You connect it to your network, load it with data, and then ship it to an upload facility where the data is uploaded to Cloud Storage. You can transfer up to a petabyte of data on a single appliance.


## Cloud SQL

Cloud SQL offers fully managed relational databases, including MySQL, PostgreSQL, and SQL Server as a service.

- Doesn't require any software installation or maintenance
- Can scale up to 64 processor cores, 400 plus gigabytes of RAM, and 30 terabytes of storage
- Supports automatic replication scenarios
- Supports managed backups. The cost of an instance covers 7 backups
- Encrypts customer data when on Google's internal networks and when stored in database tables, temporary files and backups
- Includes a network firewall.

Cloud SQL intances are accessible by other Google Cloud and external services.

Compute Engine instances can be authorized to access Cloud SQL instances and configure the Cloud SQL instance to be in the same zone as your virtual machine.

Cloud SQL also supports other applications and tools that you might use like SQL Workbench, Toad, and other external applications using standard MySQL drivers.


## Cloud Spanner

Cloud Spanner is a fully managed relational database service.

- scales horizontally
- strongly consistent
- speaks SQL

Cloud Spanner is especially suited for applications that require:
- SQL relational database management system with joins and secondary indexes
- Built-in high availability
- Strong global consistency
- High numbers of input/output operations per second


## Firestore

Firestore is a flexible, horizontally scalable, NoSQL cloud database for mobile, web, and server development.

Data is stored in documents and then organized into collections. Documents can contain complex nested objects in addition to subcollections.

Firestore's NoSQL queries:
- Retrieve individual documents 
- Retrieve all the documents in a collection
- Can include multiple, chained filters
- Can combine filtering and sorting options
- Indexed by default. Query performance is proportional to the size of the result set, not the dataset.

Firestore uses data synchronization to update data on any connected device. It caches data so the app can write, read, listen to, and query data even if the device is offline. When the device comes back online, Firestore synchronizes any local changes back to Firestore.

- Automatic multi-region data replication
- Strong consistency guarantees
- Atomic batch operations
- Real transaction support

You're charged for:

- Reading, writing, and deleting documents
- Queries, which are counted as one document read
- The amount of database storage used
- The amount of network bandwidth used

You can use Google's Billing Calculator to estimate prices for your particular use case.

In addition to the 10GiB of free network egress per month between US regions, Firestore has a free quota per day of: 50,000 document reads 20,000 document writes 20,000 document deletes, and, 1 GB of stored data Charges only begin once the free daily quota has been exceeded.


## Cloud Bigtable

Cloud Bigtable is Google's NoSQL Big data database service.

- Handle massive workloads 
- Consistent low latency
- High throughput

Great choice for:
- operational applications
- analytical applications including internet of things, user analytics, and financial data analysis.

Customers often choose Bigtable if:
- they work with more than 1TB of semi-structured or structured data.
- data is fast with high throughput or it's rapidly changing
- they work with NoSQL data
- data is a time-series or has natural semantic ordering
- they work with bug data, running asynchronous batch or synchronous real-time processing on the data
- they run machine learning algorithms on the data

Cloud Bigtable can interact with other Google Cloud services and third-party clients. 

Data can also be streamed in through a variety of popular stream processing frameworks like data flow streaming, spark streaming, and storm.

Data can also be read from and written to Cloud Bigtable through batch processes like Hadoop MapReduce, Dataflow, or Spark.

## Comparing storage options

| Option | Best for | Capacity |
|---|---|---|
| Cloud Storage | string immutable blobs larger than 10 MB | Petabytes<br/> Max unit size: 5 TB per object |
| Cloud SQL | - Full SQL support for an online transaction processing system <br/> - Web frameworks and existing applications | up to 64 TB |
| Spanner | - Full SQL support for an online transaction processing system <br/> - Horizontal scalability | Petabytes |
| Firestore | Massive scaling and predictability together with real time query results and offline query support | Terabytes <br/> Max unit size: 1 MB per entity |
| Bigtable | - Storing large amount of structured objects <br/>- Does not support SQL queries and multi-row transactions <br/>- Analytical data with heavy read and write events" | Petabytes <br/> Max unit size: 10 MB/cell, 100 MB/row |


## Quiz

1. Which statement describes the correct Cloud Storage use case?
    > Cloud Storage provides durable and highly available object storage.

2. Why would a customer consider the Coldline Storage class?
    > To save money on storing infrequently accessed data

3. Which database service can scale to higher database sizes?
    > Cloud Spanner

4. How are Firestore and Bigtable alike?
    > They are both highly scalable.
    > They are both NoSQL databases.

5. You manufacture devices with sensors and need to stream huge amounts of data from these devices to a storage option in the cloud. Which storage option is the best choice for your application?
    > Bigtable

6. Your application needs to store data with strong transactional consistency, and you want seamless scaling up. Which storage option is the best choice for your application?
    > Cloud Spanner