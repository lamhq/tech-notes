# Continuous integration

## About continuous integration

**Continuous integration (CI) is a software practice that requires frequently committing code to a shared repository.**

Committing code more often detects errors sooner and reduces the amount of code a developer needs to debug when finding the source of an error. 

Frequent code updates also make it easier to merge changes from different members of a software development team. 

This is great for developers, who can spend more time writing code and less time debugging errors or resolving merge conflicts.

**When you commit code to your repository, you can continuously build and test the code to make sure that the commit doesn't introduce errors.**

Your tests can include code linters (which check style formatting), security checks, code coverage, functional tests, and other custom checks.

You can build and test updates locally before pushing code to a repository, or you can use a CI server that checks for new code commits in a repository.


## Continuous integration using GitHub Actions

CI using GitHub Actions offers workflows that can build the code in your repository and run your tests.

Workflows can run on GitHub-hosted virtual machines, or on machines that you host yourself. 

You can configure your CI workflow to run when:

- a GitHub event occurs: new code is pushed to your repository, ...
- on a set schedule
- an external event occurs using the repository dispatch webhook.


## Skipping workflow runs

If you want to temporarily prevent a workflow from being triggered, you can add a skip instruction to the commit message.

- `[skip ci]`
- `[ci skip]`
- `[no ci]`
- `[skip actions]`
- `[actions skip]`


## Notifications for workflow runs

If you enable email or web notifications for GitHub Actions, you'll receive a notification when any workflow runs that you've triggered have completed. 


## Running on different operating systems

```yml
jobs:
  build:
    runs-on: ubuntu-latest
```

- `windows-latest`
- `macos-latest`


## Node.js

To cache dependencies, you must have a `package-lock.json` or `yarn.lock` file in the root of the repository.

```yml
name: Node.js CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v2
        with:
          node-version: '12.x'
          cache: 'npm'
          # cache: 'yarn'
      - name: Install dependencies
        run: npm ci
        # run: yarn --frozen-lockfile
      - run: npm run build --if-present
      - run: npm test
```
