# Amazon CloudFront

## Overview

CloudFront is a fast content delivery network
(CDN) service that securely delivers data, videos, applications, and APIs to customers globally. It helps reduce latency and provide higher transfer speeds using AWS edge locations.

CloudFront is an external caching solution, it resides between your website and the people visiting your website. 

The files is cached for a period of time specified by you, if a visitor requests an expired content, CloudFront checks the origin server for new version and copies it to edge location. 

Provides features including security against multiple types of network and denial of service attacks, protection against sudden traffic spikes, and Lambda at Edge, which improves performance by running your Lambda code at edge locations.

Provides real-time metrics and logging so that you can monitor what's being requested, where from, and how quickly. 

Uses pay-as-you-go pricing with no minimum fees.

CloudFront is the only option to add HTTPS to a static website being hosted in an S3 bucket.


## Features

**Security**. Defaults to HTTPS connections with the ability to add custom SSL certificate and domain

**Endpoint Support**. Can be used to front AWS endpoints along with non-AWS applications

**Global Distribution**. You can't pick specific countries - just general areas of the globe

**Expiring Content**. You can force an expiration of content from the cache if you can't wait for the TTL