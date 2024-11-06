# Terraform Language

## Overview

Terraform language is used for declaring resources. Resources represent infrastructure objects.

Terraform language lets you:
- define dependencies between resources
- create multiple similar resources from a single configuration block.

The Terraform language consists of **blocks**, **arguments** and **expressions**.


## Blocks

Blocks are containers for other content and usually represent the configuration of some kind of object, like a resource.

Blocks have a **block type**, can have zero or more **labels**, and have a body that contains any number of **arguments** and **nested blocks**.

```hcl
resource "aws_instance" "example" {
  ami = "abc123"
  instance_type = "t2.micro"

  network_interface {
    # ...
  }
}
```
In above example:
- block type: `resource`
- label: `aws_instance`
- local name: `example`
- block arguments: `ami`, `instance_type`
- nested block: `network_interface`


## Arguments

Arguments assign a value to a name. They appear within **blocks**.

```hcl
ami = "abc123"
```


## Expressions

Expressions represent a value, either literally or by referencing and combining other values.

Examples: `"hello"`, `15`, `local.region`, ...
