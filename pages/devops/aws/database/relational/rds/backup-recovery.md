# Backup and Recovery

## Maintenance windows

Maintenance windows are configured to allow DB instances modifications to take place such as scaling and software patching (some operations require the DB instance to be taken offline briefly).

You can define the maintenance window or AWS will schedule a 30-minute window.


## Snapshot

You can take EBS volume **snapshots** of your database instances.

Snapshots enable you to back up your DB instance in a known state as frequently as you wish, and then restore (to a new instance) to that specific state.

Snapshots include all databases on the instance and are stored in **S3**.

Snapshots are kept in multiple zones in the same region for redundancy.

Taking a snapshot suspends all I/O operations for a few seconds (in single-AZ). Be sure to do it during off-peak times.

The time to restore a snapshot can take several minutes, depending on its size. The more provisioned IOPS you allocate to your new instance, the faster the recovery time.

Can restore up to the last 5 minutes.

Snapshots can be shared with other AWS accounts.

DB Snapshots are user-initiated.

Cannot be used for point-in-time recovery.

Snapshots remain on S3 until manually deleted.


## Automated Snapshots

Automated backups and patching are applied in customer-defined maintenance windows.

Enabling automatic backups enables **point-in-time recovery**, which archives database change logs to S3 every 5 minutes. Restoring to a point-in-time can take hours, depending on how much data is in the transaction logs.

RDS keeps automated snapshots for a limited period of time and then deletes them. The retention period is between 1 day and 35 days, default is 7 days, 0 to disable.

You can also manually take a snapshot of your database instance.
