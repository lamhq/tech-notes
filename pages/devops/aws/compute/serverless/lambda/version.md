# Versions and Aliases

## Versions

You can have multiple versions of your function.

The unpublished version of a function is named `$LATEST`. All changes are made to this version first (code deployments, configuration).

You can publish a new version under the **Versions** tab of the function configuration.

Published version includes:
- The function code, dependencies, layers.
- The runtime version.
- Function settings, including the environment variables.
- A unique Amazon Resource Name (ARN) to identify this version of the function.

Published version is immutable, but they can be deleted and never reuses.

Numbered versions are assigned a number starting with `1` and subsequent versions are incremented by `1`.

Each version has its own ARN. This allows you to effectively manage them for different environments like Production, Staging or Development.

A qualified ARN has a version suffix:
- `arn:aws:lambda:region:account:function:example:13`.

An unqualified ARN does not have a version suffix:
- `arn:aws:lambda:region:account:function:example`.

You cannot create an alias from an unqualified ARN.


## Aliases

An aliases is a pointer to a specific Lambda version, or `$LATEST`.

Alias enable invoking a function without having to know which version of the function is being referenced. Useful if the function is invoked from many different applications.

You can create an alias under the **Aliases** tab of the function configuration.

A qualified ARN can be used to invoke a specific version:
- `arn:aws:lambda:region:account:function:example:PROD`. (`:PROD` on the end will mean the `PROD` alias is invoked.)

Aliases are mutable.


### Routing

Aliases can also be used to split traffic between Lambda versions.

Aliases enable blue green deployment by assigning weights to Lambda version. It can be updated to increase or decrease traffic
for testing and release purposes.

With routing, an alias can point to two function versions.
- Neither of these can be the unpublished version (`$LATEST`).
- Both must have the same execution role and dead-letter queue configuration.
