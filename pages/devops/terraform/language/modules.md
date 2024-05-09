# Modules

_Modules_ are containers for multiple resources that are used together.

A module consists of a collection of `.tf` and/or `.tf.json` files in a directory.


## The Root Module

The **root module** consists of `.tf` files in the main working directory.


## Child Modules

A module that has been called by another module is often referred to as a **child module**.

Child modules can be called multiple times within the same configuration, and multiple configurations can use the same child module.


## Published Modules

Terraform can load modules from a public or private registry.

The [Terraform Registry](https://registry.terraform.io/browse/modules) offers a wide range of public modules for common infrastructure setup.

[Terraform Cloud](https://cloud.hashicorp.com/products/terraform) and [Terraform Enterprise](https://developer.hashicorp.com/terraform/enterprise) both include a private
module registry for sharing modules internally within your organization.


## Calling a Child Module

To call a module means to include the contents of that module into the configuration with specific values for its input variables.

Modules are called from within other modules using `module` blocks:

```hcl
module "servers" {
  source = "./app-cluster"

  servers = 5
}
```

The label immediately after the `module` keyword is a local name, used to refer to this instance of the module.

Within the block body (between `{` and `}`) are the arguments for the module:

- The `source` argument tells Terraform where to find the source code for the desired child module.
- The `version` argument defines the acceptable version numbers, recommended for modules from a registry.
- Input variables defined by the module.
- [Other meta-arguments](https://developer.hashicorp.com/terraform/language/modules/syntax#meta-arguments) that can be used with all modules


## Accessing Module Output Values

```hcl
resource "aws_elb" "example" {
  # ...

  instances = module.servers.instance_ids
}
```


## Module Sources

Value of the `source` argument can be:

- Local paths
- Terraform Registry
- GitHub
- Bitbucket
- Generic Git, Mercurial repositories
- HTTP URLs
- S3 buckets
- GCS buckets
- Modules in Package Sub-directories

See [Module Sources](https://developer.hashicorp.com/terraform/language/modules/sources) for detailed information.


## Module meta-arguments

https://developer.hashicorp.com/terraform/language/meta-arguments/module-providers