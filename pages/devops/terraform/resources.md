# Resources

## Overview

Each resource block describes one or more infrastructure objects:
- virtual networks
- compute instances
- higher-level components such as DNS records
- ...


## Resource block

A `resource` block declares a resource of a specific **type** with a specific local **name**.

### Example

In the following example,  the `aws_instance` resource type is named `web`:

```hcl
resource "aws_instance" "web" {
  ami           = "ami-a1b2c3d4"
  instance_type = "t2.micro"
}
```

Within the block body (between `{` and `}`) are the configuration **arguments** for the resource itself.

`"ami-a1b2c3d4"` and `"t2.micro"` are expressions.


## Resource Types

Each resource is associated with a single resource type.

A resource type determines:
- the kind of infrastructure object it manages
- arguments and attributes the resource supports


## Resource Arguments

Most of the arguments within the body of a resource block are specific to the selected resource type. 

The resource type's documentation lists which arguments are available and how their values should be formatted.


## Providers

A [provider](https://registry.terraform.io/browse/providers) is a plugin for Terraform that offers a collection of resource types.

Providers are distributed separately from Terraform.

Based on a resource type's name, Terraform can usually determine which provider to use.

You can use the `provider` meta-argument to manually choose a provider configuration.

Most providers need some configuration to access their remote API, which is provided by the root module.

Every Terraform provider has its own documentation, describing its resource types and their arguments.

The [Terraform Registry](https://registry.terraform.io/browse/providers) is the main home for all publicly available provider docs.


## Meta-arguments

Meta-arguments are defined by Terraform, can be used with any resource type to change the behavior of resources.

- `depends_on`, for specifying hidden dependencies
- `count`, for creating multiple resource instances according to a count
- `for_each`, to create multiple instances according to a map, or set of strings
- `provider`, for selecting a non-default provider configuration
- `lifecycle`, for lifecycle customizations
- `provisioner`, for taking extra actions after resource creation

Check [Resource Meta-arguments](https://developer.hashicorp.com/terraform/language/meta-arguments/depends_on) for detailed information.


## Resource Behavior

When Terraform creates an infrastructure object from a resource block, it stores the object's identifier in its state for future updates or destruction.

For existing objects in the state, Terraform checks and aligns their actual configuration with the defined arguments, updating them as needed.

Applying a Terraform configuration will:

- Create resources that exist in the configuration but are not associated with a real infrastructure object in the state.
- Destroy resources that exist in the state but no longer exist in the configuration.
- Update in-place resources whose arguments have changed.
- Destroy and re-create resources whose arguments have changed but which cannot be updated in-place due to remote API limitations.


## Accessing Resource Attributes

Expressions within a Terraform module can access information about resources in the same module.

Use the `<RESOURCE TYPE>.<NAME>.<ATTRIBUTE>` syntax to reference a resource attribute in an expression.

Consider the following example resource block:
```hcl
resource "aws_instance" "example" {
  ami           = "ami-abc123"
  instance_type = "t2.micro"

  ebs_block_device {
    device_name = "sda2"
    volume_size = 16
  }
  ebs_block_device {
    device_name = "sda3"
    volume_size = 20
  }

  device "foo" {
    size = 2
  }
  device "bar" {
    size = 4
  }
}
```

Get the value of `ami` argument:

```hcl
aws_instance.example.ami
```

Obtain a list of all `device_name` values in `ebs_block_device`:

```hcl
aws_instance.example.ebs_block_device[*].device_name
```

Get the value of `size` argument of `device` block named  `foo`:

```hcl
aws_instance.example.device["foo"].size
```

Reference: [References to Resource Attributes](https://developer.hashicorp.com/terraform/language/expressions/references#references-to-resource-attributes).
