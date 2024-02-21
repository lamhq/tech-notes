# Expressions

## Overview

Expressions refer to or compute values within a configuration

Expressions can be:
- literal values, like `"hello"` or `5`
- references to data exported by resources
- arithmetic
- conditional evaluation
- built-in functions.


## Types and Values

- `string`: `"hello"`.
- `number`: `15`, `6.283185`.
- `bool`: `true` or `false`
- `list` (or tuple): `["us-west-1a", "us-west-1c"]`, `local.list[3]`
- `set`: a collection of unique values that do not have any secondary identifiers or ordering.
- `map` (or object): a group of values identified by named labels, `{name = "Mabel", age = 52}`. `local.object.attrname`
- `null`: a value that represents absence or omission.


## Strings

### Quoted string

```hcl
"hello"
```

See the list of [Escape Sequences](https://developer.hashicorp.com/terraform/language/expressions/strings#escape-sequences) for quoted string.


### Heredoc Strings

```hcl
<<EOT
hello
world
EOT
```

Indented Heredocs:
```hcl
block {
  value = <<-EOT
  hello
    world
  EOT
}
```

See the list of [Escape Sequences](https://developer.hashicorp.com/terraform/language/expressions/strings#escape-sequences-1) for heredoc.


### Generate JSON or YAML

```hcl
  example = jsonencode({
    a = 1
    b = "hello"
  })
```


### String Templates

Interpolation:

```hcl
"Hello, ${var.name}!"
```

Directives, allows for conditional results and iteration over collections:

```hcl
"Hello, %{ if var.name != "" }${var.name}%{ else }unnamed%{ endif }!"
```

```hcl
<<EOT
%{ for ip in aws_instance.example[*].private_ip }
server ${ip}
%{ endfor }
EOT
```

Use [Whitespace Stripping](https://developer.hashicorp.com/terraform/language/expressions/strings#whitespace-stripping) to allow template directives to be formatted for readability.


## References to Named Values

The main kinds of named values available in Terraform are:

- Resources
- Input variables
- Local values
- Child module outputs
- Data sources
- Filesystem and workspace info
- Block-local values

### Resource Attributes

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
