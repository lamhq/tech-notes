# Override Files

In certain situations, Terraform allows overriding parts of a configuration by using special files ending in `_override.tf` or `_override.tf.json`, including the exact names `override.tf` or `override.tf.json`.

Terraform will load these override files after initially skipping them and merge their contents into existing configurations in lexicographical order.

Best practices:
- use override files sparingly to maintain readability
- comment in the original files about any applied overrides to help future readers

Check the [example](https://developer.hashicorp.com/terraform/language/files/override#example) for more info.

How files are merged is documented in [Merging Behavior](https://developer.hashicorp.com/terraform/language/files/override#merging-behavior).