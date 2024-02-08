# High Availability and Fault Tolerance

## High Availability

High availability aims to minimize system downtime, ensuring that services remain accessible and operational as much as possible.

**Measurement**: Typically, HA is quantified by the percentage of time a service is guaranteed to be online and available for use within a year.

HA doesn’t eliminate downtime entirely but focuses on limiting its duration.

It's about keeping systems continuously available.


## Fault Tolerance

Fault tolerance is a system's ability to continue to operate without interruption in the event of disaster or failure of one or more units.

It aims to operate seamlessly even during faults.

A fault-tolerant system can continue operating even when faults occur.

Redundancy plays a crucial role in fault tolerance.

System components (hardware and software) are duplicated to ensure availability, fault detection, and mitigation.

It's about maintaining correct operation despite faults.


## Redundancy

Redundancy involves deploying additional copies of system components (e.g., servers, databases) that are not necessary for ordinary operation but are vital for ensuring availability and fault recovery.

Both HA and fault tolerance rely on redundancy.

Redundancy can manifest in different ways, such as data mirroring, backup power supplies, or load balancing.

Redundancy enhances system resilience and minimizes the impact of failures.