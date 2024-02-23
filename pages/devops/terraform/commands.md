# Frequently Used Commands

## Get version

```shell
terraform version
```

## Change working directory

```shell
terraform -chdir=<path_to/tf> <subcommand>
```

## Initialize

Initialize the directory:
```shell
terraform init
```

Used when:
- create a new working directory
- switching to a new workspace


## Validate code

Validate the code to look for any errors in syntax, parameters, or attributes within Terraform resources that may prevent it from deploying correctly:
```shell
terraform validate
```

## Create plans

Create an execution plan:
```shell
terraform plan
```

Output the destroy plan:
```shell
terraform plan -destroy
```

## Apply changes

Applying a Terraform configuration is the process of creating, updating, and destroying real infrastructure objects in order to make their settings match the configuration.


```shell
terraform apply
```

No asking:
```shell
terraform apply --auto-approve
```

Apply a specific plan:
```shell
terraform apply <plan_name>
```

Only apply changes to a targeted resource:
```shell
terraform apply -target=<resource_name>
```

Pass a variable via the command line:
```shell
terraform apply -var my_variable=<variable>
```

## Destroy

```shell
terraform destroy
```

```shell
terraform destroy --auto-approve
```

## List providers

```shell
terraform providers
```

## Workspace commands

List workspaces:
```shell
terraform workspace list
```

Create a workspace:
```shell
terraform workspace new <WORKSPACE_NAME>
```

Switch workspace:
```shell
terraform workspace select <WORKSPACE_NAME>
```

Delete workspace:
```shell
terraform workspace delete <WORKSPACE_NAME>
```

## State

List all the resources being tracked by the Terraform state file:
```shell
terraform state list
```

## List available commands

```shell
terraform
```

## List available options for a sub command

```shell
terraform <sub_command> -h
```