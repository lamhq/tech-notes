# Terraform Runs

## Remote Operations

Terraform Cloud is designed as an execution platform for Terraform, and can perform Terraform runs on its own disposable virtual machines.

Benefits:
- provides a consistent and reliable run environment
- enables advanced features: Sentinel policy enforcement, cost estimation, notifications, version control integration, ...

Terraform runs managed by Terraform Cloud are called **remote operations**.

Remote runs can be initiated by:
- webhooks from your VCS provider
- UI controls within Terraform Cloud
- API calls
- Terraform CLI
 
When using Terraform CLI to perform remote operations, the progress of the run is streamed to the user's terminal, to provide an experience equivalent to local operations.

You can **disable remote operations** by changing Workspace's Execution Mode to Local. This causes the workspace to act only as a remote backend for Terraform state.


## Runs and Workspaces

Terraform Cloud executes runs within a workspace.

Workspaces provides config, state, and variables to the run (same as a persistent local directory).


## Starting Runs

Terraform Cloud has three main workflows for managing runs:

- The [UI/VCS-driven run workflow](https://developer.hashicorp.com/terraform/cloud-docs/run/ui), which is the primary mode of operation.
- The [API-driven run workflow](https://developer.hashicorp.com/terraform/cloud-docs/run/api), which is more flexible but requires you to create some tooling.
- The [CLI-driven run workflow](https://developer.hashicorp.com/terraform/cloud-docs/run/cli), which uses Terraform's standard CLI tools to execute runs in Terraform Cloud.
