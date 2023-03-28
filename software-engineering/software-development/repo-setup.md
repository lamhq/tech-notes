# Repository Setup

## Branch protection

Default branch (`master`, `main`):
- Require a pull request before merging
  - Require approvals
- Require status checks to pass before merging
  - Require branches to be up to date before merging
- Require linear history
- Do not allow bypassing the above settings


## Environment

Should have 3 environment:

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

## Pull request

Repository settings:

- Disable **Allow merge commits**
- Enable **Allow squash merging**, *Default to pull request title and description*.
- Enable **Allow auto-merge**
- Enable **Automatically delete head branches**

Add status checks:

- Run Linter
- Run Unit test
- [Check PR's title follows Conventional Commits](https://github.com/marketplace/actions/conventional-pr-title)

Add [pull request template](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/creating-a-pull-request-template-for-your-repository):

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

## Commit check

Setup `pre-commit` hook:

- Check commit message follows Conventional Commits.
- Check branch name follows patterns: `type/ticket-id/description`.
- Run Linter.


## Add `README.md` file

The content of the README file should have:

- Instructions to setup the local environment and run the code locally
- Development workflow: develop new feature, fix bugs, hot fix.
- Branching strategy
- Directory structure
- Standards used in the code:
  - Code style
  - Commit message
  - File naming
  - Database design
  - API design
- Available scripts
- Tech stack