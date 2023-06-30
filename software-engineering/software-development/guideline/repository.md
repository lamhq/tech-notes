# Repository Setup Guidelines

## Requirement checklist

- The main branch should be protected, and direct commits should not be allowed.
- A linear history is required on the main branch.
- Changes must be submitted via pull requests.
- Merging pull requests must be done through squash merge to achieve a linear history.
- Must have a `README.md` file that information for the repo.


### README file checklist

A `README.md` file should contains:

- Description about the project
- Technology stack
- Instructions to setup the development environment and run the code locally
- Development workflow: develop new feature, fix bugs, hot fix.
- Branching strategy
- Source code structure
- Standards used in the code:
  - Code style
  - Commit message
  - File naming
  - Database design
  - API design


## Github repo setting

### Branch protection

- Go to repository **Settings > Branches > Branch protection rules**
- Click **Add rule**
  - Branch name pattern: `master`
  - Check **Require a pull request before merging**, **Require approvals**
  - Check **Require status checks to pass before merging**, **Require branches to be up to date before merging**
  - Check **Require linear history**

Add status checks:

- Run Linter
- Run Unit test
- [Check PR's title follows Conventional Commits](https://github.com/marketplace/actions/conventional-pr-title)


### Environments

Create 3 environment:

- `dev`: for development team to test
- `staging`: for QA team to test before release
- `prod`: for customer to use

Add secrets for each environment to run CI/CD pipeline.

Environment protection rules:

- `prod`:
  - Required reviewers
  - Limit what branches can deploy: `v?.?.?` (name pattern)
- `staging`:
  - Required reviewers
- `dev`:
  - no protection, code is automatic deploy.


### Pull Requests

- Go to repository **Settings > General > Pull Requests**
- Check **Allow squash merging**, **Default to pull request title and description**
- Uncheck **Allow merge commits**, **Allow rebase merging**
- Check **Allow auto-merge**
- Check **Automatically delete head branches**


### Pull request template

Add file `.github/pull_request_template.md` with content:

```md
## Description

Please include a summary of the changes and the related issue. 

Ticket ID: [name](link)

## Type of change

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] This change requires a documentation update

## How Has This Been Tested?

- Please describe the tests that you ran to verify your changes.
- Provide instructions so we can reproduce.
- Please also list any relevant details for your test configuration

- [ ] Test A
- [ ] Test B

**Test Configuration**:
* Firmware version:
* Hardware:
* Toolchain:
* SDK:

## Please review and confirm

- [ ] I have performed a self-review of my code
- [ ] I have test and confirm that my feature works
- [ ] My code follows the style guidelines of this project
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] New and existing unit tests pass locally with my changes
```

Reference:

https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/creating-a-pull-request-template-for-your-repository
