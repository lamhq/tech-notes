# Optimizing S3 Performance

## S3 prefixes

S3 prefix is the folders inside our buckets.

- `mybucketname/folder1/subfolder1/myfile.jpg` > `/folder1/subfolder1`
- `mybucketname/folder2/subfolder1/myfile.jpg` > `/folder2/subfolder1`
- `mybucketname/folder3/myfile.jpg` > `/folder3`
- `mybucketname/folder4/subfolder4/myfile.jpg` > `/folder4/subfolder4`

With S3, you can achive a high number of requests: 3,500 `PUT/COPY/POST/DELETE` requests and 5,500 `GET/HEAD` requests per second per prefix.

The more prefixes that you have inside your S3 buckets,
the higher performance you're going to be able to get.
You can get better performance by spreadinf your reads across **different prefixes**.

> For example, if you're using 2 prefixes, you can achieve 11,000 request per second.


## Uploads

The largest object that can be uploaded in a single PUT is **5 GB**.

HTTP 200 code indicates a successful write to S3.

### Multipart Uploads

- Allow you to parallelize your uploads (split into parts and parallel upload)
- Recommended for files over 100 MB
- Required for files over 5 GB
- If transmission of any part fails it can be retransmitted
- Can pause and resume object uploads.
- Can begin upload before you know the final object size.


### Transfer Acceleration

Amazon S3 Transfer Acceleration enables **fast, easy, secure** transfers of files over long distances between your client and an S3 bucket.

S3 Transfer Acceleration leverages Amazon CloudFront’s globally distributed AWS Edge Locations.

You are charged only if there was a benefit in transfer times.

Need to be enabled per bucket. Cannot be disabled, can only be suspended.

May take up to 30 minutes to implement.

Can be used together with multipart uploads.

HIPAA compliant.

Bucket names must be DNS compliance and cannot have periods between labels.

Must use one of the following endpoints:
- `.s3-accelerate.amazonaws.com`.
- `.s3-accelerate.dualstack.amazonaws.com (dual-stack option)`.

Use cases:
- Accelerate object uploads to S3 over long distances (latency).
- Transfer gigabytes to terabytes of data on a regular basis across continents.
- You can't use all of your available bandwidth over the internet when uploading to Amazon S3.


## Download

Use Byte-Range Fetches:
- Parallelize download by specifying byte ranges using the `Range` HTTP header in GET requests
- Allows your application to improve retry times when requests are interrupted.