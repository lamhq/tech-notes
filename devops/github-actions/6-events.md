# Events that trigger workflows

## Configuring workflow events

```yml
# Triggered when code is pushed to any branch in a repository
on: push
```

```yml
# Triggers the workflow on push or pull request events
on: [push, pull_request]
```

```yml
on:
  # Trigger the workflow on push or pull request,
  # but only for the main branch
  push:
    branches:
      - main
  pull_request:
    branches:
      - main
```

## Scheduled events

The `schedule` event allows you to trigger a workflow at a scheduled time.

```yml
on:
  schedule:
    # * is a special character in YAML so you have to quote this string
    - cron:  '30 5,17 * * *'
```

Check [syntax reference](https://docs.github.com/en/actions/reference/events-that-trigger-workflows#schedule).


## Manual events

To trigger specific workflows in a repository, use the `workflow_dispatch` event. 

To trigger more than one workflow in a repository and create custom events and event types, use the `repository_dispatch` event.

### `workflow_dispatch`

```yml
on: workflow_dispatch
```

This example defines the name and home inputs and prints them using the `github.event.inputs.name` and `github.event.inputs.home` contexts. If a `home` isn't provided, the default value 'The Octoverse' is printed.

```yml
name: Manually triggered workflow
on:
  workflow_dispatch:
    inputs:
      name:
        description: 'Person to greet'
        required: true
        default: 'Mona the Octocat'
      home:
        description: 'location'
        required: false
        default: 'The Octoverse'

jobs:
  say_hello:
    runs-on: ubuntu-latest
    steps:
      - run: |
          echo "Hello ${{ github.event.inputs.name }}!"
          echo "- in ${{ github.event.inputs.home }}!"
```

### `repository_dispatch`

```yml
on:
  repository_dispatch:
    types: [opened, deleted]
```


## Webhook events

- [create](https://docs.github.com/en/actions/reference/events-that-trigger-workflows#create): Runs your workflow anytime someone creates a branch or tag
- [pull_request](https://docs.github.com/en/actions/reference/events-that-trigger-workflows#pull_request): Runs your workflow anytime the `pull_request` event occurs. 
- [pull_request_target](https://docs.github.com/en/actions/reference/events-that-trigger-workflows#pull_request_target): This event runs in the context of the base of the pull request, rather than in the merge commit as the `pull_request` event does.
- [push](https://docs.github.com/en/actions/reference/events-that-trigger-workflows#pull_request_target): Runs your workflow when someone pushes to a repository branch
- [workflow_run](https://docs.github.com/en/actions/reference/events-that-trigger-workflows#workflow_run): This event occurs when a workflow run is requested or completed, and allows you to execute a workflow based on the finished result of another workflow. A workflow run is triggered regardless of the result of the previous workflow.


## Triggering new workflows using a personal access token

When you use the repository's `GITHUB_TOKEN` to perform tasks on behalf of the GitHub Actions app, events triggered by the `GITHUB_TOKEN` will not create a new workflow run. This prevents you from accidentally creating recursive workflow runs.

If you would like to trigger a workflow from a workflow run, you can trigger the event using a [personal access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token).


## Trigger workflow on tags created

```yml
name: prod-sample

on: create
jobs:
  # This workflow contains a single job called "build"
  build:
    if: ${{ startsWith(github.ref, 'refs/tags/') }}
    
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - name: Run a one-line script
        run: echo Hello, world
```