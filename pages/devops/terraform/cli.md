# CLI Commands

## Get version

```sh
terraform version
```

## Set working directory

You can add `-chdir=<path_to/tf>` flag to commands to specify the working directory:
```sh
terraform -chdir="infra/" apply -var-file="test.tfvars"
```


## Validate Terraform code

Validate the code to look for any errors in syntax, parameters, or attributes within Terraform resources that may prevent it from deploying correctly:
```sh
terraform validate
```

## Preview

Create an execution plan:
```sh
terraform plan
```

Output the destroy plan:
```sh
terraform plan -destroy
```

## Apply changes

```sh
terraform apply
```

No asking:
```sh
terraform apply --auto-approve
```

Apply a specific plan:
```sh
terraform apply <plan_name>
```

Only apply changes to a targeted resource:
```sh
terraform apply -target=<resource_name>
```

Pass a variable via the command line:
```sh
terraform apply -var my_variable=<variable>
```


## Destroy

```sh
terraform destroy
```

```sh
terraform destroy --auto-approve
```

## View outputs

Display all the output variables from your Terraform state:
```sh
terraform output
```

## State

List all the resources being tracked by the Terraform state file:
```sh
terraform state list
```

## Workspace commands

List workspaces:
```sh
terraform workspace list
```

Create a workspace:
```sh
terraform workspace new <WORKSPACE_NAME>
```

Switch workspace:
```sh
terraform workspace select <WORKSPACE_NAME>
```

Delete workspace:
```sh
terraform workspace delete <WORKSPACE_NAME>
```

## List available commands

```sh
terraform
```

## List available options for a sub command

```sh
terraform <sub_command> -h
```


## Upgrade Terraform

First update Homebrew:

```sh
brew update
```

Upgrade Terraform to the latest version:

```sh
brew upgrade hashicorp/tap/terraform
```
