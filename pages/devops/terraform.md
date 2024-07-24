# Terraform

## Version

This document is for version `1.7.x` (2024).


## Installation (macOS)

Terraform is installed using Homebrew.

Install the HashiCorp tap, a repository of all HashiCorp packages:
```shell
brew tap hashicorp/tap
```

Install Terraform:
```shell
brew install hashicorp/tap/terraform
```

Verify the installation:
```shell
terraform -help
```


### Enable tab completion

Create a `.zshrc` file if not exists:
```shell
touch ~/.zshrc
```

Install the autocomplete package:
```shell
terraform -install-autocomplete
```

Restart your shell.

### VS Code setup

Add syntax support for Terraform, install extension [Terraform](https://marketplace.visualstudio.com/items?itemName=4ops.terraform).


Example:

```hcl
resource "aws_instance" "web" {
  ami           = "ami-a1b2c3d4"
  instance_type = "t2.micro"
}
```


## Getting Started

Change working directory:
```sh
cd infra/
```

Initialize the working directory:
```shell
terraform init
```

Create a `test.tfvars` file that contain values for all required variables:
```tf
region = "eu-central-1"
input_bucket_name = "glue-demo-input-bucket-2024"
artifact_bucket_name = "glue-demo-artifact-bucket-2024"
```

Preview the changes before apply:
```shell
terraform plan -var-file="test.tfvars"
```

Establish the infrastructure:
```shell
terraform apply -var-file="test.tfvars" --auto-approve
```

Destroy the infrastructure when you no longer need it:
```shell
terraform destroy -var-file="test.tfvars" --auto-approve
```

## References

https://developer.hashicorp.com/terraform