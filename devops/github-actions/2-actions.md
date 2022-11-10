# GitHub Actions

## Concepts

GitHub Actions are event-driven, meaning that you can run a series of commands after a specified event has occurred

An **event** automatically triggers the **workflow**, which contains a **job**. The **job** then uses **steps** to control the order in which **actions** are run. These actions are the commands that automate your software testing.

The workflow is an automated procedure that you add to your repository. Workflows are made up of one or more jobs and can be scheduled or triggered by an event.

An event is a specific activity that triggers a workflow: commit pushed, pul request is created, ...

A job is a set of steps that execute on the same runner. By default, a workflow with multiple jobs will run those jobs in parallel. You can also configure a workflow to run jobs sequentially.

A step is an individual task that can run commands in a job. A step can be either an action or a shell command.

Actions are standalone commands that are combined into steps to create a job. You can create your own actions, or use actions created by the GitHub community.

A runner is a server that has the GitHub Actions runner application installed. You can use a runner hosted by GitHub, or you can host your own.

```yml
name: learn-github-actions
on: [push]
jobs:
  check-bats-version:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '14'
      - run: npm install -g bats
      - run: bats -v
```

The actions you use in your workflow can be defined in:

- A public repository
- The same repository where your workflow file references the action
- A published Docker container image on Docker Hub


## Browsing Marketplace actions in the workflow editor

1. In your repository, browse to the workflow file you want to edit.
2. In the upper right corner of the file view, to open the workflow editor, click pencil icon.
3. To the right of the editor, use the GitHub Marketplace sidebar to browse actions.

## Adding an action to your workflow

1. Navigate to the action you want to use in your workflow.
2. Under "Installation", click copy icon to copy the workflow syntax.
3. Paste the syntax as a new step in your workflow.

## Using release management

The creators of a community action have the option to use tags, branches, or SHA values to manage releases of the action. You will designate the version of the action in your workflow file. 

### Using tags

```yml
steps:
  - uses: actions/javascript-action@v1.0.1
```

### Using SHAs

```yml
steps:
  - uses: actions/javascript-action@172239021f7ba04fe7327647b213799853a9eb89
```

### Using branches

```yml
steps:
  - uses: actions/javascript-action@main
```

## Knowing inputs and outputs of an action

To see the inputs and outputs of an action, check the `action.yml` or `action.yaml` in the root directory of the repository.

```yml
name: "Example"
description: "Receives file and generates output"
inputs:
  file-path: # id of input
    description: "Path to test script"
    required: true
    default: "test-file.js"
outputs:
  results-file: # id of output
    description: "Path to results file"
```

## Referencing an action in the same repository

Example repository file structure:

```
|-- hello-world (repository)
|   |__ .github
|       └── workflows
|           └── my-first-workflow.yml
|       └── actions
|           |__ hello-world-action
|               └── action.yml
```

```yml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      # This step checks out a copy of your repository.
      - uses: actions/checkout@v2
      # This step references the directory that contains the action.
      - uses: ./.github/actions/hello-world-action
```

## Running shell script

```yml
jobs:
  example-job:
    steps:
      - name: Run build script
        run: ./.github/scripts/build.sh
        shell: bash
```

## Creating dependent jobs

```yml
jobs:
  setup:
    runs-on: ubuntu-latest
    steps:
      - run: ./setup_server.sh
  build:
    needs: setup
    runs-on: ubuntu-latest
    steps:
      - run: ./build_server.sh
  test:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - run: ./test_server.sh
```

## Using a build matrix

You can use a build matrix if you want your workflow to run tests across multiple combinations of operating systems, platforms, and languages.

```yml
jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node: [6, 8, 10]
    steps:
      - uses: actions/setup-node@v2
        with:
          node-version: ${{ matrix.node }}
```
