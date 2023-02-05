# Manage Workflow Runs

## Manually running a workflow

When a workflow is configured to run on the `workflow_dispatch` event, you can run the workflow using the Actions tab on GitHub, GitHub CLI, or the REST API.


## Approving workflow runs from public forks

Anyone can fork a public repository, and then submit a pull request that proposes changes to the repository's GitHub Actions workflows. Although workflows from forks do not have access to sensitive data such as secrets, they can be an annoyance for maintainers if they are modified for abusive purposes.

To help prevent this, workflows on pull requests to public repositories from some outside contributors will not run automatically, and might need to be approved first.


## Reviewing deployments

Jobs that reference an environment configured with required reviewers will wait for an approval before starting. While a job is awaiting approval, it has a status of "Waiting".

If a job is not approved within 30 days, the workflow run will be automatically canceled.


## Enabling debug logging

Additional debug logs are enabled by setting secrets in the repository containing the workflow

### Enabling runner diagnostic logging

Two extra log files are added to the log archive:

- The runner process log, which includes information about coordinating and setting up runners to execute jobs.
- The worker process log, which logs the execution of a job.

To enable runner diagnostic logging, set the following secret in the repository that contains the workflow: `ACTIONS_RUNNER_DEBUG` to true.

To download runner diagnostic logs, download the log archive of the workflow run. The runner diagnostic logs are contained in the `runner-diagnostic-logs` folder.

### Enabling step debug logging

Step debug logging increases the verbosity of a job's logs during and after a job's execution.

To enable step debug logging, you must set the following secret in the repository that contains the workflow: `ACTIONS_STEP_DEBUG` to true.

After setting the secret, more debug events are shown in the step logs.


## Adding a workflow status badge

A status badge shows whether a workflow is currently failing or passing.

A common place to add a status badge is in the `README.md` file of your repository, but you can add it to any web page you'd like.

### Using the workflow file name

```
![example workflow](https://github.com/github/docs/actions/workflows/main.yml/badge.svg)
```

### Using the `branch` parameter

```
![example branch parameter](https://github.com/github/docs/actions/workflows/main.yml/badge.svg?branch=feature-1)
```

### Using the `event` parameter

```
![example event parameter](https://github.com/github/docs/actions/workflows/main.yml/badge.svg?event=pull_request)
```
