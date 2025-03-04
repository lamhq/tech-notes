# Workspaces

## Overview

Terraform workspaces are a feature that allows you to manage multiple environments within a single Terraform configuration.

Each workspace is a separate instance of your infrastructure, with its own state file and variables.

Changes in one workspace do not affect the others. This is particularly useful for managing different environments like development, staging, and production without needing separate configurations for each.

The Terraform CLI workspaces are different from workspaces in Terraform Cloud.

Terraform starts with a single, default workspace named `default` that you cannot delete.


## Creating new workspace

```sh
terraform workspace new <workspace_name>
```

## Switching workspaces

```sh
terraform workspace select <workspace_name>
```

## Listing workspaces

```sh
terraform workspace list
```


## Referencing Current workspace

Within your Terraform configuration, you may include the name of the current workspace using the `${terraform.workspace}` interpolation


## Use cases

For non-default workspaces, it may be useful to spin up smaller cluster sizes.

```hcl
resource "aws_instance" "example" {
  count = "${terraform.workspace == "default" ? 5 : 1}"

  # ... other arguments
}
```

Another popular use case is using the workspace name as part of naming or tagging behavior.

```hcl
resource "aws_instance" "example" {
  tags = {
    Name = "web - ${terraform.workspace}"
  }

  # ... other arguments
}
```


## S3 backend

When using S3 backend, each workspace will have a dedicated state file in S3.

When configuring your S3 backend, it's important to specify a unique `key` for each workspace to ensure their states are isolated and managed separately:

```hcl
terraform {
  backend "s3" {
    bucket = "your-bucket-name"
    key    = "project-name/workspace/terraform.tfstate"
    region = "us-west-2"
  }
}
```

For state locking, Terraform can use the same DynamoDB table across all workspaces.