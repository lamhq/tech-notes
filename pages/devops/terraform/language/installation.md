# Installation (macOS)

## Install

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


## Enable tab completion

Create a `.zshrc` file if not exists:
```shell
touch ~/.zshrc
```

Install the autocomplete package:
```shell
terraform -install-autocomplete
```

Restart your shell.


## Upgrade

First update Homebrew:

```shell
brew update
```

Upgrade Terraform to the latest version:

```shell
brew upgrade hashicorp/tap/terraform
```


## VS Code

Add syntax support for Terraform, install extension [Terraform](https://marketplace.visualstudio.com/items?itemName=4ops.terraform).


Example:

```hcl
resource "aws_instance" "web" {
  ami           = "ami-a1b2c3d4"
  instance_type = "t2.micro"
}
```
