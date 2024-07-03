# Vercel

## Disable build cache

Purpose: fix the issue of Nextra apps that some pages are not updated when deploy.

Go to project setting, **Environment Variables** section, add variable `VERCEL_FORCE_NO_BUILD_CACHE` with value `1`.
