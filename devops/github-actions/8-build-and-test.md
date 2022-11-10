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
      - name: Setup Node.js 12
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

## Service container

Service containers are Docker containers that host services that you might need to test or operate your application in a workflow. 

**For example, your workflow might need to run integration tests that require access to a database and memory cache.**

### Creating service containers

```yml
name: Redis container example
on: push

jobs:
  # Label of the container job
  container-job:
    # Containers must run in Linux based operating systems
    runs-on: ubuntu-latest
    # Docker Hub image that `container-job` executes in
    container: node:10.18-jessie

    # Service containers to run with `container-job`
    services:
      # Label used to access the service container
      redis:
        # Docker Hub image
        image: redis
```


### Communicating with service containers

When you run jobs in a container, the hostname of the service container is automatically mapped to the label name. 

*For example, if you create a service container with the label redis, the hostname of the service container is `redis`.*

When running jobs directly on the runner machine, you can access service containers using `localhost:<port>` or `127.0.0.1:<port>`. The service running in the Docker container does not expose its ports to the job on the runner by default. You need to map ports on the service container to the Docker host. 

You can map service containers ports to the Docker host using the `ports` keyword. 

```yml
name: Redis Service Example
on: push

jobs:
  # Label of the container job
  runner-job:
    # You must use a Linux environment when using service containers or container jobs
    runs-on: ubuntu-latest

    # Service containers to run with `runner-job`
    services:
      # Label used to access the service container
      redis:
        # Docker Hub image
        image: redis
        #
        ports:
          # Maps TCP port 6379 in the container to port 8080 on the Docker host.
          - 6379:8080
```

## Storing workflow data as artifacts

Artifacts allow you to persist data after a job has completed, and share that data with another job in the same workflow. An artifact is a file or collection of files produced during a workflow run.

*For example, you can use artifacts to save your build and test output after a workflow run has ended.*

Use artifacts when you want to save files produced by a job to view after a workflow has ended.

### Uploading artifacts

This example shows you how to create a workflow for a Node.js project that builds the code in the `src` directory and runs the tests in the `tests` directory. The workflow uploads the production artifacts in the `dist` directory, but excludes any markdown files. It also and uploads the `code-coverage.html` report as another artifact.

```yml
name: Node CI

on: [push]

jobs:
  build_and_test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v2
      - name: npm install, build, and test
        run: |
          npm install
          npm run build --if-present
          npm test
      - name: Archive production artifacts
        uses: actions/upload-artifact@v2
        with:
          name: dist-without-markdown
          path: |
            dist
            !dist/**/*.md
          # set retention period of 5 days
          retention-days: 5
      - name: Archive code coverage results
        uses: actions/upload-artifact@v2
        with:
          name: code-coverage-report
          path: output/test/code-coverage.html
```

### Downloading or deleting artifacts

```yml
- name: Download a single artifact
  uses: actions/download-artifact@v2
  with:
    name: my-artifact
```

Download all artifacts in a workflow:

```yml
- name: Download all workflow run artifacts
  uses: actions/download-artifact@v2
```

### Using artifacts

Job 1 performs these steps:

- Performs a math calculation and saves the result to a text file called `math-homework.txt`.
- Uses the `upload-artifact` action to upload the `math-homework.txt` file with the artifact name `homework`.

Job 2 uses the result in the previous job:

- Downloads the `homework` artifact uploaded in the previous job. By default, the `download-artifact` action downloads artifacts to the workspace directory that the step is executing in. You can use the `path` input parameter to specify a different download directory.
- Reads the value in the `math-homework.txt` file, performs a math calculation, and saves the result to `math-homework.txt` again, overwriting its contents.

```yml
name: Share data between jobs

on: [push]

jobs:
  job_1:
    name: Add 3 and 7
    runs-on: ubuntu-latest
    steps:
      - shell: bash
        run: |
          expr 3 + 7 > math-homework.txt
      - name: Upload math result for job 1
        uses: actions/upload-artifact@v2
        with:
          name: homework
          path: math-homework.txt

  job_2:
    name: Multiply by 9
    needs: job_1
    runs-on: windows-latest
    steps:
      - name: Download math result for job 1
        uses: actions/download-artifact@v2
        with:
          name: homework
      - shell: bash
        run: |
          value=`cat math-homework.txt`
          expr $value \* 9 > math-homework.txt
```

## Caching dependencies

Workflow runs often reuse the same outputs or downloaded dependencies from one run to another.

*For example, package and dependency management tools such as Maven, Gradle, npm, and Yarn keep a local cache of downloaded dependencies.*

Use caching when you want to reuse files that don't change often between jobs or workflow runs.

To cache and restore dependencies for npm or Yarn, you can use the [actions/setup-node](https://github.com/actions/setup-node) action.

To cache dependencies for a job, you'll need to use GitHub's `cache` action. The action retrieves a cache identified by a unique key.

The `cache` action will attempt to restore a cache based on the `key` you provide. When the action finds a cache, the action restores the cached files to the `path` you configure.

You can optionally provide a list of `restore-keys` to use when the `key` doesn't match an existing cache. A list of `restore-keys` is useful when you are restoring a cache from another branch because `restore-keys` can partially match cache keys.

```yml
name: Caching with npm

on: push

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Cache node modules
        uses: actions/cache@v2
        env:
          cache-name: cache-node-modules
        with:
          # npm cache files are stored in `~/.npm` on Linux/macOS
          path: ~/.npm
          key: ${{ runner.os }}-build-${{ env.cache-name }}-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-build-${{ env.cache-name }}-
            ${{ runner.os }}-build-
            ${{ runner.os }}-

      - name: Install Dependencies
        run: npm install

      - name: Build
        run: npm build

      - name: Test
        run: npm test
```