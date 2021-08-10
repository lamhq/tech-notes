# Release

A version is a set of features and fixes released together as a single update to your product.

Assigning issues to versions helps you plan the order in which new features (stories) for your application will be released to your customers.

## Managing versions

1. Go to the **Backlog** of your Scrum project.
1. Click **VERSIONS** on the left side of the board (aligned vertically) to open it.

You can:

- Add a new version
- Update a version's details
- Add an issue to a version
- Remove an issue from a version
- Filter issues by version


## Check the progress of a version

You've been monitoring the progress of your sprints and keeping your team on track for each iteration. How do know if you are on track to deliver the version?

### Release Hub

The Release Hub helps you understand the status of work for your version at a point in time.

It also warns you when your issue data is potentially out of sync with your development data. Rather than spend your time hunting this information down, you can help your team sort these problems out as soon as they occur:

- Issues that should be in the release but haven't been merged (open pull requests),
- Issues that haven't had code reviews, etc.
- Issues are complete, code is committed, reviewed, and merged, builds are passing, etc

1. Go to your Scrum project.
1. Click **Releases** > your desired version.

### Release Burndown report

Here are some of the ways that you could use a Release Burndown report:

- See how quickly your team is working through the backlog (velocity)
- See how work added and removed during the sprint has affected your team's overall progress
- Predict how many sprints it will take to complete the work for a version, based on past sprints and changes during the sprints.

Viewing the Release Burndown report:

- Click **Projects** in the navigation bar and select the relevant project
- Click **Reports** then select **Release Burndown**
- Select the relevant version from the Release Burndown drop-down. You will be able to choose from versions that are in projects configured for your board (via the board's filter)

### Status Report

If you have Confluence linked to Jira Software and you need to provide status reports to external stakeholders, you can generate a 'Status Report' in Confluence that displays the progress of a version.

### Checking the development status of an issue

If you need to deep dive into individual issues, the development panel on each issue will show you its development status. This includes commits, builds, branches, pull requests, and more.

![](https://images.ctfassets.net/zsv3d0ugroxu/3XGwBcLkSp75ACF6qTIwRX/f62cc85752a3e5a4c4806e8167c9c135/Issue_view_with_development_panel)


## Deploy a release

Before you release your version, you need to be sure that everything is ready (issues are complete, code is committed, reviewed, and merged, builds are passing, etc.) by using the Release Hub and Issue Development Panel.

In a Scrum project, a version is created when you start work on the project. Issues are assigned to the version throughout development.

1. Go to the project that your version is in, and then click **Releases** > your desired version.
1. On the version page, click the **Release** button.
1. The release dialog will be displayed.
1. Enter the details for the release, then click the **Release** button.

If there are unresolved issues, you can choose to ignore these issues and proceed with the release, or move them to a later version.

Releasing a version on a Scrum board marks the version as released. It doesn't automatically modify the issues in the version in any way.

### Build the release

If you have connected Jira Software to Bamboo, you can automatically run a Bamboo build when you release a version. Otherwise, if you haven't connected Jira Software to Bamboo, or you are using a different build tool, you will need to run your builds independently.

### Deploy the release

Once you have built your artifacts, you need to deploy them to the required environment.

If you are using Bamboo, deployment projects make it simple for you to deploy your artifacts to different environments. Otherwise, you will need to manually copy the files across environments.