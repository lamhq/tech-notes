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


## S3 Limitations when using KMS

If you are using SSE-KMS to encrypt/decrypt your objects in S3, you must keep in mind the KMS limits.

Uploading/downloading will count toward the **KMS quota**.

You can't request a quota increase for KMS. You might want to consider using the native bult-in S3 encryption than KMS.

> When you upload a file, you will call `GenerateDataKey` in the KMS API. When you download a file, you will call `Decrypt` in the KMS API.

The KMS's limits is Region-specific. (5,500 or 10,000 or 30,000 requests per second). This makes your upload/download much slower when reaching the limits.


## Uploads

Multipart Uploads:
- Allow you to parallelize your uploads (split into parts and parallel upload)
- Recommended for files over 100 MB
- Required for files over 5 GB


## Download

S3 Byte-Range Fetches
- Parallelize download by specifying byte ranges (split file into chunks and download them at the same time)
- If there's a failure, it's only for a specific byte range.