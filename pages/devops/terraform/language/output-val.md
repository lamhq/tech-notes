# Output Values

## Overview

Output values are similar to return values in programming languages.

Use cases:
- A child module can use outputs to expose a subset of its resource attributes
  to a parent module.
- A root module can use outputs to print certain values in the CLI output after
  running `terraform apply`.
- When using remote state, root module outputs can be accessed by other configurations via a `terraform_remote_state` data source.


## Declaring an Output Value

In this example, the expression refers to the `private_ip` attribute exposed by an `aws_instance` resource defined elsewhere in this module (not shown).

```hcl
output "instance_ip_addr" {
  value = aws_instance.server.private_ip
}
```


## Accessing Child Module Outputs

In a parent module, outputs of child modules are available in expressions as `module.<MODULE NAME>.<OUTPUT NAME>`.


## Custom Condition Checks

You can use `precondition` blocks to specify guarantees about output data. The following examples creates a precondition that checks whether the EC2 instance has an encrypted root volume.

```hcl
output "api_base_url" {
  value = "https://${aws_instance.example.private_dns}:8433/"

  # The EC2 instance must have an encrypted root volume.
  precondition {
    condition     = data.aws_ebs_volume.example.encrypted
    error_message = "The server's root volume is not encrypted."
  }
}
```


## Optional Arguments

### `description`

Documentation of Output Value

```hcl
output "instance_ip_addr" {
  value       = aws_instance.server.private_ip
  description = "The private IP address of the main server instance."
}
```

### `sensitive`

Suppressing Values in CLI Output

```hcl
output "db_password" {
  value       = aws_db_instance.db.password
  description = "The password for logging in to the database."
  sensitive   = true
}
```


### `depends_on`

Explicit Output Dependencies

Terraform auto-detects dependencies for output values' expressions. Use `depends_on` to manually add dependencies sparingly, with a comment explaining why it is being used.

```hcl
output "instance_ip_addr" {
  value       = aws_instance.server.private_ip
  description = "The private IP address of the main server instance."

  depends_on = [
    # Security group rule must be created before this IP address could
    # actually be used, otherwise the services will be unreachable.
    aws_security_group_rule.local_access,
  ]
}
```
