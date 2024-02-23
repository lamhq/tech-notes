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


## Run states and stages

When you execute a Terraform operation (such as `plan` or `apply`), it goes through several distinct stages.

Terraform Cloud shows the progress through those stages as run states.

Here's a breakdown of the key stages:

1. **Pending Stage**:
   - **State**: Terraform Cloud hasn't initiated any action on the run yet.
   - **Explanation**: Each workspace's runs are processed in the order they were queued. A run remains pending until all preceding runs have completed.
   - **Transitions**:
     - If the user discards the run before it starts, it enters the **Discarded state**.
     - If it's the first in the queue, it proceeds automatically to the **Plan stage**.

2. **Fetching Stage**:
   - **State**: Terraform Cloud fetches the configuration from the version control system (VCS).
   - **Explanation**: If the configuration isn't available yet, the run remains in this state.
   - **Transitions**:
     - If there's an error fetching the configuration, it enters the **Plan Errored state**.
     - Upon successful configuration retrieval, it moves to the next stage.

3. **Pre-Plan Stage**:
   - **State**: This phase occurs if there are enabled run tasks configured to run before Terraform creates the plan.
   - **Explanation**: Terraform Cloud sends run information to an external system and waits for a response (passed or failed) to determine whether the run can proceed.
   - **Transitions**:
     - If any mandatory tasks fail, the run skips to **completion** (Plan Errored state).
     - If advisory tasks fail, the run proceeds to the **Planning state** with a visible warning.
     - Terraform takes the most restrictive action when there's a combination of mandatory and advisory tasks.

4. **Plan Stage**:
   - **State**: Terraform generates an execution plan.
   - **Explanation**: The plan outlines the changes Terraform will apply.
   - **Transitions**:
     - If the plan encounters errors, it enters the **Plan Errored state**.
     - Otherwise, it proceeds to the **Apply stage**.

5. **Apply Stage**:
   - **State**: Terraform applies the changes.
   - **Explanation**: Resources are created, updated, or destroyed based on the plan.
   - **Transitions**:
     - If any issues arise during application, it enters the **Plan Errored state**.
     - Otherwise, it moves to the **Completion stage**.

6. **Completion Stage**:
   - **State**: The run is complete.
   - **Explanation**: Terraform Cloud shows the final state of the run.
   - **Transitions**: None; the run remains in this state.
