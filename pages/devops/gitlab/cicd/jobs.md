# CI/CD Jobs

## Overview

Jobs:
- contain a list of commands to execute to accomplish tasks like building, testing, or deploying code.
- Are defined at the top-level of the YAML configuration.
- Must have either a `script` section defining commands to run,
  or a `trigger` section to trigger a downstream pipeline to run.
- Execute on a runner, for example in a Docker container.
- Run independently from other jobs.
- Have a job log with the full execution log for the job.

```yml
my-ruby-job:
  script:
    - bundle install
    - bundle exec my_ruby_command

my-shell-script-job:
  script:
    - my_shell_script.sh
```

## Viewing jobs

When you access a pipeline, you can see the related jobs for that pipeline.

You can view the full list of jobs in a project by go to **Build > Jobs**.


## Naming jobs

You can't use these keywords as job names:
- `image`
- `services`
- `stages`
- `before_script`
- `after_script`
- `variables`
- `cache`
- `include`
- `pages:deploy` configured for a `deploy` stage

Job names must be 255 characters or fewer.

Job names must be unique.


## Grouping jobs

You can group similar jobs together by following a naming convention:
```yml
build ruby 1/3:
  stage: build
  script:
    - echo "ruby1"

build ruby 2/3:
  stage: build
  script:
    - echo "ruby2"

build ruby 3/3:
  stage: build
  script:
    - echo "ruby3"
```

## Hiding jobs

Job name with a dot (`.`) is not processed by GitLab CI/CD:

```yml
.hidden_job:
  script:
    - run test
```


## Job inheritance

You can disable the inheritance of:
- `default` keywords
- global variables

```yml
default:
  image: 'ruby:2.4'
  before_script:
    - echo Hello World

variables:
  DOMAIN: example.com
  WEBHOOK_URL: https://my-webhook.example.com

rubocop:
  inherit:
    default: false
    variables: false
  script: bundle exec rubocop

rspec:
  inherit:
    default: [image]
    variables: [WEBHOOK_URL]
  script: bundle exec rspec

capybara:
  inherit:
    variables: false
  script: bundle exec capybara

karma:
  inherit:
    default: true
    variables: [DOMAIN]
  script: karma
```


## Deployment jobs

Deployment jobs are a specific kind of CI job in that they deploy code to **environments**.

A deployment job is any job that uses the `environment` keyword and the `start environment action`.

Deployment jobs do not need to be in the `deploy` stage.

```yml
deploy me:
  script:
    - deploy-to-cats.sh
  environment:
    name: production
    url: https://cats.example.com
    action: start
```


## Manual jobs

You can require that a job doesn’t run unless a user starts it.

To specify a job as manual, add `when: manual` to the job
in the `.gitlab-ci.yml` file.

You can add a confirmation dialog for manual jobs using `manual_confirmation` keyword (to prevent accidental deployments or deletions).

You can use protected environments to define a list of users authorized to run a manual job:
```yml
deploy_prod:
  stage: deploy
  script:
    - echo "Deploy to production server"
  environment:
    name: production
    url: https://example.com
  when: manual
  rules:
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
```


## Job Rules

You use `rules` keyword to add configuration properties to a job if its conditions match.

Rules are evaluated before any jobs run, until the first match.

When a match is found, the job is either included or excluded from the pipeline, depending on the configuration.

To include jobs:
```yml
job:
  script: echo "Hello, Rules!"
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
      when: manual
      allow_failure: true
```
- If the pipeline is for a merge request, the job is run manually and the pipeline continues running even if the manual job is not run

To exclude jobs:
```yml
job:
  script: echo "Hello, Rules!"
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
      when: never
    - if: $CI_PIPELINE_SOURCE == "schedule"
      when: never
    - when: on_success
```
- If the pipeline is for a merge request, the job is not added to the pipeline.
- If the pipeline is a scheduled pipeline, the job is not added to the pipeline.
- In all other cases, the job is added to the pipeline, with `when: on_success`.
- `when: on_success`: the job should run only if all jobs in previous stages have completed successfully (default behavior)

