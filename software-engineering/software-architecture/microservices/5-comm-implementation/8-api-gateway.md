# Service Meshes and API Gateways

**Service meshes** and **API gateways** are two technologies that have received significant attention and generated some confusion within the realm of microservices.

Both service meshes and API gateways have their roles and use cases, but there can be some overlap in their responsibilities.

It's important to understand how these technologies fit into a microservices architecture and to avoid potential misuse or misinterpretation.

## Networked Perimeter

The term "networked perimeter" could relate to an entire data center, a Kubernetes cluster, or perhaps just a virtual networking concept like a group of machines running on the same virtual LAN.

In a networked perimeter, an **API gateway** typically handles **"north-south"** traffic. Its primary role is to manage access from the outside world to the internal microservices.

A **service mesh**, on the other hand, primarily addresses **"east-west"** traffic, focusing on the communication between microservices within the networked perimeter.

![](api-gateway-service-mesh.png)


## API Gateways