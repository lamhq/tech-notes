# Monitoring and Reporting

## Default metrics

You can view operational metrics about your CloudFront distributions and Lambda@Edge functions in the CloudFront console.

Metrics included (no cost):

- **Requests**: The total number of viewer requests received by CloudFront, for all HTTP methods and for both HTTP and HTTPS requests.
- **Bytes downloaded**: The total number of bytes downloaded by viewers for GET, HEAD, and OPTIONS requests.
- **Bytes uploaded**: The total number of bytes that viewers uploaded to your origin with CloudFront, using POST and PUT requests.
- **4xx error rate**: The percentage of all viewer requests for which the response’s HTTP status code is 4xx.
- **5xx error rate**: The percentage of all viewer requests for which the response’s HTTP status code is 5xx.
- **Total error rate**: The percentage of all viewer requests for which the response’s HTTP status code is 4xx or 5xx.


## Additional metrics

You can enable additional metrics for an additional cost.

These additional metrics must be enabled for each distribution separately:

- **Cache hit rate**: The percentage of all cacheable requests for which CloudFront served the content from its cache. HTTP POST and PUT requests, and errors, are not considered cacheable requests.
- **Origin latency**: The total time spent from when CloudFront receives a request to when it starts providing a response to the network (not the viewer), for requests that are served from the origin, not the CloudFront cache. This is also known as first byte latency, or time-to-first-byte.
- **Error rate by status code**: The percentage of all viewer requests for which the response’s HTTP status code is a particular code in the 4xx or 5xx range. This metric is available for all the following error codes**: 401, 403, 404, 502, 503, and 504.