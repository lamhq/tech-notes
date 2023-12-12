# Networking with EC2

You can attach 3 types of virtual networking cards 
to your EC2 instances.

## Elastic Network Interface (ENI)

**For basic networking.**

Allows:
- Private IPv4 addresses
- Public IPv4 address
- Many IPv6 addresses
- MAC address
- 1 or more security groups

Use cases:
- management network.
- low-budget, high-availability solution
- a separate logging network,

## Enhanced Networking (EN)

**For when you need speeds between 10 Gbps and 100 Gbps. Anywhere you need reliable, high throughput.**

Uses single root I/O virtualization (SRIOV)
to provide high performance and lower CPU utilization.

Provide high-performance networking between 10 Gbps - 100 Gbps, 
higher bandwidth, higher packet per second (PPS) performance,
and consistently lower inter-instance latencies.

Depending on your instance type, enhanced networking can be enabled using:
- Elastic network adapter (ENA): supports network speeds of up to 100 Gbps (for supported instance types).
- Intel 82599 virtual function (VF) interface: support speeds of up to 10 Gbps, typically used on older instances.


## Elastic fabric adapter (EFA)

**For when you need to accelerate High
Performance Computing (HPC) and machine learning applications or if you need to do an OS-bypass. If you see a scenario question mentioning HPC or ML and asking what network adapter you want, choose EFA.**

A network device you can attach to your EC2 instance to 
accelerates high performance computing (HPC)
and machine learning applications.

Provides lower and more consistent latency and higher throughput than the TCP transport traditionally in cloud-based HPC system.

EFA can also use **OS-bypass** that makes it a lot faster
with a much lower latency.

OS-bypasses enable high performance compute and machine learning applications to bypass the operating system kernel and communicate directly with the EFA device. Now only support Linux.
