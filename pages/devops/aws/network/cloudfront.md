# Amazon CloudFront

## Overview

CloudFront is a content delivery network (CDN) service that securely delivers data, videos, applications, and APIs to customers globally.

It improves read performance by caching the content of your website at different edge locations.

Used for dynamic, static, streaming, and interactive content.

It provides protection against against multiple types of network and DDoS attack, sudden traffic spikes.


## Edge Locations

An edge location is the location where content is cached (separate to AWS regions/AZs).

Requests are automatically routed to the nearest edge location.

Edge locations are not just read only, you can write to them too.

CloudFront is made of over 216 points of presence (edge locations).


## Regional Edge Caches

Regional Edge Caches are located between origin web servers and global edge locations.

Regional Edge Caches have larger cache-width than any individual edge location, so your objects remain in cache longer at these locations.

Regional Edge Caches aim to get content closer to users.

Proxy methods PUT/POST/PATCH/OPTIONS/DELETE go directly to the origin from the edge locations and do not proxy through Regional Edge caches.

Dynamic content goes straight to the origin and does not flow through Regional Edge caches.

The diagram below shows where Regional Edge Caches and Edge Locations are placed in relation to end users:

![](https://digitalcloud.training/wp-content/uploads/2022/01/amazon-cloudfront-edge-locations-and-regional-edge.jpeg)


## Lambda@Edge

Lambda@Edge allows you to run code at Edge Locations. Executes the functions in AWS locations closer to the viewer.

Lambda@Edge lets you run Node.js and Python Lambda functions to customize content that CloudFront delivers:
- After CloudFront receives a request from a viewer (viewer request).
- Before CloudFront forwards the request to the origin (origin request).
- After CloudFront receives the response from the origin (origin response).
- Before CloudFront forwards the response to the viewer (viewer response).

Lambda@Edge can do the following:

- Inspect cookies and rewrite URLs to perform A/B testing.
- Send specific objects to your users based on the User-Agent header.
- Implement access control by looking for specific headers before passing requests to the origin.
- Add, drop, or modify headers to direct users to different cached objects.
- Generate new HTTP responses.
- Cleanly support legacy URLs.
- Modify or condense headers or URLs to improve cache utilization.
- Make HTTP requests to other Internet resources and use the results to customize responses.

*Exam tip: Lambda@Edge can be used to load different resources based on the User-Agent HTTP header.*


## CloudFront vs S3 Cross Region Replication

CloudFront:
- Is a CDN to cache content all around the world
- Use Global Edge network (216 PoE)
- Files are cached for a TTL (maybe a day)
- Great for static content that must be available everywhere around the world

S3 Cross Region Replication:
- To replicate an entire bucket into another region
- Must be setup for each region you want replication to happen
- Files are updated in near real-time (no caching happens)
- Read only
- Great for dynamic content that needs to be available at low-latency in few regions
