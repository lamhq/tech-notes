# CloudFront Functions

## Overview

CloudFront Functions is a feature that allows you to run lightweight JavaScript code at CloudFront edge locations.

When you associate a CloudFront function with a CloudFront distribution, CloudFront intercepts requests and responses at CloudFront edge locations and passes them to your function.

Functions execute in sub-millisecond times, ensuring minimal impact on response times.

Automatically scales to handle millions of requests per second.

CloudFront functions can:
- manipulate the requests and responses
- perform basic authentication and authorization
- generate HTTP responses at the edge
- ...

You can invoke CloudFront Functions when the following events occur:
- When CloudFront receives a request from a viewer (viewer request)
- Before CloudFront returns the response to the viewer (viewer response)

You can associate CloudFront Functions with Cache Behaviors defined in your CloudFront distribution.


## Use Cases

- Transform HTTP request attributes (like URL, headers, cookies, and query strings) to construct cache keys, improving cache-hit ratios.
- Redirect users to different URLs or rewrite URLs for A/B testing.
- View, add, modify, or delete request/response headers.
- Implement simple authentication mechanisms at the edge.


## Pricing

CloudFront Functions are priced at approximately 1/6th the cost of Lambda@Edge, making them a cost-effective solution for lightweight processing


## Examples

### SPA URI rewrite

This function ensures that any request to your CloudFront distribution that does not include a file extension (e.g., `.html`, `.css`, `.js`) is redirected to `index.html`.

This is particularly useful for single-page applications (SPAs) where all navigation is handled client-side.

This function is triggered on the **Viewer Request** event.

```js
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  if (!uri.includes('.')) {
    request.uri = '/index.html';
  }

  return request;
}
```


### Removing Prefix

This function removes the `api/` prefix from any incoming request URIs.

This can be useful for routing API requests to the correct backend resources without the `api/` prefix.

```js
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  // Check if the URI starts with 'api/'
  if (uri.startsWith('/api/')) {
    // Remove the 'api/' prefix
    request.uri = uri.slice(4);
  }

  return request;
}
```
