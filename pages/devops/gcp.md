# Google Cloud

## Overview

Google Cloud is a cloud service launched by Google on April 7th, 2008.

It offers a suite of cloud computing services, range from virtual machines to machine learning.

Google Cloud is a global fiber network that spans over 35 regions, over 106 zones, and 173 edge locations.


## Security

Google Cloud's fiber network provides a private secure global network that mostly does not have to touch the internet at all.

## What makes Google Cloud different?

**Security**: Google has over 15 years of experience managing their infrastructure (Google Apps). Google Cloud is based on this experience and provides additional security products for customers.

**Billing by the second**: GCE instances use a 1-second billing feature that allows customers to only pay for used resources.

**Big data**: Google Cloud big data solutions are easy of use.

**Global network**: A global fiber network that use advanced software defined networking.

**Environment friendly**: Google has been carbon neutral and has set the goal to run all its data centers carbon free.


## Weaknesses

- Has fewer services than AWS, Azure
- Promotes a specific usage model of its services tailored for software developers.


## Resource hierarchy

Google Cloud's resource hierarchy contains four levels, starting from the bottom up:
- Resources
- Projects
- Folders
- Organization

Policies can be defined at the project, folder, and organization node levels. Policies are also inherited downward.


### Resources

- Fundamental components make up all Google Cloud services.
- Example: virtual machines, Cloud Storage buckets, BigQuery tables, etc.


### Projects

Serves as the foundation for creating, enabling, and managing all Google Cloud services.

It allows you to handle APIs, billing, permissions, and collaborators.

Key attributes are:
- **Project ID**: globally unique identifier and unchangeable.
- **Project Name**: User-created and modifiable.
- **Project Number**: Assigned by Google for internal tracking.

Project management is done via the **Resource Manager** section.

Projects can have different owners and users because they’re billed and managed separately. 


### Folders

- An intermediate level that groups projects together.
- A folder can contain projects or other folders
- Allows for better organization and policy inheritance.


### Organization

- At the top of the hierarchy
- Binds resources to a domain and provides access control and organization policies.
- Each Google Workspace or Cloud Identity account is associated with one organization resource.