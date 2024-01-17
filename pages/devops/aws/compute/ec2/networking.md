# Networking with EC2

You can attach 3 types of virtual networking cards to your EC2 instances.

## Elastic Network Interface (ENI)

A network interface can include the following attributes:
- **A primary private IPv4** address from the IPv4 address range of your VPC.
- **A primary IPv6** address from the IPv6 address range of your VPC
- **One or more secondary private IPv4** addresses from the IPv4 address range of your VPC
- **One Elastic IP** address (IPv4) per private IPv4 address.
- **One public IPv4** address
- One or more IPv6 addresses
- One or more security groups
- A MAC address
- A source/destination check flag.

Can be used with all instance types.

An ENI is bound to an AZ, and you can specify which subnet/AZ you want the ENI to be added in.

You can add additional ENIs to EC2 instances (number dependent on instances family/type).

Default ENI are terminated with instance termination. Manually added ENIs are not terminated by default.

You can change the termination behavior.

### Attaching ENIs
- ENIs can be "hot attached" to running instances.
- ENIs can be "warm-attached" when the instance is stopped.
- ENIs can be "cold-attached" when the instance is launched.

### `Eth0` network interface
- `eth0` is the primary network interface and cannot be moved or detached.
- By default, `eth0` is the only Elastic Network Interface (ENI) created with an EC2 instance when launched.
- If you add a second interface AWS will not assign a public IP address to `eth0`.

### Use cases
- basic networking
- low-budget, high-availability solution
- management network
- logging network


## Enhanced Networking – Elastic Network Adapter (ENA)

Provide high-performance networking between 10 Gbps - 100 Gbps, 
higher bandwidth, higher packet per second (PPS) performance,
and consistently lower inter-instance latencies.

Depending on your instance type, enhanced networking can be enabled using:
- Elastic network adapter (ENA): supports network speeds of up to **100 Gbps** (for supported instance types).
- Intel 82599 virtual function (VF) interface: support speeds of up to **10 Gbps**, typically used on older instances.

AWS currently supports enhanced networking capabilities using SR-IOV. SR-IOV provides direct access to network adapters, provides higher performance (packets-per-second) and lower latency.

Supported for limited instance types (HVM only).

Only available for certain instance types.

Only supported in an Amazon VPC.

Use cases:
- Good for use cases that require higher bandwidth and lower inter-instance latency.
- When you need speeds between 10 Gbps and 100 Gbps
- anywhere that need reliable, high throughput


## Elastic fabric adapter (EFA)

An Elastic Fabric Adapter is an ENA that you can attach to your EC2 instance to 
accelerates high performance computing (HPC) and machine learning applications.

An EFA can still handle IP traffic, but also supports an important access model commonly called OS bypass. OS-bypass enable high performance compute and machine learning applications to bypass the operating system kernel and communicate directly with the EFA device. Now only support Linux.

EFA is available as an optional EC2 networking feature that you can enable on any supported EC2 instance at no additional cost.

Can use with all instance types.

Use cases:
- High Performance Computing (HPC) applications using the Message Passing Interface (MPI).
- Machine Learning (ML) applications using NVIDIA Collective Communications Library (NCCL).
- OS-bypass
