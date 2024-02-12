# Networking

## Networking services

- **VPC**: A global virtual network for Google Cloud resources
- **Cloud CDN**: A global CD
- **Cloud DNS**: A managed domain name resolution service
- **Cloud Load Balancing**: A multi-region load balancing solution
- **Hybrid connectivity**: Cloud VPN, Interconnect, and Partner Interconnect for connecting with Google Cloud

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
