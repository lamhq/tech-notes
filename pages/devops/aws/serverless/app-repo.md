# AWS Serverless Application Repository

## Overview

It's a service that make it easy for developers and organizations to **find, deploy, publish pre-made serverless applications** within their own AWS accounts.

Ability to share applications privatel (within orgs) or publicly.

You upload your application code and a manifest file (AWS SAM template).


## Publish & deploy

There're two options to choose:

### Publish

- You publish apps, makes them available for others to find and deploy.
- You define apps with AWS SAM templates.
- App is set to private by default. Only owner can see it.
- Must explicitly share if desired. Can share with specific accounts or publicly with everyone.

### Deploy

- You find and deploy published applications.
- You can browse public apps without needing an AWS account.
- If you have an account, you can browse within the AWS
Lambda console.
- Be careful of trusting applications. They can have issues or vulnerabilities.