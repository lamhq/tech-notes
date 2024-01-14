# Pricing

Your're charged for:
- DB instance hours (partial hours are charged as full hours).
Storage GB/month.
- I/O requests/month – for magnetic storage.
- Provisioned IOPS/month – for RDS provisioned IOPS SSD.
- Egress data transfer.
- Backup storage (DB backups and manual snapshots).

AWS replicate data across multiple AZs and so you are charged for the extra storage space on S3.

Backup storage for the automated RDS backup is free of charge up to the provisioned EBS volume size.

> For example, if you have an RDS instance with a 100 GB EBS volume, then the backup storage for automated RDS backups is free up to 100 GB. If you exceed the provisioned EBS volume size, then you will be charged for the additional storage used by the backups.

## Multi-AZ

For multi-AZ you are charged for:
- Multi-AZ DB hours.
- Provisioned storage.
- Double write I/Os.

You are not charged for DB data transfer during replication from primary to standby.


## License

Oracle and Microsoft SQL licenses are included, or you can bring your own (BYO).


## Reserved instances
On-demand and reserved instance pricing is available.

Reserved instances are defined based on the following attributes which must not be changed:
- DB engine.
- DB instance class.
- Deployment type (standalone, multi-AZ_).
- License model.
- Region.

Reserved instances:
- Can be moved between AZs in the same region.
- Are available for multi-AZ deployments.
- Can be applied to Read Replicas if DB instance class and region are the same.
- Scaling is achieved through changing the instance class for compute and modifying storage capacity for additional storage allocation.