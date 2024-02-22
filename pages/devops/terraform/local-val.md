# Local Values

Local values are like a function's temporary local variables.

A local value assigns a name to an expression, so you can use the name multiple times within a module instead of repeating the expression.

## Declaring a Local Value

```hcl
locals {
  service_name = "forum"
  owner        = "Community Team"
}
```

```hcl
locals {
  # Ids for multiple sets of EC2 instances, merged together
  instance_ids = concat(aws_instance.blue.*.id, aws_instance.green.*.id)
}

locals {
  # Common tags to be assigned to all resources
  common_tags = {
    Service = local.service_name
    Owner   = local.owner
  }
}
```


## Using Local Values

you can reference local value in expressions as `local.<NAME>`.

```hcl
resource "aws_instance" "example" {
  # ...

  tags = local.common_tags
}
```
