# Providers

## Overview

Terraform relies on plugins called providers to interact with cloud providers.

Each provider includes a set of **resource** and **data sources** for a specific service or set of services.

*For example, the AWS provider allows you to manage AWS resources like EC2 instances, S3 buckets, and IAM roles.*

Providers are released separately from Terraform itself and have their own **version numbers**.

To find providers for the infrastructure platforms you use, browse the [Terraform Registry](https://registry.terraform.io/browse/providers).

Terraform CLI finds and installs providers when initializing a working directory.


## Provider Requirements

A provider requirement block consists of a **local name**, a **source location**, and a **version constraint**:
```hcl
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 3.0.0"
    }
  }

  required_version = ">= 0.14.0"
}

provider "aws" {
  region = "us-west-2"
}
```

In above configuration:
- local name: `aws`
- source location: `hashicorp/aws`
- version constraint `>= 3.0.0`.

This configuration ensures that Terraform uses AWS provider version 3.0.0 or higher and Terraform version 0.14.0 or higher.

`required_providers` block is not mandatory for every provider.


### Local Names

Local names are assigned when requiring a provider. 

Local names must be unique per-module.

Terraform configurations refer to providers by their local names.


### Source Addresses

Source address specifies the primary location where Terraform can download it.

Source addresses format: `[<HOSTNAME>/]<NAMESPACE>/<TYPE>`

- Hostname (optional): The hostname of the Terraform registry that distributes the provider. If omitted, this defaults to `registry.terraform.io`
- Namespace: represents the organization that publishes the provider
- Type: A short name the provider manages, unique within a particular namespace

### Version Constraints

To ensure Terraform always installs the same provider versions for a given configuration, you can use Terraform CLI to create a dependency lock file and commit it to version control along with your configuration.

The `~>` operator allow only patch releases within a specific minor release: `~> 1.0.4`

We recommend **constraining provider versions** in the configuration's provider requirements block to prevent `terraform init` from installing incompatible versions.


## Provider Configuration

A provider configuration is created using a `provider` block:

```hcl
provider "google" {
  project = "acme-app"
  region  = "us-central1"
  alias = "gcp-us1"
}
```

The **name** given in the block header (`"google"` in this example) is the local name of the provider to configure. This provider should already be included in a `required_providers` block.

The **body** of the block contains configuration arguments for the provider. Most arguments are defined by the provider itself, listed in provider documentation on Terraform Registry.

To **use the same provider with different configurations** for different resources, use a meta-arguments [`alias`](https://developer.hashicorp.com/terraform/language/providers/configuration#alias-multiple-provider-configurations).


### Default Configuration

When you declare a provider without specifying a version or alias, Terraform uses the default provider configuration.

The default provider configuration is automatically created for the provider name (e.g., "aws") based on the provider plugin installed.
