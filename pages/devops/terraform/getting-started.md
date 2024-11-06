# Getting Started

## Initialize

Initialize the working directory:
```shell
terraform init
```

Create a `params.tfvars` file that contain values for all required variables:
```tf
region = "eu-central-1"
input_bucket_name = "glue-demo-input-bucket-2024"
artifact_bucket_name = "glue-demo-artifact-bucket-2024"
```

## Preview
Preview the changes before apply:
```shell
terraform plan -var-file="params.tfvars"
```

## Deploy

Establish the infrastructure:
```shell
terraform apply -var-file="params.tfvars" --auto-approve
```

## Clean up
Destroy the infrastructure when you no longer need it:
```shell
terraform destroy -var-file="params.tfvars" --auto-approve
```