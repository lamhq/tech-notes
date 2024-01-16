# Hosted Zones

## Overview

A hosted zone is a collection of records for a specified domain.

A hosted zone is analogous to a traditional DNS zone file; it represents a collection of records that can be managed together.

There are two types of zones:
- Public host zone: determines how traffic is routed on the Internet.
- Private hosted zone for VPC: determines how traffic is routed within VPC (resources are not accessible outside the VPC).

Amazon Route 53 automatically creates the Name Server (NS) and Start of Authority (SOA) records for the hosted zones.

Amazon Route 53 creates a set of 4 unique name servers (a delegation set) within each hosted zone.

You can create multiple hosted zones with the same name and different records.

NS servers are specified by Fully Qualified Domain Name (FQDN), but you can get the IP addresses from the command line (e.g. dig or nslookup).

## Private hosted zones

For private hosted zones you can see a list of VPCs in each region and must select one.

For private hosted zones you must set the following VPC settings to `true`:
- `enableDnsHostname`.
- `enableDnsSupport`.

You can associate the Route 53 private hosted zone in one account with a VPC in another account.

To associate a Route 53 private hosted zone in one AWS account (Account A) with a virtual private cloud that belongs to another AWS account (Account B), follow these steps using the AWS CLI:

- From an instance in Account A, authorize the association between the private hosted zone in Account A and the virtual private cloud in Account B.
- From an instance in Account B, create the association between the private hosted zone in Account A and the virtual private cloud in Account B.
- Delete the association authorization after the association is created.

You cannot automatically register EC2 instances with private hosted zones (would need to be scripted).
