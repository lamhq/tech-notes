# AWS Service Catalog

## Overview

It's a service that allows organizations to create and manage **catalogs of approved IT services**.

They're multipurpose catalogs. Can include things like AMIs, servers, software, databases, and other preconfigured components.

It's a centralized service. Using AWS Organizations, you can centrally manage IT services and maintain compliance.

End users can be allowed to easily deploy preapproved catalog items within an organization. They provision catalog templates when they're deploying these preapproved services.

Catalog templates are written and listed using CloudFormation templates.


## Benefits

- Standardize. Restrict launching products to a specific list of preapproved solutions.
- Self-Service. End users can browse products and deploy approved services on their own.
- Access Control. Add constraints and grant access to products using AWS IAM.
- Versioning. Update products to newer versions and propagate changes automatically.