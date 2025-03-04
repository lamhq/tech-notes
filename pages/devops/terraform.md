# Terraform

## Version

This document is for version `1.7.x` (2024).


## Installation (macOS)

Terraform is installed using Homebrew.

Install the HashiCorp tap, a repository of all HashiCorp packages:
```sh
brew tap hashicorp/tap
```

Install Terraform:
```sh
brew install hashicorp/tap/terraform
```

Verify the installation:
```sh
terraform -help
```


### Enable tab completion

Create a `.zshrc` file if not exists:
```sh
touch ~/.zshrc
```

Install the autocomplete package:
```sh
terraform -install-autocomplete
```

Restart your shell.

### VS Code setup

Install [HashiCorp Terraform](https://marketplace.visualstudio.com/items?itemName=HashiCorp.terraform) extension.

Example:
```hcl
resource "aws_instance" "web" {
  ami           = "ami-a1b2c3d4"
  instance_type = "t2.micro"
}
```


## References

- [Official Documentation](https://developer.hashicorp.com/terraform)
- [Terraform extension for VS Code adds Terraform Cloud view](https://www.hashicorp.com/blog/terraform-extension-for-vs-code-adds-terraform-cloud-view)