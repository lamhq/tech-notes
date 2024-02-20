# CLI

## Find the Terraform version

```shell
terraform version
```

## Switch the working directory

```shell
terraform -chdir=<path_to/tf> <subcommand>
```

## Initialize the directory

```shell
terraform init
```

## Create an execution plan

```shell
terraform plan
```

Output the deployment plan:
```shell
terraform plan -out plan.txt
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

## Destroy the managed infrastructure

```shell
terraform destroy
```

```shell
terraform destroy --auto-approve
```

## Get information about providers

```shell
terraform providers
```


## List available commands

```shell
terraform
```

## List available options for a sub command

```shell
terraform <sub_command> -h
```