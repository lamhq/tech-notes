# Pricing

## Overview

You pay for:
1. **Data Transfer Out**: amount of data transferred out of CloudFront edge locations to the internet. Cost varies by region.
2. **Number of HTTP/HTTPS Requests**. For instance, HTTP requests cost $0.0075 per 10,000 requests in the US, while HTTPS requests cost $0.0100 per 10,000 requests.
3. **Invalidation Requests**: The first 1,000 paths requested for invalidation each month are free. After that, it costs $0.005 per path.
4. **Field-Level Encryption Requests**: This costs $0.02 per 10,000 requests in addition to the standard HTTPS request fee.
5. **Dedicated IP SSL**: If you use a custom SSL certificate with a dedicated IP, it costs $600 per month per certificate.
6. **Real-Time Log Requests**: You pay $0.01 for every 1,000,000 log lines that CloudFront publishes to your log destination.
7. **Lambda@Edge**: Charges are based on the number of invocations and the duration of execution. It costs $0.60 per 1 million invocations, plus $0.00005001 per GB-second used.

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