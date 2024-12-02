# Pipelines

## View pipelines

To view all the pipelines that ran for your project:

1. On the left sidebar, select **Search or go to** and find your project.
1. Select **Build > Pipelines**.


## Run a pipeline manually

Pipelines can be executed manually, with predefined or manually-specified variables.

To execute a pipeline manually:

1. On the left sidebar, select **Search or go to** and find your project.
1. Select **Build > Pipelines**.
1. Select **New pipeline**.
1. In the **Run for branch name or tag** field, select the branch or tag to run the pipeline for.
2. Enter any CI/CD variables required for the pipeline to run.
   You can set specific variables to have their values prefilled in the form.
3. Select **Run pipeline**.

### Pre-filled variables

You can define global variables that are prefilled when running a pipeline manually, using `description` and `value` keywords:
```yml
variables:
  DEPLOY_CREDENTIALS:
    description: "The deployment credentials."
  DEPLOY_ENVIRONMENT:
    value: "staging"
    options:
      - "production"
      - "staging"
      - "canary"
    description: "The deployment target. Set to 'staging' by default."
```


## Run a pipeline by using a URL query string

You can use a query string to pre-populate the **New pipeline** page.


## Skip a pipeline

To push a commit without triggering a pipeline, add `[ci skip]` or `[skip ci]` to your commit message.


## Types of pipelines

### Branch pipelines

- Run every time you commit changes to a branch
- Run by default
- Have access to protected variables and protected runners if the branch is a protected branch

### Tag pipelines

- Run every time you create or push a new tag
- Run by default
- Have access to protected variables and protected runners if the tag is a protected tag

### Merge request pipelines

- Run every time you make changes to the source branch in a merge request
- Run on the contents of the source branch only, ignoring the content of the target branch
- Do not run by default
- Have access to predefined variables
- Do not have access to protected variables or protected runners

```yml
job1:
  script:
    - echo "This job runs in merge request pipelines"
  rules:
    - if: $CI_PIPELINE_SOURCE == 'merge_request_event'
```

You can also use the `workflow: rules` keyword
to configure the entire pipeline to run in merge request pipelines
```yml
workflow:
  rules:
    - if: $CI_PIPELINE_SOURCE == 'merge_request_event'

job1:
  script:
    - echo "This job runs in merge request pipelines"

job2:
  script:
    - echo "This job also runs in merge request pipelines"
```

A common `workflow` configuration is to have pipelines run for merge requests, tags, and the default branch. For example:

```yaml
workflow:
  rules:
    - if: $CI_PIPELINE_SOURCE == 'merge_request_event'
    - if: $CI_COMMIT_TAG
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
```


### Merge result pipelines

- Run when a merge request is created or updated
- Run on the result of the source and target branches merged together
- Do not run by default
- Ensure changes will integrate smoothly without conflicts before the actual merge happens

### Merge trains

- Run when a merge request is added to the merge train queue
- Run on the combined result of the new merge request, previous merge requests in the train, and the target branch
- Do not run by default
- Ensure stability and detect conflicts before merging multiple merge requests


## Pipelines with the `needs` keyword

You can use the `needs` keyword to define dependencies between your jobs.

Jobs with `needs` can start as soon as their dependencies are met, without waiting jobs in ealier stages.

Jobs without `needs` need to wait for jobs in ealier stages to complete.

```yml
stages:
  - build
  - test
  - deploy

default:
  image: alpine

build_a:
  stage: build
  script:
    - echo "This job builds something quickly."

test_a:
  stage: test
  needs: [build_a]
  script:
    - echo "This test job will start as soon as build_a finishes."
    - echo "It will not wait for build_b, or other jobs in the build stage, to finish."
```


## Resource group

Resource group ensure jobs run sequentially (e.g., deploy job).

Jobs with the same `resource_group` run once at a time.

```yml
deploy:
  ...
  resource_group: production
```


## Downstream pipelines

A downstream pipeline is any GitLab CI/CD pipeline triggered by another pipeline.
