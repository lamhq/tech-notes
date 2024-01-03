# Storage Classes

S3 storage classes let you change your storage tier as your data characteristics change.

When selecting an Amazon S3 storage class, consider these two factors:

- How often you plan to retrieve your data
- How available you need your data to be

There are six S3 storage classes.


## S3 Standard

- Frequently accessed data.
- High availability (99.99%) and durability (11 9's).
- Data is stored across multiple devices in multiple facilities (>= 3 AZs).
- Higher cost than other storage classes.
- Default storage class.
- Suitable for most workloads: websites, content distribution, mobile, gaming applictions, big data analytics.


## S3 Standard - Infrequent Access (S3 Standard-IA)

- Long-term, infrequently accessed critical data but require rapid access.
- 99.9% availability and 11 9's durability.
- You pay to access the data. Has a lower storage price and higher retrieval price.
- Backups, data store for disaster recovery files, etc.


## S3 One Zone - Infrequent Access (S3 One Zone-IA)

- Long-term, infrequently accessed, non-critical data
- Like S3 Standard-IA, but data is stored within a single AZ.
- Cost 20% less than S3 Standard-IA
- 99.5% availability and 11 9's durability.
- Storing secondary backup copies of on-premises data or easily re-creatable data.
- Good for saving costs on storage.


## S3 Intelligent-Tiering

- Ideal for data with unknown or changing access patterns
- Automatically moves data to the most cost-effective tier (based on how frequently you access each object).
- 99.9% availability and 11 9's durability.
- No retrieval charges.
- Requires a small monthly monitoring and automation fee per object (0.0025 cents per 1,000 objects).
- Good for optimizing cost.
- Objects smaller than 128 KB are not eligible for automatic tiering.

> If you haven’t accessed an object for 30 consecutive days, Amazon S3 automatically moves it to the infrequent access tier, Amazon S3 Standard-IA.
>
> If you access an object in the infrequent access tier, Amazon S3 automatically moves it to the frequent access tier, Amazon S3 Standard.

![](https://d1tcczg8b21j1t.cloudfront.net/strapi-assets/24_S3_intelligent_tiering_2_e6a3b0ed51.png)


## 3 Glacier options

![](https://d1.awsstatic.com/reInvent/re21-pdp-tier1/s3/s3-glacier-overview.0d570958d5161d19059c7dee00865500c1470256.png)

- Cheap storage.
- Use only for archiving data for long terms.
- You **pay each time you access your data**.
- For data that is very infrequently access.

### S3 Glacier Instant Retrieval

- For archived data that requires immediate access.
- Can retrieve objects within a few milliseconds (same as S3 Standard)


### S3 Glacier Flexible Retrieval

- For archived data that does not require immediate access but needs the flexibility to **retrieve large sets of data at no cost** (backup or disaster recovery).
- Low-cost storage designed for data archiving
- Standard retrieval time of 3-5 hours, but also supports expedited retrievals in as little as 1-5 minutes.
- Example: store archived customer records or older photos and video files.


### S3 Glacier Deep Archive

- Long-term data archiving with retrieval times within 12 hours, bulk retrieval time is 48 hours.
- Cheapest storage class
- 99.99% availability and 11 9's durability.
- Data is stored across multiple devices in multiple facilities (>= 3 AZs).
- Designed for customers that retain data sets for 7-10 years
- For data that might be accessed once or twice in a year.
