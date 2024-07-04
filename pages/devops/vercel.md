# Vercel

## Disable build cache

Purpose: fix the issue of Nextra apps that some pages are not updated when deploy.

Go to project setting, **Environment Variables** section, add variable `VERCEL_FORCE_NO_BUILD_CACHE` with value `1`.


## Deploy without Vercel build

Benefits:
- Deploy applications without importing Git repository to Vercel.
- Use custom CI providers (Github Actions, Gitlab, ...) to run CI/CD workflows
- Able to customize CI/CD workflows to suit your process.

Reasons:
- Connecting Git repository is not allowed
- `vercel build` command is buggy
- Limitations in Vercel CI environment
- You want to customize your CI workflows

References:
- [How can I use GitHub Actions with Vercel?](https://vercel.com/guides/how-can-i-use-github-actions-with-vercel)
- [Build Output API (v3)](https://vercel.com/docs/build-output-api/v3)
- [Build Output API Examples](https://github.com/vercel/examples/tree/main/build-output-api)
- [Build your own web framework](https://vercel.com/blog/build-your-own-web-framework)
