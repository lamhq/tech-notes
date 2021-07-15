# Encrypted secrets

Secrets are encrypted environment variables that you create in:

- an organization
- a repository
- an environment

For secrets stored at the **organization-level**, you can use access policies to control which repositories can use organization secrets. Organization-level secrets let you share secrets between multiple repositories, which reduces the need for creating duplicate secrets. Updating an organization secret in one location also ensures that the change takes effect in all repository workflows that use that secret.

For secrets stored at the environment level, you can enable required reviewers to control access to the secrets. A workflow job cannot access environment secrets until approval is granted by required approvers.

Secret names must be unique at the level they are created at( environment, repository level, organization level)

## Creating secrets for a repository

1. On GitHub, navigate to the main page of the repository.
2. Under your repository name, click Settings.
3. In the left sidebar, click **Secrets**.
4. Click New repository secret.
5. Type a name for your secret in the Name input box.
6. Enter the value for your secret.
7. Click Add secret.

## Creating secrets for an environment

1. On GitHub, navigate to the main page of the repository.
2. Under your repository name, click  Settings.
3. In the left sidebar, click Environments.
4. Click on the environment that you want to add a secret to.
5. Under Environment secrets, click Add secret.
6. Type a name for your secret in the Name input box.
7. Enter the value for your secret.
8. Click Add secret.

## Creating secrets for an organization

When creating a secret in an organization, you can use a policy to limit which repositories can access that secret. 

1. On GitHub, navigate to the main page of the organization.
2. Under your organization name, click  Settings.
3. In the left sidebar, click Secrets.
4. Click New organization secret.
5. Type a name for your secret in the Name input box.
6. Enter the Value for your secret.
7. From the Repository access dropdown list, choose an access policy.
8. Click Add secret.


## Accessing secrets

To make a secret available to an action, you must set the secret as an input or environment variable in the workflow file. 

```yml
steps:
  - name: Hello world action
    with: # Set the secret as an input
      super_secret: ${{ secrets.SuperSecret }}
    env: # Or as an environment variable
      super_secret: ${{ secrets.SuperSecret }}
  - shell: bash
    env:
      SUPER_SECRET: ${{ secrets.SuperSecret }}      
    run: |
      example-command "$SUPER_SECRET"   
```

**Warning**: GitHub automatically redacts secrets printed to the log, but you should avoid printing secrets to the log intentionally.

Avoid passing secrets between processes from the command line, whenever possible. Command-line processes may be visible to other users or captured by security audit events. To help protect secrets, consider using environment variables, STDIN, or other mechanisms supported by the target process.