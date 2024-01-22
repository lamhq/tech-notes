# Monitoring

Amazon EBS sends data points to CloudWatch for several metrics.


## Important metrics

A few specific metrics to understand for the exam:

DiskReadBytes / DiskWriteBytes:
- Relates to **Instance Store volumes** NOT to EBS.
- Included in the AWS/EC2 namespace.

VolumeReadBytes / VolumeWriteBytes:
- Relates to the EBS volume.
- Included in the AWS/EBS namespace.


## Metric types

There are two types of Amazon CloudWatch monitoring available for Amazon EBS volumes:

- Basic: Data is available automatically in **5-minute** periods at no charge. This includes data for the root device volumes for EBS-backed instances.
- Detailed: Provisioned IOPS SSD (io1) volumes automatically send **one-minute** metrics to CloudWatch.

Amazon EBS General Purpose SSD (gp2), Throughput Optimized HDD (st1) , Cold HDD (sc1), and Magnetic (standard) volumes automatically send **five-minute** metrics to CloudWatch.

Provisioned IOPS SSD (io1) volumes automatically send **one-minute** metrics to CloudWatch. Data is only reported to CloudWatch when the volume is attached to an instance.


## Status checks

Volume status checks enable you to better understand, track, and manage potential inconsistencies in the data on an Amazon EBS volume.

| Volume Status | I/O Enabled Status | I/O performance status (only available for Provisioned IOPS volumes) |
|---|---|---|
| ok | Enabled (I/O Enabled or I/O Auto-Enabled) | Normal (Volume performance is expected) |
| warning | Enabled (I/O Enabled or I/O Auto-Enabled). <br/><br/> Disabled (Volume is offline and pending recovery or is waiting for the user to enable I/O). | Degraded (Volume performance is below expectations) <br/><br/> Severely Degraded (Volume performance is well below expectations) |
| impaired | Enabled (I/O Enabled or I/O Auto-Enabled) <br/><br/> Disabled (Volume is offline and pending recovery, or is waiting for the user to enable I/O) | Stalled (Volume performance is severely impacted) <br/><br/> Not Available (Unable to determine I/O performance because I/O is disabled) |
| insufficient-data | Enabled (I/O Enabled or I/O Auto-Enabled) <br/><br/> Insufficient Data | Insufficient Data |
