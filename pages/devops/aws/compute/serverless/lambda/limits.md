# Limitations

## Compute and storage

- 1,000 concurrent executions (1000 instances)
- 512 MB - 10 GB disk storage (`/tmp`)
- Can integrate with EFS if needed (require VPC configuration). This enables multiple functions to access the same file system
- Environment variables have size limit of 4 KB in total
- 128 MB - 10 GB memory allocation
- Can run for up to 900 seconds (15 minutes). For anything longer, use ECS, Batch or EC2.


## Deployments and Configuration

- Compressed deployment package (`.zip`) size must be ≤ 50 MB
- Uncompressed deployment package (unzipped) must be ≤ 250
MB
- If you have a large deployment package,
you should upload that to an Amazon S3 bucket,
and configure your function to reference that for its code
- Request and response payload sizes up to 6 MB
- Streamed responses up to 20 MB