Skip jobs if the changes are empty:
```yml
job:
  script:
    - echo "This job only runs for branches that are not empty"
  rules:
    - if: $CI_COMMIT_BRANCH
      changes:
        compare_to: 'refs/heads/main'
        paths:
          - '**/*'
```

Common `if` clauses:
- `if: $CI_PIPELINE_SOURCE == "push"`: run on push to branches or tags
- `if: $CI_PIPELINE_SOURCE == "schedule"`: run when the pipeline is triggered by a schedule
- `if: $CI_PIPELINE_SOURCE == "merge_request_event"`: run on merge request
- `if: $CI_COMMIT_TAG`: If changes are pushed for a tag.
- `if: $CI_COMMIT_BRANCH`: If changes are pushed to any branch.
- `if: $CI_COMMIT_BRANCH == "main"`: If changes are pushed to `main`.
- `if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH`: If changes are pushed to the default
  branch. Use when you want to have the same configuration in multiple
  projects with different default branches.
- `if: $CI_COMMIT_BRANCH =~ /regex-expression/`: If the commit branch matches a regular expression.
- `if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH && $CI_COMMIT_TITLE =~ /Merge branch.*/`:
  If the commit branch is the default branch and the commit message title matches a regular expression.
  For example, the default commit message for a merge commit starts with `Merge branch`.
- `if: $CUSTOM_VARIABLE == "value1"`: If the custom variable `CUSTOM_VARIABLE` is
  exactly `value1`.

