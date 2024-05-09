# Providers

## Overview

Terraform relies on **plugins** called providers to interact with cloud providers.

**Terraform configurations** must declare which providers they require so that Terraform can install and use them.

Each provider adds a set of **resource types** and/or **data sources** that Terraform can manage.

Providers are released separately from Terraform itself and have their own **version numbers**.

To find providers for the infrastructure platforms you use, browse the [Terraform Registry](https://registry.terraform.io/browse/providers).

Each provider has its own documentation, describing its resource types and their arguments.

Terraform CLI finds and installs providers when initializing a working directory.

To save time and bandwidth, you can enable the plugin cache using the `plugin_cache_dir` setting in the CLI configuration file.


## Provider Requirements

Terraform configurations must declare which providers they require.

A provider requirement consists of a **local name**, a **source location**, and a **version constraint**:
```hcl
terraform {
  required_providers {
    mycloud = {
      source  = "mycorp/mycloud"
      version = "~> 1.0"
    }
  }
}

provider "mycloud" {
  # ...
}
```

The above configuration declares `mycloud` as the local name for ` mycorp/mycloud` (source address) with version constraint `~> 1.0`.

`required_providers` block is not mandatory for every provider.

Provider declaration typically used when you want to specify the minimum required version of a provider or when you need to use a non-default provider configuration.


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


## Develop Providers

Providers are written in Go, using the Terraform Plugin SDK.


## Dependency Lock File

Check the [Official documentation](https://developer.hashicorp.com/terraform/language/files/dependency-lock).