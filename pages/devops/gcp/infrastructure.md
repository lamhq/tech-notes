# Google Cloud Infrastructure

## Regions

Regions are  specific geographical location that consists of one or more zones.

There're multiple regions per continent.


## Zones

Zones are unique physical location within a region,
which have high bandwidth and low latency connections
to other zones in the same region.


## Edge locations 

Edge locations are locations around the world that respond to the user's requests with the lowest latency.

Edge locations offer connections to Google Cloud services
from over 173 locations.


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
