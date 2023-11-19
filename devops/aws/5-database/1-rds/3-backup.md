# Back Up Your Data

## Automatic backups

Automated backups are turned on by default. 

This backs up your entire DB instance (not just individual databases on the instance), and your transaction logs.

When you create your DB instance, you set a period of time that automatic backups occur. Typically, you want to set these windows during a time when your database experiences little activity because it can cause increased latency and downtime.

You can retain your automated backups between 0 and 35 days.

The 0 days setting actually disables automatic backups from happening. Keep in mind that if you set it to 0, it will also delete all existing automated backups. This is not ideal, as the benefit of having automated backups is having the ability to do point-in-time recovery.

If you restore data from an automated backup, you have the ability to do point-in-time recovery. Point-in-time recovery creates a new DB instance using data restored from a specific point in time. This restoration method provides more granularity by restoring the full backup and rolling back transactions up to the specified time range.

## Manual snapshots

If you want to keep your automated backups longer than 35 days, use manual snapshots.

Manual snapshots are similar to taking EBS snapshots, except you manage them in the RDS console.

These are backups that you can initiate at any time, that exist until you delete them.

If you restore data from a manual snapshot, it creates a new DB instance using the data from the snapshot.

## Which Backup Option Should I Use?

The answer, almost always, is both. Automated backups are beneficial for the point-in-time recovery. Manual snapshots allow you to retain backups for longer than 35 days. 
