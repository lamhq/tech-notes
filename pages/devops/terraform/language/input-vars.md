# Input Variables

## Overview

Input variables let you customize aspects of Terraform modules without altering the module's source code.

You can set variables's value in the root module using CLI options and environment variables.

When you declare input variables in child modules, the calling module should pass values in the `module` block.

```hcl
variable "image_id" {
  type = string
}
```

## Declaring an Input Variable

The label after the `variable` keyword is a **name** for the variable, which must be unique among all variables in the same module.

The name of a variable can be any valid identifier *except* the following: `source`, `version`, `providers`, `count`, `for_each`, `lifecycle`, `depends_on`, `locals`.


```hcl
variable "availability_zone_names" {
  type    = list(string)
  default = ["us-west-1a"]
}

variable "docker_ports" {
  type = list(object({
    internal = number
    external = number
    protocol = string
  }))
  default = [
    {
      internal = 8300
      external = 8300
      protocol = "tcp"
    }
  ]
}
```


## Arguments for variable declaration

Terraform CLI defines the following optional arguments for variable declarations:

* `default` - A default value which then makes the variable optional.
* `type` - This argument specifies what value types are accepted for the variable.
* `description` - This specifies the input variable's documentation.
* `validation` - A block to define validation rules, usually in addition to type constraints.
* `sensitive` - Limits Terraform UI output when the variable is used in configuration.
* `nullable` - Specify if the variable can be `null` within the module.


## Accessing Variables

Variables in a module are referenced within expressions as `var.<NAME>`, with `<NAME>` corresponding to the declared variable name.

In the below example, the variable `image_id` is accessed with the expression `var.image_id`

```hcl
resource "aws_instance" "example" {
  instance_type = "t2.micro"
  ami           = var.image_id
}
```


## Passing values to root module variables

Variables can be set:

* In a Terraform Cloud workspace
* In the CLI, with the `-var` command line option.
* In variable definitions (`.tfvars`) files, either specified on the command line or automatically loaded.
* As environment variables.

### From the Command Line

```sh
terraform apply -var="image_id=ami-abc123"
terraform apply -var='image_id_list=["ami-abc123","ami-def456"]' -var="instance_type=t2.micro"
terraform apply -var='image_id_map={"us-east-1":"ami-abc123","us-east-2":"ami-def456"}'
```

### From Variable Definitions (`.tfvars`) Files

```sh
terraform apply -var-file="testing.tfvars"
```

A variable definitions file uses the same basic syntax as Terraform language files, but consists only of variable name assignments:

```hcl
image_id = "ami-abc123"
availability_zone_names = [
  "us-east-1a",
  "us-west-1c",
]
```

Terraform also automatically loads a number of variable definitions files
if they are present:

* Files named exactly `terraform.tfvars` or `terraform.tfvars.json`.
* Any files with names ending in `.auto.tfvars` or `.auto.tfvars.json`.


### From Environment Variables

Terraform searches the environment for environment variables named `TF_VAR_` followed by the name of a declared variable.

```sh
export TF_VAR_image_id=ami-abc123
terraform plan
```

For complex value (list, set, map, object, or tuple), we recommend always setting complex variable values via variable definitions files.


## References

- [Input Variables](https://developer.hashicorp.com/terraform/language/values/variables)
