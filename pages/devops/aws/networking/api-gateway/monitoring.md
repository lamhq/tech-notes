# Logging and Monitoring

Amazon API Gateway logs back-end performance metrics such as API calls, latency, and error rates to CloudWatch.

You can monitor through the API Gateway dashboard (REST API) allowing you to visually monitor calls to the services.

All API calls made to the Amazon API Gateway APIs to create, modify, delete, or deploy REST APIs are logged to CloudTrail.

Understanding the following metrics is useful:

- Monitor the `IntegrationLatency` metrics to measure the responsiveness of the backend.
- Monitor the `Latency` metrics to measure the overall responsiveness of your API calls.
- Monitor the `CacheHitCount` and `CacheMissCount` metrics to optimize cache capacities to achieve a desired performance.

![](https://digitalcloud.training/wp-content/uploads/2022/01/amazon-api-gateway-monitoring-and-logging.jpeg)