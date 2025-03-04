# State

## Overview

Terraform store state about your managed infrastructure and configuration to map real world resources to your configuration, keep track of metadata, and to improve performance for large infrastructures.

Terraform does a refresh to update the state with the real infrastructure before to any operation.

When Terraform creates a remote object in response to a change of configuration, it will record the identity of that remote object against a particular resource instance, and then potentially update or delete that object in response to future configuration changes.


## Modifying state

Terraform provides the `terraform state` command to perform basic modifications of the state using the CLI.

If you build software that parses or modifies it directly you should expect to perform ongoing maintenance of that software as the state format evolves in new versions.


## State Storage

Backends determine where state is stored.

When using a non-local backend, Terraform will not persist the state on disk.

In the case of an error persisting the state to the backend, Terraform will write the state locally. User must manually push the state to the remote backend once the error is resolved.

You can manually retrieve the state using the command:

```sh
terraform state pull
```

You can manually write state, but this is extremely dangerous and should be avoided if possible:

```sh
terraform state push
```


## State Locking

If supported by your backend, Terraform will lock your state for all operations that could write state. This prevents others from acquiring the lock and potentially corrupting your state.

Terraform has a [force-unlock](https://developer.hashicorp.com/terraform/language/state/locking#force-unlock) command to manually unlock the state if unlocking failed. Be very careful with this command.