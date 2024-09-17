# Pricing

## Overview

You pay for:
- Amount of data transferred out of CloudFront edge locations to the internet. Cost varies by region.
- Number of HTTP/HTTPS Requests. For instance, HTTP requests cost $0.0075 per 10,000 requests in the US, while HTTPS requests cost $0.0100 per 10,000 requests.
- Number of Invalidation Requests. first 1,000 paths requested for invalidation each month are free. After that, it costs $0.005 per path.
- Number of Field-Level Encryption Requests. 0.02 per 10,000 requests in addition to the standard HTTPS request fee.
- Dedicated IP SSL. If you use a custom SSL certificate with a dedicated IP, it costs $600 per month per certificate.
- Number of Real-Time Log Record. $0.01 for every 1,000,000 log lines are published.
- Number of Lambda@Edge invocations and duration of execution. $0.60 per 1 million invocations, plus $0.00005001 per GB-second used.

You do not pay for:
- Data transfer between AWS regions and CloudFront.
- Regional edge cache.
- AWS ACM SSL/TLS certificates.
- Shared CloudFront certificates.

There is an option for **reserved capacity** over 12 months or longer (starts at 10TB of data transfer in a single region).


## Price Classes

Three price classes:
1. Price Class All: all regions - best performance
2. Price Class 200: most regions, but excludes the most expensive regions
3. Price Class 100: only the least expensive regions