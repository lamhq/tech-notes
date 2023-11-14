# Storage Classes

S3 storage classes let you change your storage tier as your data characteristics change.

When selecting an Amazon S3 storage class, consider these two factors:

- How often you plan to retrieve your data
- How available you need your data to be

> For example, if you are now accessing your old photos infrequently, you may want to change the storage class those photos are stored in to save on costs.

There are six S3 storage classes:

## S3 Standard

High availability and durability.
- Data is stored across multiple devices in multiple facilities (>= 3 AZs).
- 99.99% availability and 11 9's durability.

Has a higher cost than other storage classes.

Designed for frequently accessed data:
- Default storage class.
- Suitable for most workloads: websites, content distribution, mobile, gaming applictions, big data analytics.


## S3 Standard-Infrequent Access (S3 Standard-IA)

- Similar to S3 Standard. Ideal for infrequently accessed data but give you rapid access.
- 99.9% availability and 11 9's durability.
- You pay to access the data. Has a lower storage price and higher retrieval price.
- Great for long-term storage, backups, data store for disaster recovery files.


## S3 One Zone-Infrequent Access (S3 One Zone-IA)

- Like S3 Standard-IA, but data is stored within a single AZ.
- Cost 20% less than S3 Standard-IA
- Great for long-lived, infrequently accessed, non-critical data
- 99.5% availability and 11 9's durability.

Storing secondary backup copies of on-premises data or easily re-creatable data.

Good storage class to consider if the following conditions apply:

- You want to save costs on storage.


## S3 Intelligent-Tiering

Automatically moves data to the most cost-effective tier based on how frequently you access each object (by using machine learning).

99.9% availability and 11 9's durability.

No retrieval charges. Requires a small monthly monitoring and automation fee per object (0.0025 cents per 1,000 objects).

Good for optimizing cost. Ideal for data with unknown or changing access patterns

Objects smaller than 128 KB are not eligible for automatic tiering.

> If you haven’t accessed an object for 30 consecutive days, Amazon S3 automatically moves it to the infrequent access tier, Amazon S3 Standard-IA.
>
> If you access an object in the infrequent access tier, Amazon S3 automatically moves it to the frequent access tier, Amazon S3 Standard.

![](images/int-tiering.png)


## 3 Glacier options

- Cheap storage.
- Use only for archiving data for long terms.
- You pay each time you access your data.
- For data that is very infrequently access.


### S3 Glacier Instant Retrieval

- For archived data that requires immediate access.
- Can retrieve objects within a few milliseconds (same as S3 Standard)


### S3 Glacier Flexible Retrieval

- For archived data that does not require immediate access but needs the flexibility to retrieve large sets of data at no cost (backup or disaster recovery).
- Low-cost storage designed for data archiving
- Can retrieve objects within minutes or up to 12 hours.
- Example: store archived customer records or older photos and video files.


### S3 Glacier Deep Archive

- Cheapest storage class
- Designed for customers that retain data sets for 7-10 years
- Standard retrieval time is 12 hours, bulk retrieval time is 48 hours.
- 99.99% availability and 11 9's durability.
- Data is stored across multiple devices in multiple facilities (>= 3 AZs).
- For data that might be accessed once or twice in a year.

![](images/s3-glacier.png)
