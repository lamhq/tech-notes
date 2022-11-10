# Using environments

An environments consist of protection rules and secrets. A workflow job can reference an environment to use the environment's protection rules and secrets.

Environment protection rules and environment secrets are only available on public repositories and private repositories on an enterprise plan.

## Environment protection rules

- Required reviewers: require a specific person or team to approve workflow jobs that reference the environment. 
- Wait timer: delay a job for a specific amount of time after the job is initially triggered.
- Deployment branches: all branches, protected branches, selected branches

## Environment secrets

Secrets stored in an environment are only available to workflow jobs that reference the environment. If the environment requires approval, a job cannot access environment secrets until one of the required reviewers approves it.

## Creating an environment

1. On GitHub, navigate to the main page of the repository.
2. Under your repository name, click Settings.
3. In the left sidebar, click Environments.
4. Click New environment, enter a name for the environment, then click Configure environment.
5. Configure any environment protection rules or environment secrets.


## Referencing an environment

Each job in a workflow can reference a single environment.

```yml
jobs:
  check-bats-version:
    environment: staging_environment
```

## Using concurrency to serialize deployments

You can use concurrency so that an environment has a maximum of one deployment in progress and one deployment pending at a time.

```yml
concurrency: staging_environment
```

```yml
jobs:
  check-bats-version:
    concurrency: staging_environment
```

```yml
concurrency: 
  group: ${{ github.head_ref }}
  cancel-in-progress: true
```

## Deleting an environment

1. On GitHub, navigate to the main page of the repository.
2. Under your repository name, click Settings.
3. In the left sidebar, click Environments.
4. Next to the environment that you want to delete, click Delete icon
5. Click I understand, delete this environment.