# Workspaces

## Overview

When run locally, Terraform:
- Uses a persistent working directory per infrastructure collection.
- Includes configuration, state data, and variables.
- Organize by placing configurations in distinct directories.

Terraform Cloud:
- Utilizes workspaces to manage infrastructure collections.
- Workspaces encompass all necessary components.
- Each workspace equates to an isolated working directory.


## Workspace Contents

Terraform Cloud workspaces and local working directories serve the same purpose, but they store their data differently:

| Component | Local Terraform | Terraform Cloud |
|---|---|---|
| Terraform configuration | On disk | In linked version control repository, or periodically uploaded via API/CLI |
| Variable values | As .tfvars files, as CLI arguments, or in shell environment | In workspace |
| State | On disk or in remote backend | In workspace |
| Credentials and secrets | In shell environment or entered at prompts | In workspace, stored as sensitive variables |

Terraform Cloud also keeps:
- **State Versions:**: Each workspace retains backups of previous state files. Useful for change tracking and recovery.
- **Run History:** Terraform retains run activity information, includes summaries, logs, triggering changes, and user comments.


## Terraform Cloud vs. Terraform CLI Workspaces

Both Terraform Cloud and Terraform CLI have features called workspaces, but they function differently:

**Terraform Cloud:**
- Workspaces are required. They represent all of the collections of infrastructure in an organization
- Workspaces are a major component of role-based access.
- You can grant individual users and user groups permissions for workspaces

**Terraform CLI:**
- Optional, tied to working directories.
- Isolates state files for managing different resource groups.
- Single configuration can handle multiple groups.


## Organizing Workspaces

We recommend that organizations break down large monolithic Terraform configurations into smaller ones, then assign each one to its own workspace and delegate permissions and responsibilities for them. Managing infrastructure as smaller components is the best way to take full advantage of Terraform Cloud's governance and delegation features.

For example, the code that manages your production environment's infrastructure could be split into a networking configuration, the main application's configuration, and a monitoring configuration. After splitting the code, you would create "networking-prod", "app1-prod", "monitoring-prod" workspaces, and assign separate teams to manage them

In addition, it makes it easier to re-use configurations to manage other environments of infrastructure ("app1-dev," etc.).


Best Practices:

- Organize by breaking down large configurations into smaller, manageable parts.
- Assign each part to its own workspace.
- Delegate permissions and responsibilities accordingly.


Example Strategies:

- Separate production environment infrastructure into:  Networking, Application, Monitoring. Create corresponding workspaces:
  - `networking-prod`
  - `app1-prod`
  - `monitoring-prod`
- Facilitates configuration reuse across different environments (e.g., `app1-dev`).