# Distributions

## Overview

To distribute content with CloudFront you need to create a distribution.

The distribution includes the configuration of the CDN including:
- Content origins.
- Access (public or restricted).
- Security (HTTP or HTTPS).
- Cookie or query-string forwarding.
- Geo-restrictions.
- Access logs (record viewer activity).

When you configure your distribution, you can add a free AWS Certificate Manager (ACM) SSL/TLS encryption certificate to your distribution.

You can choose a price class when you create or update a CloudFront distribution to determine where in the world the content will be cached.

To delete a distribution it must first be disabled (can take up to 15 minutes).

There are two types of distribution: Web and RTMP.

![](https://digitalcloud.training/wp-content/uploads/2022/01/amazon-cloudfront-distributions-and-origins.jpeg)


## Web Distribution

- Static and dynamic content including `.html`, `.css`, `.php,` and graphics files.
- Distributes files over HTTP and HTTPS.
- Add, update, or delete objects, and submit data from web forms.
- Use live streaming to stream an event in real time.


## RTMP

- Distribute streaming media files using Adobe's Real-Time Messaging Protocol (RTMP).
- Allows an end user to begin playing a media file before the file has finished downloading from a CloudFront edge location.
- Files must be stored in an S3 bucket.


## Live streaming Guide

To use CloudFront live streaming, create a web distribution.

For serving both the media player and media files you need two types of distributions:
- A web distribution for the media player.
- An RTMP distribution for the media files.
