## Authentication in a workflow

GitHub automatically creates a `GITHUB_TOKEN` secret to use in your workflow. You can use the `GITHUB_TOKEN` to authenticate in a workflow run.

Before each job begins, GitHub fetches an installation access token for the job. The token expires when the job is finished.

### Using the `GITHUB_TOKEN` in a workflow

```yml
name: Pull request labeler

on: [ pull_request_target ]

permissions:
  contents: read
  pull-requests: write

jobs:
  triage:
    runs-on: ubuntu-latest
    permissions:
      issues: write
    steps:
      - uses: actions/labeler@v2
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
```

### Modifying the permissions for the GITHUB_TOKEN

You can use the `permissions` key in your workflow file to modify permissions for the `GITHUB_TOKEN` for an entire workflow or for individual jobs. This allows you to configure the minimum required permissions for a workflow or job.


### Granting additional permissions

If you need a token that requires permissions that aren't available in the GITHUB_TOKEN, you can create a [personal access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) and set it as a secret in your repository.
