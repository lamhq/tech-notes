# Directory Service

## Overview

AWS Directory Service is a fully managed version of **Active Directory**.

Allows you to offload the painful parts of keeping AD online to AWS while still giving you the full control and flexibility AD provides.


## Available Types

### Managed Microsoft AD

An entire active directory suite that is managed by AWS. Gives you all of the AD tools that you know and love, without the heavy lifting of having to set it up yourself. 

Great if you’re building out a complete active directory suite inside of AWS.


### AD Connector

It creates a tunnel between your AWS environment and your on-prem AD, allowing you to authenticate against an endpoint inside of AWS while leaving all of your actual users in data on-prem.

Useful when you want to leave AD in a physical data center in the physical office, but you need to have something inside of the cloud.


### Simple AD

It's effectively just an authentication service that's up and running inside of AWS and it's actually powered by Linux Samba Active Directory compatible server.

Doesn’t have all of the standard AD architecture that you love, but got the basics.