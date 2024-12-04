# GitLab CI/CD variables

## Define variables

### In `.gitlab-ci.yml`
You can define variables in `.gitlab-ci.yml` file. If the variable is defined:
- In a job, only that job can use it
- In a global (top-level) `variables` section, it acts as a default variable for all jobs. you cannot use global variables as values for other global keywords.

```yml
variables:
  ALL_JOBS_VAR: "A global variable"

job1:
  variables:
    JOB1_VAR: "Job 1 variable"
  script:
    - echo "Variables are '$ALL_JOBS_VAR' and '$JOB1_VAR'"

job2:
  variables:
    ALL_JOBS_VAR: "Different value than global"
    JOB2_VAR: "Job 2 variable"
  script:
    - echo "Variables are '$ALL_JOBS_VAR', '$JOB2_VAR', and '$JOB1_VAR'"
```

To ensure consistent behavior, you should always put variable values in single `'` or double quotes `"`.

### In the UI

For sensitive variables, you can define CI/CD variables in the UI:
- For a project in the [project's settings](https://docs.gitlab.com/ee/ci/variables/#for-a-project).
- For all projects in a group in the [group's setting](https://docs.gitlab.com/ee/ci/variables/#for-a-group).
- For all projects in a GitLab instance in the [instance's settings](https://docs.gitlab.com/ee/ci/variables/#for-an-instance).

When creating a variable, you can set it to only be available for certain **environments**.


## Accessing variables in job scripts

Prefix the variable with `$` (linux shell):
```yml
job_name:
  script:
    - echo "$CI_JOB_ID"
```

You can use variables inside other variables:
```yml
job:
  variables:
    FLAGS: '-al'
    LS_CMD: 'ls "$FLAGS"'
    DIR: 'path/to/directory'
    CD_CMD: 'cd "${DIR}_files"'
  script:
    - 'eval "$LS_CMD"'  # Executes 'ls -al'
    - 'eval "$CD_CMD"'  # Executes 'cd path/to/directory_files'    
```

Variable can also be used to create environment dynamically:
```yml
my-job:
  stage: staging
  environment:
    name: review/$CI_JOB_STAGE/deploy
  script:
    - 'deploy staging'
  rules:
    - if: $STAGING_SECRET == 'something'
```


## Secure variables

You can mask a CI/CD variables so the value of the variable does not display in job logs.

You can also prevent the value of CI/CD variables from being revealed in the CI/CD settings page.

You can configure a CI/CD variable to be available only to pipelines that run on protected branches or protected tags.

You can use File type variables (variables whose value is a file path) for commands that need a file as input (e.g., the AWS CLI)


## List all variables

You can list all variables available to a script with the `export` command:
```yml
job_name:
  script:
    - export
```

## Other topics

- [Predefined CI/CD variables](https://docs.gitlab.com/ee/ci/variables/predefined_variables.html)
- [Pass an environment variable to another job](https://docs.gitlab.com/ee/ci/variables/#pass-an-environment-variable-to-another-job)
- [Pass an environment variable to another section](https://docs.gitlab.com/ee/ci/variables/#pass-an-environment-variable-from-the-script-section-to-another-section-in-the-same-job)
- [Use pipeline variables](https://docs.gitlab.com/ee/ci/variables/#use-pipeline-variables)
- [Limit scope of variable](https://docs.gitlab.com/ee/ci/environments/#limit-the-environment-scope-of-a-cicd-variable)
- [Enable debug logging (not recommended)](https://docs.gitlab.com/ee/ci/variables/#enable-debug-logging)