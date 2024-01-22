# Monitoring and Reporting

The Amazon EFS console shows the following monitoring information for your file systems:

- The current metered size.
- The number of mount targets.
- The lifecycle state.

Amazon EFS reports metrics for Amazon CloudWatch.  A few useful metrics are:

- `TotalIOBytes`: use the daily Sum statistic to determine throughput.
- `ClientConnections`: use the daily Sum statistic to track the number of connections from EC2 instances.
- `BurstCreditBalance`: monitor the burst credit balance.
