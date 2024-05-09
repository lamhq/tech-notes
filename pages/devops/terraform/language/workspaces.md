# Workspaces

## Overview

The persistent data stored in the backend belongs to a workspace.

Some backends support multiple named workspaces, allowing multiple states to be associated with a single configuration.

Workspaces allows deploying multiple distinct instances of that configuration without configuring a new backend or changing authentication credentials.

The Terraform CLI workspaces are different from workspaces in Terraform Cloud.

Terraform starts with a single, default workspace named `default` that you cannot delete.


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
