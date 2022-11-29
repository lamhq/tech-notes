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

With IAM, the administrators can apply policies that define who can do what on which resources.

The who part of an IAM policy can be a Google account, a Google group, a service account, or a Cloud Identity domain.

The can-do what part is defined by a role. An IAM role is a collection of permissions.