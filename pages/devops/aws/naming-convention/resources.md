# Resource Naming Convention

A suggestion about how AWS resources should be named.

## Separator

Use hyphen (`-`) instead of underscores (`_`). 

More readable, be consistent with many official AWS documentation examples.

Easier to manage resource permission using name prefix.

## Prefix

Should have a prefix that follow the format `${project}-${env}-`, where:
- `project`: short name of the project or application
- `env`: runtime environment, for example: `dev`, `staging`, `prod`

Examples: `teno-dev-log-group`, `gojo-prod-bucket`


## Subfix

Should have a subfix that describe the resource type:
- API Gateway: `-api`
- Lambda function:
  - Handler: `-handler`
  - Trigger: `-trigger`
  - General purposes: `-fn`
- IAM Role: `-role`
- IAM Policy: `-policy`
- Policy attachment: `-pol-att`
