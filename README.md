# Learning Cheat sheet

## Overview

This repository contains my code snippets and learning notes.

I use it as a reference to quickly review my knowledge, which saves me a lot of time compared to searching on the internet.

This can be viewed at the [documentation website](https://docs.lamhq.com).


## Deploy

The website is deployed to Vercel.

Github Actions is the CI enviroment that run the deployment workflow. Reasons:
- I don't want to connect the repository to Vercel project
- Runtime of deployment workflow is slower in Vercel's CI environment
- There was an issue when run deployment workflow in Vercel's CI environment

The deployment workflow is defined in `.github/workflows/deploy-app.yml`.

Production deployment is triggered on push to `master` branch.

### Vercel setup

The **Framework Preset** property of Vercel project must be set to `Next.js`.

Do not connect the repository to Vercel project.

### Secrets and Environment Variables

Required secrets and environment variables need to be set up in Github for the deployment workflow:
- `VERCEL_PROJECT_ID` (env vars): value can be obtained using `vercel pull` command
- `VERCEL_ORG_ID` (env vars): value can be obtained using `vercel pull` command
- [`VERCEL_TOKEN`](https://vercel.com/guides/how-do-i-use-a-vercel-api-access-token) (secret)