For possible values of `CI_PIPELINE_SOURCE`, check the [docs](https://docs.gitlab.com/ee/ci/jobs/job_rules.html#ci_pipeline_source-predefined-variable).

For complex rule condition, you can combine `if`, `changes`, `exists` in `rules` condition. The rule evaluates to true only when all included keywords evaluate to true.
```yml
docker build:
  script: docker build -t my-image:$CI_COMMIT_REF_SLUG .
  rules:
    - if: $VAR == "string value"
      changes:  # Include the job and set to when:manual if any of the follow paths match a modified file.
        - Dockerfile
        - docker/scripts/**/*
```
- If the `Dockerfile` file or any file in `/docker/scripts` has changed and `$VAR == “string value”`, then the job run.

You can use parentheses `()` with `&&` and `||` to build more complicated variable expressions:
```yml
job1:
  script:
    - echo This rule uses parentheses.
  rules:
    - if: ($CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH || $CI_COMMIT_BRANCH == "develop") && $MY_VARIABLE
```


## Job Scripts

You can verify the syntax is valid with the CI [Lint](https://docs.gitlab.com/ee/ci/lint.html) tool.

You can define scripts that run before/after scripts commands in all jobs with `before_script` and `after_script`:
```yml
default:
  before_script:
    - echo "Execute this `before_script` in all jobs by default."
  after_script:
    - echo "Execute this `after_script` in all jobs by default."

job1:
  script:
    - echo "These script commands execute after the default `before_script`,"
    - echo "and before the default `after_script`."

job2:
  before_script:
    - echo "Execute this script instead of the default `before_script`."
  script:
    - echo "This script executes after the job's `before_script`,"
    - echo "but the job does not use the default `after_script`."
  after_script: []
```
- You can overwrite a default by defining a different one in a job. To ignore the default use `before_script: []` or `after_script: []`

You can split long commands into multiline commands using `|` symbol (preserves newlines) and `>` symbol (folds newlines into spaces).
```yml
job1:
  script: |
    echo "This is the first line"
    echo "This is the second line"
    echo "This is the third line"

job2:
  script: >
    echo "This is the first line" &&
    echo "This is the second line" &&
    echo "This is the third line"
```


## Caching

You usually use caches to avoid downloading content, like dependencies or libraries, each time you run a job.

Here's an example of caching Node.js dependencies:
```yml
image: node:latest

stages:
  - install
  - build
  - test

cache:
  key:  # Cache modules using lock file
    files:
      - package-lock.json
  paths:
    - node_modules/

before_script:
  - npm install

install_dependencies:
  stage: install
  script:
    - echo "Dependencies installed"

build:
  stage: build
  script:
    - npm run build

test:
  stage: test
  script:
    - npm test
```

You can have a maximum of four caches.

You can specify a list of keys to try to restore cache from if there is no cache found using [`cache:fallback_keys`](https://docs.gitlab.com/ee/ci/caching/#per-cache-fallback-keys) or [`CACHE_FALLBACK_KEY`](https://docs.gitlab.com/ee/ci/caching/#global-fallback-key).

You can also disable cache for specific jobs.

By default, the cache for each branch is separate, you can configure to have [all branches use the same cache](https://docs.gitlab.com/ee/ci/caching/#use-the-same-cache-for-all-branches).

You can [clear the cache](https://docs.gitlab.com/ee/ci/caching/#clear-the-cache-manually) manually.


## Job artifacts

Jobs can output an archive of files and directories. This output is known as a job artifact.

You can download job artifacts by using the GitLab UI.

To create job artifacts, use the `artifacts` keyword:
```yml
pdf:
  script: xelatex mycv.tex
  artifacts:
    paths:
      - mycv.pdf
```
- The `paths` keyword determines which files to add to the job artifacts

You can use wildcards for paths and directories.

You can [specify how long GitLab keeps the artifacts](https://docs.gitlab.com/ee/ci/jobs/job_artifacts.html#with-an-expiry).

Artifacts from successful pipelines are always kept for the latest commit on each ref, ignoring any `expire_in` settings.

You can [prevent files from being added](https://docs.gitlab.com/ee/ci/jobs/job_artifacts.html#without-excluded-files) to an artifacts archive.

Jobs download all artifacts from the completed jobs in previous stages by default. To prevent a job from downloading any artifacts, set `dependencies` to an empty array (`[]`):
```yml
job:
  stage: test
  script: make build
  dependencies: []
```

You can view all artifacts stored in a project from the **Build > Artifacts** page.


## SSH

When your jobs are running, they might use SSH keys to:
- Check out internal submodules.
- Download private packages using your package manager. For example, Bundler.
- Deploy your application to your own server or, for example, Heroku.
- Execute SSH commands from the build environment to a remote server.
- Rsync files from the build environment to a remote server.


## Other topics

- [Run a job after a delay](https://docs.gitlab.com/ee/ci/jobs/job_control.html#run-a-job-after-a-delay)
- [Run jobs only in specific pipeline types (branch, tag, merge request, schedule, ...)](https://docs.gitlab.com/ee/ci/jobs/job_rules.html#run-jobs-only-in-specific-pipeline-types)
- [Split a large job into multiple smaller jobs that run in parallel](https://docs.gitlab.com/ee/ci/jobs/job_control.html#parallelize-large-jobs)
- [Avoid duplicate pipelines](https://docs.gitlab.com/ee/ci/jobs/job_rules.html#avoid-duplicate-pipelines)
- [Reuse rules in different jobs](https://docs.gitlab.com/ee/ci/jobs/job_rules.html#reuse-rules-in-different-jobs)
- [Use CI/CD variable expressions in Job rules](https://docs.gitlab.com/ee/ci/jobs/job_rules.html#reuse-rules-in-different-jobs)
- [Ignore non-zero exit codes in Job script](https://docs.gitlab.com/ee/ci/yaml/script.html#ignore-non-zero-exit-codes)
- [Troubleshooting Job Scripts](https://docs.gitlab.com/ee/ci/yaml/script.html#troubleshooting)
- [Common use cases for caches](https://docs.gitlab.com/ee/ci/caching/#common-use-cases-for-caches)
- [Cache Troubleshooting](https://docs.gitlab.com/ee/ci/caching/#troubleshooting)