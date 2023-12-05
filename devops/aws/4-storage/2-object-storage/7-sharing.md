# Temporarily Sharing S3 Objects Using Presigned URLs or Cookies

## All objects in S3 are private by default

Only the object owner has permission to access these objects.

However, the object owner can optionally share objects with others by creating a presigned URL, using their own security credentials, to grant time-limited permission to download the objects.


## Presigned URLs

When you create a presigned URL for your object, you must provide your security credentials, specify a bucket name and an object key, and indicate the HTTP method (or GET to download the object) as well as expiration date and time.

The presigned URLs are valid only for the specified duration. Anyone who receives the presigned URL can then access the object.

For example, if you have a video in your bucket and both the bucket and the object are private, you can share the video with others by generating a presigned URL.

You can create resigned urls using aws cli with the command: `aws s3 presign`.


## Presigned Cookies

This can be useful when you want to provide access to multiple restricted files.

The cookie will be saved on the user's computer, and they will be able to browse the the entire contents of the restricted content.