# API Throttling

## Overview

API Gateway sets a limit on a **steady-state rate** and a **burst of request submissions** against all APIs in your account:
- **steady-state rate**: the average number of requests per second that your API receives over a period of time
- **burst**: the maximum number of requests that your API can handle in a short period of time

By default, **steady-state request rate** is limited to 10,000 requests per second across all API (can be increased).

The maximum concurrent requests is 5,000 requests across all APIs.

In case of throttling (number of request exceeds the limits), you'll receive a **429 Too Many Requests** error response.

Just like Lambda Concurrency, one API that is overloaded, if not limited, can cause the other APIs to be throttled

You can set **Stage limit** & **Method limit** to ensure that each stage doesn't exhaust the entire quota. Or you can define **Usage Plans** to throttle per customer.


## Settings

Amazon API Gateway provides two basic types of throttling-related settings:
- **Server-side throttling** limits are applied across all clients. These limit settings exist to prevent your API—and your account—from being overwhelmed by too many requests.
- **Per-client throttling** limits are applied to clients that use API keys associated with your usage policy as a client identifier.

Settings are applied in the following order:
1. Per-client per-method throttling limits that you set for an API stage in a Usage Plan.
2. Per-client throttling limits that you set in a Usage Plan.
3. Default per-method limits and individual per-method limits that you set in API stage settings.
4. Account-level throttling.
