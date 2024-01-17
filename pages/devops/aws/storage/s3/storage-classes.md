# Storage Classes

There are six S3 storage classes:

## S3 Standard

- Frequently accessed data.
- 99.99% availability and 11 9's durability.
- Data is stored across multiple devices in multiple facilities (>= 3 AZs).
- Higher cost than other storage classes.
- Default storage class.
- Suitable for most workloads: websites, content distribution, mobile, gaming applictions, big data analytics.


## S3 Standard-Infrequent Access (S3 Standard-IA)

- Long-term, infrequently accessed critical data but require rapid access.
- 99.9% availability and 11 9's durability.
- Has a lower storage price and higher **retrieval price**.
- Backups, data store for disaster recovery files, etc.


## S3 One Zone-Infrequent Access (S3 One Zone-IA)

- Same as Standard-IA, data is stored redundantly within a single AZ.
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


## Glacier

Glacier is an archiving storage solution for infrequently accessed data.

![](https://d1.awsstatic.com/reInvent/re21-pdp-tier1/s3/s3-glacier-overview.0d570958d5161d19059c7dee00865500c1470256.png)

- Cheap storage.
- For data that is very infrequently access.
- Use only for archiving data for long terms.
- Pay each time you access your data.
- Charges if you delete data within 90 days.
- Archived objects are not available for real time access and you need to submit a retrieval request.
- Archives can be 1 byte up to **40TB**.
- Requested archival data is copied to **S3 One Zone-IA**.
- Retrieved data is available for 24 hours by default (can be changed).
- You can retrieve parts of an archive.
- Cannot specify Glacier as the storage class at the time object is created.
- May not be available in all AWS regions.
- Glacier archive IDs are added upon upload and are unique for each upload.
- Glacier does not archive object metadata; you need to maintain a client-side database to maintain this information.
- AWS SNS can send notifications when retrieval jobs are complete.

Archive retrieval:
- **Expedited** is 1-5 minutes retrieval (most expensive).
- **Standard** is 3.5 hours retrieval (cheaper, 10GB data retrieval free per month).
- **Bulk retrieval** is 5-12 hours (cheapest, use for large quantities of data).

When you restore you pay for:
- The Glacier archive.
- The retrieval requests.
- The restored data on S3.


### S3 Glacier Instant Retrieval

- For archived data that requires immediate access.
- Data retrieval in milliseconds (same as S3 Standard)
- 99.9% data availability and 11 9's durability.
- 128 KB minimum object size


### S3 Glacier Flexible Retrieval

- Ideal for backup and disaster recovery use cases when retrieving large sets of data in minutes at no costs
- Low-cost storage designed for data archiving
- Configurable retrieval times, from minutes to 3-5 hours, with free bulk retrievals
- 11 9's durability
- Example: store archived customer records or older photos and video files.


### S3 Glacier Deep Archive

- Ideal alternative to magnetic tape libraries
- Lowest cost storage class designed for long-term retention of data that will be retained for 7-10 years
- Retrieval times within 12 hours, bulk retrieval time is 48 hours.
- 99.99% availability and 11 9's durability.
- For data that might be accessed once or twice in a year.
