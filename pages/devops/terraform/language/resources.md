# Resources

## Overview

Each resource block describes one or more infrastructure objects:
- virtual networks
- compute instances
- higher-level components such as DNS records
- ...


## Resource block

A `resource` block declares a resource of a specific **type** with a specific local **name**.

```hcl
resource "aws_instance" "web" {
  ami           = "ami-a1b2c3d4"
  instance_type = "t2.micro"
}
```

In above example:
- resource type: `aws_instance`
- local name: `web`
- expressions are `"ami-a1b2c3d4"` and `"t2.micro"`.
- within the block body (between `{` and `}`) are the configuration **arguments** for the resource itself.


## Resource Types

Each resource is associated with a single resource type.

A resource type determines:
- the kind of infrastructure object it manages
- arguments and attributes the resource supports


## Resource Arguments

Most of the arguments within the body of a resource block are specific to the selected resource type. 

The resource type's documentation lists which arguments are available and how their values should be formatted.


## Providers

Based on a resource type's name, Terraform can usually determine which provider to use.

You can use the `provider` meta-argument to manually choose a provider configuration:
```hcl
resource "aws_instance" "foo" {
  provider = aws.west

  # ...
}
```

To select alternate provider configurations for a child module, use its `providers` meta-argument:
```hcl
module "aws_vpc" {
  source = "./aws_vpc"
  providers = {
    aws = aws.west
  }
}
```

If a resource doesn't specify which provider configuration to use, Terraform interprets the first word of the resource type as a local provider name (e.g., `aws_instance`, `aws_security_group`).


## Meta-arguments

Meta-arguments are defined by Terraform, can be used with any resource type to change the behavior of resources.

- `depends_on`, for specifying hidden dependencies
- `count`, for creating multiple resource instances according to a count
- `for_each`, to create multiple instances according to a map, or set of strings
- `provider`, for selecting a non-default provider configuration
- `lifecycle`, for lifecycle customizations
- `provisioner`, for taking extra actions after resource creation

```hcl
resource "aws_instance" "server" {
  count = 4 # create four similar EC2 instances

  ami           = "ami-a1b2c3d4"
  instance_type = "t2.micro"

  tags = {
    Name = "Server ${count.index}"
  }
}
```

Check [Resource Meta-arguments](https://developer.hashicorp.com/terraform/language/meta-arguments/depends_on) for detailed information.


## Resource Behavior

When Terraform manages infrastructure:
- It records resource IDs in the state for management.
- It updates resources to match their intended configuration.


Applying a Terraform configuration will:
- Create new resources defined in the configuration.
- Update existing resources to match the configuration.
- Destroy resources removed from the configuration.
- Replace resources that cannot be updated in-place due to API constraints.


## Accessing Resource Attributes

Expressions can access information about resources in the same module.

Use the syntax: `<RESOURCE TYPE>.<NAME>.<ATTRIBUTE>`.

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


## Provisioner

**Terraform provisioners** are specific built-in components that allow you to execute scripts on a local or remote machine as part of the resource creation or destruction process.

They enable additional configuration and setup tasks that can't be accomplished with Terraform's declarative syntax alone.

### Purpose

Provisioners are used to model specific actions on local or remote machines in order to prepare infrastructure objects for service.

### Caveats

While Terraform emphasizes a declarative approach, provisioners are considered a **last resort**. They exist because certain behaviors cannot be directly represented in Terraform's declarative model.

Provisioners add complexity and uncertainty to Terraform usage. They require coordinating details such as network access, credentials, and external software installation.

### Use cases

Provisioners can be used for scenarios like:
- passing data into virtual machines
- executing scripts during resource creation
- performing custom setup tasks

### Types of Provisioners**
- **local-exec**: Executes commands on the local machine where Terraform is running.
- **remote-exec**: Executes commands on a remote machine over SSH or WinRM.
- **file**: Uploads files to a remote machine.
- **chef**: Integrates with Chef for configuration management (deprecated in recent Terraform versions).
- **puppet**: Integrates with Puppet for configuration management (deprecated in recent Terraform versions).

Remember that while provisioners provide flexibility, it's recommended to explore more declarative ways to handle provisioning actions before resorting to them.
