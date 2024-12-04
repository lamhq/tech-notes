# Environments

## Overview

An environment:
- Can monitor and deploy to its target infrastructure.
- Has its own variables.
- Can be long-lived or ephemeral.

Access to an environment can be controlled.

You cannnot rename an environment.


## View environments

On the left sidebar, select **Operate > Environments**.

![](https://docs.gitlab.com/ee/ci/environments/img/environments_list_v14_8.png)

To view a list of deployments for an environment, select the environment name:
![](https://docs.gitlab.com/ee/ci/environments/img/deployments_list_v13_10.png)


## Types of environments

### Static environments

- Are usually reused by successive deployments.
- Have static names. For example, staging or production.
- Are created manually or as part of a CI/CD pipeline.

### Dynamic environments

- Are usually created in a CI/CD pipeline and are used by only a single deployment, then either stopped or deleted.
- Have dynamic names, usually based on the value of a CI/CD variable.
- Are a feature of review apps.


## Create environments

You can create a static environment in the UI.

You can create environments in `.gitlab-ci.yml` file:
```yml
deploy_staging:
  stage: deploy
  script:
    - echo "Deploy to staging server"
  environment:
    name: staging
    url: https://staging.example.com
```

You can use CI/CD variables in environment name to create dynamic environments:
```yml
deploy_review_app:
  stage: deploy
  script: make deploy
  environment:
    name: review/$CI_COMMIT_REF_SLUG
    url: https://$CI_ENVIRONMENT_SLUG.example.com
  rules:
    - if: $CI_COMMIT_BRANCH == "main"
      when: never
    - if: $CI_COMMIT_BRANCH
```

If you use custom names for environments, to indicate that a specific environment is for a specific use, you can use `deployment_tier` keyword:
```yml
deploy:
  script: echo
  environment:
    name: customer-portal
    deployment_tier: production
```

## Group environments

You can group environments into collapsible sections in the UI by naming environments with the same prefix:
```yml
deploy_review:
  stage: deploy
  script:
    - echo "Deploy a review app"
  environment:
    name: review/$CI_COMMIT_REF_SLUG
```

![](https://docs.gitlab.com/ee/ci/environments/img/environments_dynamic_groups_v13_10.png)


## Protected environments

A protected environment ensures that only people with the appropriate privileges can deploy to it.

Protected environments feature only are available in the **Premium** and **Ultimate** plans.

To protect an environment:
1. Go to **Settings > CI/CD**
2. Expand **Protected environments**
3. Select the environment you want to protect
4. In the **Allowed to deploy** list, select the role, users, or groups you want to give deploy access to
5. In the **Approvers** list, select the role, users, or groups you want to give deploy access to.


## Review Apps

GitLab's **Review Apps** feature is a tool that allows developers to create temporary environments for each merge request (MR).

This makes it easy to preview and test changes in an isolated environment before merging them into the main codebase.

1. **Isolated Environments**: Each MR gets its own unique environment, ensuring that changes can be reviewed and tested without affecting the main application.
2. **Automatic Deployment**: When a new MR is created, a Review App is automatically deployed, making it easy for developers and reviewers to see the changes in action.
3. **Collaborative Review**: Review Apps facilitate better collaboration by allowing team members to provide feedback on the actual running application, rather than just code reviews.
4. **Easy Cleanup**: Once an MR is merged or closed, the corresponding Review App is automatically removed, keeping the environment clean and manageable.


## Other Topics

- [Set environment URL after job run](https://docs.gitlab.com/ee/ci/environments/#set-a-dynamic-environment-url)