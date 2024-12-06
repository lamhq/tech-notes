# GitLab CI/CD

## Runners

Runners are the applications that run your jobs. 

Agents can run on physical machines or virtual instances.

You can use runners on GitLab.com (Linux, Windows, macOS) or register your own runners **on** GitLab.com / self-managed instance / your local machine.


## Pipelines

GitLab pipelines are automated workflows that build, test, and deploy your code.

You define a pipeline in the `.gitlab-ci.yml` file, located at the root of your project.

Pipelines are made up of **jobs** and **stages**:
- **Stages** define the order of execution. Typical stages might be build, test, and deploy.
- **Jobs** specify the tasks to be performed in each stage. For example, compile or test code.

Pipelines can be triggered by events (commits, merges, ...) or on schedule.


## Variables

Variables are key-value pairs you use to store and pass configuration settings and sensitive information to jobs.

You can define variables:
- in `.gitlab-ci.yml` file (hard-coded)
- in project settings
- generate dynamically

There're two types of variables:
- Predefined variables: set by GitLab, provide information about the current job, pipeline, and environment.
- Custom variables: defined by user

Variables can be marked as "**protected**" or "**masked**" for added security.
- Protected variables are only available to jobs running on protected branches or tags.
- Masked variables have their values hidden in job logs


## CI/CD components

A CI/CD component is a reusable pipeline.

Reusable components help reduce duplication, improve maintainability, and promote consistency across projects.

You can add a component to your pipeline with `include:component` syntax.

You can create a component and publish it to the CI/CD Catalog to share your component across multiple projects.

GitLab also has CI/CD component templates for common tasks and integrations.


## GitLab CI/CD templates

Check this link for a list of [GitLab CI/CD templates](https://gitlab.com/gitlab-org/gitlab/-/tree/master/lib/gitlab/ci/templates).