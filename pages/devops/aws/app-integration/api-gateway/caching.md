# Caching API Responses

## Overview

Caching allows you to cache the endpoint's response.

Caching helps reduce the number of calls made to the backend.

Default TTL is 300 seconds (min 0, max 3600s).

Caches are defined per stage. You can override cache settings per method.

Cache can be encrypted.

Cache size is between 0.5GB to 237GB.

Cache is expensive. Useful in production, not in dev/test.


## Cache Invalidation

You can flush the entire cache (invalidate it) immediately.

Clients can invalidate the cache with header: `Cache-Control: max-age=0` (need proper IAM authorization).

If you don't impose an InvalidateCache policy (or choose **Require authorization** in the console), any client can invalidate the cache.