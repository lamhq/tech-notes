# Using environment variables

```yml
jobs:
  weekday_job:
    runs-on: ubuntu-latest
    env:
      DAY_OF_WEEK: Mon
    steps:
      - name: "Hello world when it's Monday"
        if: ${{ env.DAY_OF_WEEK == 'Mon' }}
        run: echo "Hello $FIRST_NAME $middle_name $Last_Name, today is Monday!"
        env:
          FIRST_NAME: Mona
          middle_name: The
          Last_Name: Octocat
```


## Specifying environment variables

To set custom environment variables, you need to specify the variables in the workflow file. You can define environment variables for a step, job, or entire workflow using:

- `jobs.<job_id>.steps[*].env`
- `jobs.<job_id>.env`
- `env`

## Updating an environment variable

`echo "{name}={value}" >> $GITHUB_ENV`

```yml
steps:
  - name: Set the value
    id: step_one
    run: |
      echo "action_state=yellow" >> $GITHUB_ENV
  - name: Use the value
    id: step_two
    run: |
      echo "${{ env.action_state }}" # This will output 'yellow'
```

For multiline strings, you may use a delimiter with the following syntax.

```
{name}<<{delimiter}
{value}
{delimiter}
```

## Using environment variables

To use the value of an environment variable in a workflow file, you should use the `env` context. 

```yml
jobs:
  weekday_job:
    env:
      DAY_OF_WEEK: Mon
    steps:
      - name: "Hello world when it's Monday"
        if: ${{ env.DAY_OF_WEEK == 'Mon' }}
```

If you want to use the value of an environment variable inside a runner, you can use the runner operating system's normal method for reading environment variables.


## Default environment variables

Check [here](https://docs.github.com/en/actions/reference/environment-variables#default-environment-variables).


## Load environment variables from Dotenv

```yml
jobs:
  deploy:
    steps:
      - name: Set env vars (dev)
        uses: c-py/action-dotenv-to-setenv@v3
        with:
          env-file: .env
```


## Deploy to multiple environments

Here's an example to deploy to multiple environments from a single workflow yaml file.

```yml
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Set env vars (dev)
        if: endsWith(github.ref, '/dev')
        run: |
          echo "AZURE_FUNCTIONAPP_NAME=azfunccdgh-dev-function-app" >> $GITHUB_ENV
          echo "PUBLISH_PROFILE_VAR_NAME=AZURE_FUNCTIONAPP_PUBLISH_PROFILE_DEV" >> $GITHUB_ENV
      - name: Set env vars (prod)
        if: endsWith(github.ref, '/master')
        run: |
          echo "AZURE_FUNCTIONAPP_NAME=azfunccdgh-prod-function-app" >> $GITHUB_ENV
          echo "PUBLISH_PROFILE_VAR_NAME=AZURE_FUNCTIONAPP_PUBLISH_PROFILE_PROD" >> $GITHUB_ENV

      - name: Run Azure Functions action
        uses: Azure/functions-action@v1
        id: fa
        with:
          app-name: ${{ env.AZURE_FUNCTIONAPP_NAME }}
          package: ${{ env.AZURE_FUNCTIONAPP_PACKAGE_PATH }}
          publish-profile: ${{ secrets[env.PUBLISH_PROFILE_VAR_NAME] }}
          respect-funcignore: true          
```