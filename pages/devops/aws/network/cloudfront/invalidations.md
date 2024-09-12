# Cache Invalidations

## Overview

You can force an entire or partial cache refresh (bypassing TTL) by performing a CloudFront Invalidation.

You can invalidate all files (`*`) or a special path (`/images/*`).

You can invalidate part of the cache using the `CreateInvalidation` API.

It cost money for each invalidation.

You cannot cancel an invalidation after submission.

You cannot invalidate media files in the Microsoft Smooth Streaming format when you have enabled Smooth Streaming for the corresponding cache behavior.


## Guide

To Invalidate Cache in the console:
1. In the CloudFront console, **Select your distribution** from the list.
2. **Go to the "Invalidations" tab**.
3. **Create Invalidation**:
   - Click on the "Create Invalidation" button.
   - Specify the path of the files you want to invalidate. You can use wildcards to invalidate multiple files (e.g., `/images/*` to invalidate all files in the images directory).
4. **Submit the invalidation request**.
