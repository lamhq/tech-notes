# Project checklist

## Development Process

- Commit message follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- Automic validation of commit messages (pre-commit hook)
- Automic running linting rules (pre-commit hook)
- Default branch are protected (on Github)
- Integrated Linter & Formatter with IDE (ESLint)
- Code review
- Code merge done through Pull requests
- Pull request template with description, task id
- Pull requests are small

## System

- ER diagram
- Workflow diagram
- Architecture diagram
- A list of previous problems are documented
- Environments are documented.
- Release & deploy are documented
- Every release have a release tag and Changelog
- Team members, contacts and roles are documented
- Monitoring is documented
- Enable deploying manually (in case CI server goes down)
- Enable rolling back deployment
- Errors are tracked (sentry)
- Able to replicated errors
- Notification on error (slack, email)
- Support multiple environments
- Method to replicate an environment is documented
- Logging is turned on
- Logs do not contain sensitive data
- No secrets are stored in version control
- Collect development time (%)
- Collect bug fix time (%)
- Delivery performance metrics collected
- Delivery quality metrics collected
- Team health metrics collected
- Business metrics are collected (mixpanel, google analytic)

## Backend (API)

- README file
    - project title, description
    - Tech stack
    - Install & run
    - Source code structure
    - Code style
    - Commit format & branching strategy
- Automatic API documentation (swagger)
- API app is containerized (with Dockerfile)
- A single place to manage all scripts (package.json)
- Database migration is included in code
- Validate request data
- Automatic production database backup
- Long-running processes such as email should delivery being run in background jobs.
- API  app should run at least 2 instances
- Auto scaling ability (API server)

## Team health

- Team members actively communicate
- Team members sharing ideas and give feedback
- Team members share responsibilities

## QA

- create test cases for main features