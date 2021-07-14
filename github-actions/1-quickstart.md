# Quickstart

## Sample

1. Create a new file `.github/workflows/github-actions-demo.yml` in your repository with the following contents:

```yml
name: GitHub Actions Demo
on: [push]
jobs:
  Explore-GitHub-Actions:
    runs-on: ubuntu-latest
    steps:
      - run: echo "The job was automatically triggered by a ${{ github.event_name }} event."
      - run: echo "This job is now running on a ${{ runner.os }} server hosted by GitHub!"
      - run: echo "The name of your branch is ${{ github.ref }} and your repository is ${{ github.repository }}."

      - name: Check out repository code
        uses: actions/checkout@v2
      - run: echo "The ${{ github.repository }} repository has been cloned to the runner."
      - run: echo "The workflow is now ready to test your code on the runner."
      - name: List files in the repository
        run: |
          ls ${{ github.workspace }}
      - run: echo "🍏 This job's status is ${{ job.status }}."
```

2. Committing the workflow file to a branch in your repository triggers the `push` event and runs your workflow.

3. Go to the main page of the repository on Github, click **Actions** to view your workflow results

Getting parameters in workflow definition file:

- Event name: `${{ github.event_name }}`
- Branch name: `${{ github.ref }}`
- Repository: `${{ github.repository }}`
- Event name: `${{ github.event_name }}`
- Runner OS: `${{ runner.os }}`