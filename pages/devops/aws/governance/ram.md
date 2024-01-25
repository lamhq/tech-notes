# AWS Resource Access Manager (RAM)

## Overview

A free service that allows you to **share AWS resources** with other accounts inside or outside your organization.

AWS RAM allows you to easily share resources rather than having to create duplicate copies in your different accounts.


## Resources

List of resources that can be share using RAM:

- **Transit gateways**: to enable simplified network connectivity across accounts within an org.
- **VPC subnets**: to enhance the flexibility
of network architectures and enable secure communications
between resources between accounts
- **License manager**: to manage software license effectively
- **Route 53 Resolver rules and endpoints**: help manage
DNS routing and resolution
across your different accounts within your org
- **Dedicated hosts**: efficiently allocate
and then manage physical hosts between your accounts
- ...


## Owners and Participants

### Ownership
- Owners create and manage the VPC resources that get shared.
- CANNOT delete or modify resourced deployed by participan accounts

### Participant Accounts
- Able to provision services into the shared VPC subnets.
- CANNOT modify or delete the shared resources!
