# RAID

RAID can be used to increase IOPS.

`RAID 0` = 0 striping: data is written across multiple disks and increases performance but no redundancy.

`RAID 1` = 1 mirroring: creates 2 copies of the data but does not increase performance, only redundancy.

`RAID 10` = 10 combination of RAID 1 and 2, resulting in increased performance and redundancy (at the cost of additional disks).

EBS optimized EC2 instances are another way of increasing performance. You must ensure the EC2 instance can handle the bandwidth required for the increased performance. Use EBS optimized instances or instances with a 10 Gbps network interface.

Not recommended to use RAID for root/boot volumes.

To take application-consistent snapshots of RAID arrays:
- Stop the application from writing to disk.
- Flush all caches to the disk.
- Freeze the filesystem.
- Unmount the RAID array.
- Shut down the associated EC2 instance.