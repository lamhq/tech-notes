# Refactoring

Moving resource blocks from one module into several child modules causes Terraform to see the new location as an entirely different resource.

As a result, Terraform plans to destroy all resource instances at the old address and create new instances at the new address.

Check the [refactoring document](https://developer.hashicorp.com/terraform/language/modules/develop/refactoring) to know how to refactor Terraform configuration.