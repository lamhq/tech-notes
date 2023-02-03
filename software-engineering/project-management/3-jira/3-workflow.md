# Workflows

## Concepts

A Jira workflow is a set of statuses and transitions that an issue moves through during its lifecycle and typically represents processes within your organization. 

Workflows can be associated with particular projects and, optionally, specific **issue types**, by using a **workflow scheme**.

A workflow scheme defines a set of associations – or mappings – between a workflow and an issue type. Workflow schemes are associated with a project and make it possible to use a different workflow for every combination of project and issue type.

A status represents the state of an issue at a specific point in your workflow.

A transition is a link between two statuses that enables an issue to move from one status to another.

A transition is a one-way link, so if an issue needs to move back and forth between two statuses, two transitions need to be created.

*You can share an existing project's workflow scheme when you are creating a new project by selecting Create with shared configuration in the Project Creation Wizard. This allows you to reuse your existing schemes without having to recreate them for new projects.*


## Recommendations

For software teams, we recommend these basic workflow states:

- `TO DO`: Work that has not been started
- `IN PROGRESS`: Work that is actively being looked at by the team
- `CODE REVIEW`: Work that is completed and awaiting review
- `DONE`: Work that is completely finished and meets the team's definition of done

In an issue tracker, these statuses flow from one to the next using transitions that structure the workflow. 

![](https://wac-cdn.atlassian.com/dam/jcr:b05f60d5-04a0-4ef1-b2f6-c329bcbdd068/AgileWorkflow.svg?cdnVersion=1746)

Some software teams include additional states in their workflow that help them track the status of work more precisely.

- `AWAITING QA`: Work that has been implemented, but is still waiting for a tester review.
- `READY TO MERGE`: Code that has been reviewed and is ready to merge into the main or release branch.


## Keep your Jira workflow simple

Aim for a lean set of statuses that clearly communicate what phase a piece of work is in.

Whenever adding a new status to a workflow, make sure you have no other option. Let’s look at two examples.

**Code review** is an important part of the software development process. Code Review status make it’s clear to the team which issues are under active development, and which issues are awaiting review. Reviewing code is distinctly different than writing code, so it makes sense to add a new state.

Bill, the QA manager, wants to add new status called **Failed Verification** for all issues that don’t pass review by his team. I’d **advise against doing this**, as the test engineers can simply send any issue that fails review back to a previous state, such as In Progress or In Development.


## Work in progress

Work in progress (WIP) limits dictate a minimum and maximum number of issues in a particular state of the workflow, ensuring each state has enough work to keep the team fully utilized, but not so much that it loses focus from juggling priorities. 

Enforcing WIP limits will quickly show which processes slows overall work through the pipeline. As the team learns to optimize around its WIP limits, throughput will increase.


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
