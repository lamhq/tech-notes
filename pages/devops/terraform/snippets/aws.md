# AWS Snippets

## Define providers

```hcl
provider "aws" {
  region     = "us-east-1"
}
```


## Using module

Sample code of using child module to define VPC, Subnet, EC2 resources.

### Child module

The child module:
- define subnet, vpc resource
- accept a input variable for `region`
- return subnet's id, AMI's id to parent module

`main.tf`:
```hcl
provider "aws" {
  region = var.region
}

resource "aws_vpc" "this" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_subnet" "this" {
  vpc_id     = aws_vpc.this.id
  cidr_block = "10.0.1.0/24"
}

data "aws_ssm_parameter" "this" {
  name = "/aws/service/ami-amazon-linux-latest/amzn2-ami-hvm-x86_64-gp2"
}
```

`variables.tf`:
```hcl
variable "region" {
  type    = string
  default = "us-east-1"
}
```

`outputs.tf`:
```hcl
output "subnet_id" {
  value = aws_subnet.this.id
}

output "ami_id" {
  value = data.aws_ssm_parameter.this.value
}
```

### Main module

- accept a input variable for `region`
- import the child module, passing the value to `region` variable of the child module
- define a EC2 instance that uses the ami and subnet from the child module's return values

`main.tf`:
```hcl
variable "main_region" {
  type    = string
  default = "us-east-1"
}

provider "aws" {
  region = var.main_region
}

module "vpc" {
  source = "./modules/vpc"
  region = var.main_region
}

resource "aws_instance" "my-instance" {
  ami           = module.vpc.ami_id
  subnet_id     = module.vpc.subnet_id
  instance_type = "t2.micro"
}
```
