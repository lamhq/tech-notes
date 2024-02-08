# Google Cloud

## Overview

Google Cloud is a cloud service launched by Google on April 7th, 2008.

It offers a suite of cloud computing services, range from virtual machines to machine learning.

Google Cloud services spans over 35 regions, over 106 zones, and 173 edge locations.


## Zones

Zones are multiple isolated locations with data centers in a **region**.

Each data centers have low latency connections with each other.


## Regions

Regions are around the world, made of a collection of zones.


## Edge locations 

Edge locations are locations around the world that deliver cloud services to you with the lowest latency.


## Network service tiers

Google Cloud offers two Network service tiers to optimize connectivity between systems on the internet and your Google Cloud instances.

### Premium Tier

Delivers traffic inside Google Cloud's network, ensuring **high reliability** and **low latency**.

You connect to the internet provider that head to an edge location.

Ideal for optimizing performance. 

**Ingress** (incoming) traffic is free, **egress** (outgoing) traffic is priced at internet egress rates.


### Standard Tier

Uses regular ISP networks.

Your traffic will be bouncing around in any edge location.

Designed for **cost efficiency**.

Both ingress and egress traffic have associated costs.

Egress pricing is based on the source region of the traffic.
