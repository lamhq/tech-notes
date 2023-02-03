# Manage issue workflows

Select the cog icon in the top right menu in your Jira project dashboard, select **Issues**, then choose **Workflows** in the left navigation.

You can view / edit / copy (duplicate) the workflow you want.

## Activating a workflow

All workflows are inactive until you associate them with a workflow scheme. To activate a workflow: 

1. Select **Setting** icon > **Issues**.
1. Under **WORKFLOWS**, click **Workflow schemes** to see a list of active and inactive schemes. 
1. Create a workflow scheme or edit an active workflow scheme.
1. Add your workflow to the scheme.

**Associating a workflow scheme with a project:**

To finish activating your workflow, associate the workflow scheme it's in with a project. 

1. Go to your project and click **Project settings**. 
1. Click **Workflows**. You'll see which workflow scheme the project currently uses.
1. Click **Switch Scheme** and select the relevant workflow scheme from the Scheme list. 
1. Click **Associate** to begin the migration process.


## Use repo activity to automatically update issues in company-managed projects

In company-managed software projects, you can automate your issue’s workflows to transition issues when activity happens in your GitHub repos.

We recommend you do this using automation for Jira. To automate your workflow:

1. Navigate to your company-managed project.
1. Select **Project settings** > **Automation**.
1. Select the **Library** tab.
1. Under **DevOps**, select any of the pre-configured rules.
1. When previewing the rule’s configuration, select Turn it on to enable it.

Your project’s automation library comes with 3 pre-configured rules that transition issues along your workflow as development happens in your connected source code tool:

- When a branch is created → then move issue to in progress
- When a commit is made → then move issue to in progress
- When a pull request is merged → then move issue to done
