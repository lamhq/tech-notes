# Vercel

## Disable build cache

Purpose: fix the issue of Nextra apps that some pages are not updated when deploy.

Go to project setting, **Environment Variables** section, add variable `VERCEL_FORCE_NO_BUILD_CACHE` with value `1`.


## Deploy without Vercel build

Deploy applications without importing Git repository.

- [Build Output API (v3)](https://vercel.com/docs/build-output-api/v3)
- [Build Output API Examples](https://github.com/vercel/examples/tree/main/build-output-api)
- [Build your own web framework](https://vercel.com/blog/build-your-own-web-framework)
