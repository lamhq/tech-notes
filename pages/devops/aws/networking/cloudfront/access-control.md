# Access control

CloudFront signed URLs and signed cookies provide the same basic functionality: they allow you to control who can access your content. 

## Cloudfront signed URLs

A signed URL includes additional information, for example, an expiration date and time, that gives you more control over access to your content.

Use signed URLs in the following cases:

- You want to restrict access to individual files, for example, an installation download for your application.
- Your users are using a client (for example, a custom HTTP client) that doesn't support cookies.


## Cloudfront signed cookies

Application must authenticate user and then send three Set-Cookie headers to the viewer. Users thena use those cookies to request access to content.

Use signed cookies in the following cases:
- You want to provide access to multiple restricted files, for example, all of the files for a video in HLS format or all of the files in the subscribers' area of website.
- You don't want to change your current URLs.


## Origin Access Identity

Used in combination with signed URLs and signed cookies to restrict direct access to an S3 bucket.

An origin access identity (OAI) is a special CloudFront user that is associated with the distribution.

By using an OAI you can restrict users so they cannot access the content directly using the S3 URL, they must connect via CloudFront.

Permissions must then be changed on the Amazon S3 bucket to restrict access to the OAI. The origin access identity has permission to access files in your Amazon S3 bucket, but users don’t.

If users request files directly by using Amazon S3 URLs, they’re denied access.


## Geo Restrictions

Blacklists and whitelists can be used for geography, you can only use one at a time.

There are two options available for geo-restriction (geo-blocking):

- Use the CloudFront geo-restriction feature. For restricting access to **all files** in a distribution and at the country level.
- Use a 3rd party geo-location service. For restricting access to a **subset of files** in a distribution and for finer granularity at the country level.
