# Amazon CloudFront

## Overview

CloudFront is a content delivery network (CDN) service that securely delivers data, videos, applications, and APIs to customers globally. It helps reduce latency and provide higher transfer speeds using AWS edge locations.

Used for dynamic, static, streaming, and interactive content.

Protection against against multiple types of network and denial of service attacks, sudden traffic spikes.

Uses pay-as-you-go pricing with no minimum fees.

CloudFront is the only option to add HTTPS to a static website being hosted in an S3 bucket.

Files can also be uploaded to CloudFront.


## Edge Locations

An edge location is the location where content is cached (separate to AWS regions/AZs).

Requests are automatically routed to the nearest edge location.

Edge locations are not just read only, you can write to them too.


## Regional Edge Caches

Regional Edge Caches are located between origin web servers and global edge locations.

Regional Edge Caches have larger cache-width than any individual edge location, so your objects remain in cache longer at these locations.

Regional Edge Caches aim to get content closer to users.

Proxy methods PUT/POST/PATCH/OPTIONS/DELETE go directly to the origin from the edge locations and do not proxy through Regional Edge caches.

Dynamic content goes straight to the origin and does not flow through Regional Edge caches.

The diagram below shows where Regional Edge Caches and Edge Locations are placed in relation to end users:

![](https://digitalcloud.training/wp-content/uploads/2022/01/amazon-cloudfront-edge-locations-and-regional-edge.jpeg)


## Cache Behavior

Allows you to configure a variety of CloudFront functionality for a given URL path pattern.

For each cache behavior you can configure the following functionality:

- The path pattern (e.g. `/images/*.jpg`, `/images*.php`).
- The origin to forward requests to (if there are multiple origins).
- Whether to forward query strings.
- Whether to require signed URLs.
- Allowed HTTP methods.
- Minimum amount of time to retain the files in the CloudFront cache (regardless of the values of any cache-control headers).

The default cache behavior only allows a path pattern of `/*`.

Objects are cached for the TTL (always recorded in seconds, default is 24 hours, default max is 1 year).

Only caches for GET requests (not PUT, POST, PATCH, DELETE).

Dynamic content is cached.

Object invalidation:
- Invalidation can be used to immediately revoke cached objects (chargeable).
- You can remove an object from the cache by invalidating the object.
- You cannot cancel an invalidation after submission.
- You cannot invalidate media files in the Microsoft Smooth Streaming format when you have enabled Smooth Streaming for the corresponding cache behavior.


### Improving Cache Hit Ratio

Methods of improving the cache hit ratio include:

- Use the `Cache-Control max-age` directive to increase the time objects remain in the cache
- Use Origin Shield.
- Forward only the query string parameters for which your origin will return unique objects.
- Configure CloudFront to forward only specified cookies instead of forwarding all cookies.
- Configure CloudFront to forward and cache based on only specified headers instead of forwarding and caching based on all headers.


## Domain Names

CloudFront typically creates a domain name such as a232323.cloudfront.net.

Alternate domain names can be added using an alias record (Route 53).

For other service providers use a CNAME (cannot use the zone apex with CNAME).

Moving domain names between distributions:
- You can move subdomains yourself.
- For the root domain you need to use AWS support.
