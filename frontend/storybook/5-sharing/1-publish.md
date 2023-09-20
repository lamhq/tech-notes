# Publish Storybook

**Teams publish Storybook online** to review and collaborate on works in progress.

That allows developers, designers, PMs, and other stakeholders to check if the UI looks right **without touching code or requiring a local dev environment**.


## Build Storybook

```shell
pnpm run build-storybook
```

Storybook will create a static web application capable of being served by any web server. Preview it locally by running the following command:

```shell
pnpm dlx http-server ./path/to/build
```


## Publish Storybook

Once you've built your Storybook as a static web application, you can publish it to your web host.

We recommend Chromatic, a free publishing service made for Storybook that documents, versions, and indexes your UI components securely in the cloud.

1. Sign up to [Chromatic](https://www.chromatic.com/) and generate a unique project-token.
1. install the Chromatic CLI package from npm:
    ```shell
    npm install chromatic --save-dev
    ```
1. Deploy your Storybook
    ```shell
    npm install chromatic --save-dev
    ```
1. Preview it by clicking the link provided
    ```text
    Build 1 published.

    View it online at https://www.chromatic.com/build?appId=...&number=1.
    ```

## Setup CI to publish automatically

Configure your CI environment to publish your Storybook whenever you push code to a repository. Let's see how to set it up using **GitHub Actions**.

```yml
# .github/workflows/chromatic.yml

# Workflow name
name: 'Chromatic Publish'

# Event for the workflow
on: push

# List of jobs
jobs:
  test:
    # Operating System
    runs-on: ubuntu-latest
    # Job steps
    steps:
      - uses: actions/checkout@v3
      - run: yarn
        #👇 Adds Chromatic as a step in the workflow
      - uses: chromaui/action@v1
        # Options required for Chromatic's GitHub Action
        with:
          #👇 Chromatic projectToken,
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          token: ${{ secrets.GITHUB_TOKEN }}
```

Now whenever you open a PR you’ll get a handy link to your published Storybook in your PR checks.