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


## Next

- [Run a job after a delay](https://docs.gitlab.com/ee/ci/jobs/job_control.html#run-a-job-after-a-delay)
- [Split a large job into multiple smaller jobs that run in parallel](https://docs.gitlab.com/ee/ci/jobs/job_control.html#parallelize-large-jobs)