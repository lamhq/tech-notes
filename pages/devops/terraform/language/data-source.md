# Data Sources

Data sources allow Terraform to use information defined outside of Terraform.

Each provider may offer data sources alongside its set of resource types.


## Defining Data Sources

A data source is declared using a `data` block.

In below example, Terraform read from a given data source (`"aws_ami"`) and export the result under the given local name (`"example"`):

```hcl
data "aws_ami" "example" {
  most_recent = true

  owners = ["self"]
  tags = {
    Name   = "app-server"
    Tested = "true"
  }
}
```

Within the block body are query constraints defined by the data source. 


## Accessing Data Source

Data instance's attributes can be referenced in expression of the form `data.<TYPE>.<NAME>.<ATTRIBUTE>`:

```hcl
resource "aws_instance" "web" {
  ami           = data.aws_ami.web.id
  instance_type = "t1.micro"
}
```
