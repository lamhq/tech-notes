# Vercel

## Disable build cache

Purpose: fix the issue of Nextra apps that some pages are not updated when deploy.

Add an Environment Variable named `VERCEL_FORCE_NO_BUILD_CACHE` with value `1` to disable the build cache.