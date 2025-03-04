# Development workflow (simple)

## Overview

This document describe a simple development workflow for small projects.

Only contains use cases for developing features and bug fixes.

Lack of instructions for situtations: release, hot fix, rollback.


## Intro

This project use [GitHub Flow](https://docs.github.com/en/get-started/using-github/github-flow), a lightweight and branch-based workflow.

Github Flow can be used with [Trunk-Based Development](https://trunkbaseddevelopment.com/), a version control management practice.


## Branch names

| name | description |
| :--- | :--- |
| `master` | the main branch, stable, production-ready, used to deploy to production |
| `feat/{ticker-id}/{description}` | derived from the main branch. For developing new function. |
| `fix/{ticker-id}/{description}` | derived from the main branch. For bug fix. |


## Start a new feature

1. Create a feature branch from the main branch.
    ```sh
    git checkout master
    git checkout -b 'feat/MEGA-123/commit-convention'
    git push --set-upstream origin 'feat/MEGA-123/commit-convention'
    ```
1. Make changes and push them to to your branch.
1. When you're satisfied with your work, open a pull request (PR) from your branch to the main branch. The title of the PR must follows [conventional commit format](https://www.conventionalcommits.org/en/v1.0.0/).

## Finish a feature

1. Collaborators review your PR, leave comments, and approve it if everything looks good.
2. You may need to update PR base on reviewer's feedback.
3. Once approved, you can merge (**squash merge**) your branch into the main branch.
4. The changes are now part of the main project.

*Squash merge will consolidate all the changes from your development branch into a single commit on the main branch, making it easier to manage and review code changes.*

## Bug fix

Similar to [Start a new feature](#start-a-new-feature). But the branch name should be: `fix/{ticker-id}/{description}`.
