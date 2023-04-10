# Release Please

Release Please automates CHANGELOG generation, the creation of GitHub releases, and version bumps for your projects.

## How release please works

Release Please automates CHANGELOG generation, the creation of GitHub releases, and version bumps for your projects. Release Please does so by parsing your git history, looking for [Conventional Commit messages](https://www.conventionalcommits.org/), and creating release PRs.

Rather than continuously releasing what's landed to your default branch, release-please maintains Release PRs. These Release PRs are kept up-to-date as additional work is merged. When you're ready to tag a release, simply merge the release PR.


## How should I write my commits?

Release Please assumes you are using [Conventional Commit messages](https://www.conventionalcommits.org/).

The most important prefixes you should have in mind are:

* `fix:` which represents bug fixes, and correlates to a [SemVer](https://semver.org/)
  patch.
* `feat:` which represents a new feature, and correlates to a SemVer minor.
* `feat!:`,  or `fix!:`, `refactor!:`, etc., which represent a breaking change
  (indicated by the `!`) and will result in a SemVer major.


## Set up github action

Create a `.github/workflows/release-please.yml` file with these contents:

```yml
on:
  push:
    branches:
      - main

permissions:
  contents: write
  pull-requests: write

name: release-please

jobs:
  release-please:
    runs-on: ubuntu-latest
    steps:
      - uses: google-github-actions/release-please-action@v3
        with:
          release-type: node
          package-name: release-please-action
```

## Set up Repository

### Add PR permission for GitHub Actions

- Go to repository **Settings > Code and automation > Actions > General > Workflow permissions** 
- check **Allow GitHub Actions to create and approve pull requests**.


## Reference

- https://github.com/google-github-actions/release-please-action
- https://remarkablemark.org/blog/2023/01/28/release-please-failed-error-creating-pull-request-resource-not-accessible-by-integration/