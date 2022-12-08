# Resources and Access in the Cloud

## Google Cloud resource hierarchy

Google Cloud’s resource hierarchy contains four levels, and starting from the bottom up they are: resources, projects, folders, and an organization node.

Resources represent virtual machines, Cloud Storage buckets, tables in BigQuery, or anything else in Google Cloud. 

Resources are organized into projects.

Projects can be organized into folders, or even subfolders.

At the top level is an organization node, which encompasses all the projects, folders, and resources in your organization.

Policies can be defined at the project, folder, and organization node levels. Policies are also inherited downward.

### Projects

Projects are the basis for enabling and using Google Cloud services, like managing APIs, enabling billing, adding and removing collaborators, and enabling other Google services.

Each project is a separate entity under the organization node.

Each resource belongs to exactly one project. 

Projects can have different owners and users because they’re billed and managed separately. 

Each Google Cloud project has three identifying attributes: a project ID, a project name, and a project number.

**The project ID** is a globally unique identifier assigned by Google that can’t be changed after creation.

**Project names**, are user-created. They don’t have to be unique and they can be changed at any time.

Google Cloud also assigns each project a unique **project number**. They’re mainly used internally by Google Cloud to keep track of resources.

Google Cloud’s Resource Manager tool helps you manage projects.


### Folders

Folders let you assign policies to resources. The resources in a folder inherit policies and permissions assigned to that folder.

A folder can contain projects or other folders. You can use folders to group projects under an organization in a hierarchy (for example, by departments).


### Organization

There are some special roles associated with this top-level organization node. For example, you can designate an organization policy administrator so that only people with privilege can change policies.

You can also assign a project creator role, which is a great way to control who can create projects and, therefore, who can spend money.


## Identity and Access Management (IAM)

With IAM, the administrators can apply **policies** that define who can do what on which resources.

The **who part** of an IAM policy can be a Google account, a Google group, a service account, or a Cloud Identity domain.

The **can-do what part** is defined by a role. An IAM role is a collection of permissions.

When a user, group, or service account is given a role on a specific element of the resource hierarchy, the resulting policy applies to both the chosen element **and all the elements below it in the hierarchy**.

There are three kinds of roles in IAM: Basic, Predefined, and Custom.

### Basic roles

Basic roles are quite broad in scope. When applied to a Google Cloud project, they affect all resources in that project.

Basic roles include: Owner, Editor, Viewer, and Billing Administrator.

- Project viewers can access resources but can't make changes
- Project editors can access and make changes to a resource
- Project owners can access and make changes to a resource, manage the associated roles and permissions and set up billing.


### Predefined roles

Specific Google Cloud services offers sets of predefined roles and they even define where those roles can be applied.


### Custom role

Many companies use a least privileged model in which each person in your organization is given the minimal amount of privilege needed to do their job.

Custom roles will allow you to define exact permissions.

Before you start creating Custom roles, you'll need to manage the permissions that define the Custom role you've created, because of this, some organizations decide they'd rather use the Predefined roles.

Second, Custom roles can only be applied to either the project level or organization level. They can't be applied to the folder level.


## Service accounts

What if you want to give permissions to a Compute Engine virtual machine, rather than to a person? Well, that’s what service accounts are for.

Let’s say you have an application running in a virtual machine that needs to store data in Cloud Storage, but you don’t want anyone on the internet to have access to that data–just that particular virtual machine. You can create a service account to authenticate that VM to Cloud Storage.

Service accounts are named with an email address, but instead of passwords they use cryptographic keys to access resources.

In addition to being an identity, a service account is also a resource, so it can have IAM policies of its own attached to it.


## Cloud Identity

With a tool called Cloud Identity, organizations can define policies and manage their users and groups using the Google Admin Console. 

Admins can log in and manage Google Cloud resources using the same user names and passwords they already used in existing Active Directory or LDAP systems.


## Interacting with Google Cloud

There are four ways to access and interact with Google Cloud:

- The Cloud Console
- The Cloud SDK in Cloud Shell
- The APIs
- The Cloud Console Mobile App. 

### The Cloud SDK

The Cloud SDK is a set of tools that you can use to manage resources and applications hosted on Google Cloud. 

These include:
- the **gcloud tool**, which provides the main command line interface for Google Cloud products and services
- **gsutil**, which lets you access Cloud storage from the command line
- **bq**, a command line tool for BigQuery. 

Cloud Shell provides command line access to Cloud resources directly from a browser. Cloud Shell is a Debian-based virtual machine.


### The APIs

The Cloud Console includes a tool called the **Google APIs Explorer** that shows which APIs are available and in which versions.

You can try these APIs interactively, even those that require user authentication.


## Quiz

> When would you choose to have an organization node?

- When you want to create folders
- When you want to centrally apply organization-wide policies


> Which statement best describes how Google Cloud resources are associated within the resource hierarchy?

All Google Cloud resources are associated with a project.


> Consider a single hierarchy of Google Cloud resources. Which of these situations is possible?

- There is no organization node, and there are no folders.
- There is an organization node, and there are no folders.
- There is an organization node, and there is at least one folder.


> Your company has two Google Cloud projects and you want them to share policies. What is the least error-prone way to set this up?

Place both projects into a folder, and define the policies on that folder.


> What is the difference between Identity and Access Management (IAM) basic roles and IAM predefined roles?

Basic roles affect all resources in a Google Cloud project. Predefined roles apply to a specific service in a project.


> Select the option that displays IAM roles from general to specific. 

Basic roles, predefined roles, custom roles


> How does the resource hierarchy control how IAM policies are inherited?


IAM policies that are implemented by lower-level policies can override the policies defined at a higher level. 


> Which way of accessing Google Cloud lets you control services through the code you write?

APIs


## Reference

https://cloud.google.com/iam/docs/quickstarts