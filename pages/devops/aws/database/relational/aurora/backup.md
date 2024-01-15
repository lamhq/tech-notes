# Backup and Restore

There are two methods to backup and restore RDS DB instances:

- Amazon RDS automated backups.
- User initiated manual backups.

Both options create a storage volume snapshot of the entire DB instance.

You can make copies of automated backups and manual snapshots.


## Automated backups

Automated backups are always enabled. You can disable automated backups by setting the retention period to zero (0).

Automated backups enables point-in-time recovery for your instance (up to 5 minutes).

Backups are automatic, incremental, and continuous.

Backups have no impact on database performance.

Automatic backup retention period can be configured up to 35 days, default is 7 days .

When automated backups are turned on for your DB Instance, Amazon RDS automatically performs a full daily snapshot of your data (during your preferred backup window) and captures transaction logs (as updates to your DB Instance are made).

You can choose the backup window.

During the backup window I/O may be suspended.

Automated backups are stored in Amazon S3, equal to DB size. There is no additional charge for backups, but you will pay for storage costs on S3.

Automated backups backup data to multiple AZs to provide for data durability.

Automated backups are only supported for InnoDB storage engine for MySQL (not for myISAM).

Multi-AZ backups are taken from the standby instance (for MariaDB, MySQL, Oracle, and PostgreSQL).

The DB instance must be in an Active state for automated backups to happen.

Automated backups are deleted when you delete the RDS DB instance.


## Snapshot

Snapshots taking does not impact on performance.

You can share Aurora snapshots with other AWS accounts.

Amazon RDS creates a daily full storage volume snapshot and captures transaction logs regularly.


## Restore

You cannot restore from a DB snapshot into an existing DB instance.

After restoring, the new DB instance will have a new endpoint.

The storage type can be changed when restoring a snapshot.