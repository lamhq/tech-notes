# Monitoring

## Logging

You can enable CloudWatch log integration with API Gateway.

Log contains information about the request/response body. You may get a lot of sensitive information logged in CloudWatch Logs.

You can enable CloudWatch logging at the Stage level.

You can define the Log Level: ERROR, DEBUG, INFO. DEBUG gives you the most amount of information.

You can override settings on a per API basis.


## Tracing

You can enable tracing to get extra information about requests in API gateway.

And if you enable X-Ray for API gateway and Lambda, that gives you the full picture for your API.


## Metrics

Metrics are per stage. You can enable detailed metrics.

Useful metrics:
- CacheHitCount & CacheMissCount: efficiency of the cache
- Count: The total number API requests in a given period.
- Integration Latency: The time between when API Gateway relays a request to the backend and when it receives a response from the backend.
- Latency: The time between when API Gateway receives a request from a client and when it returns a response to the client. The latency includes the integration latency and other API Gateway overhead.
- 4XX Error: numer of client-side errors
- 5XX Error: numer of server-side errors


Amazon API Gateway logs back-end performance metrics such as API calls, latency, and error rates to CloudWatch.

You can monitor through the API Gateway dashboard (REST API) allowing you to visually monitor calls to the services.

All API calls made to the Amazon API Gateway APIs to create, modify, delete, or deploy REST APIs are logged to CloudTrail.

Understanding the following metrics is useful:

- Monitor the `IntegrationLatency` metrics to measure the responsiveness of the backend.
- Monitor the `Latency` metrics to measure the overall responsiveness of your API calls.
- Monitor the `CacheHitCount` and `CacheMissCount` metrics to optimize cache capacities to achieve a desired performance.

![](https://digitalcloud.training/wp-content/uploads/2022/01/amazon-api-gateway-monitoring-and-logging.jpeg)


## Errors

Errors we can see in API Gateway:

**4xx: Client errors**:
- 400: Bad Request
- 403: Access Denied, WAF filtered
- 429: Quota exceeded, Throttle

**5xx: Server errors**:
- 502: Bad Gateway Exception, usually for an incompatible output returned from a Lambda proxy integration backend and occasionally for out-of-order invocations due to heavy loads.
- 503: Service Unavailable Exception
- 504: Integration Failure - ex Endpoint Request Timed-out Exception
API Gateway requests time out after 29 second maximum