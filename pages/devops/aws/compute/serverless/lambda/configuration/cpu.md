# Computing power

In virtual computing, a virtual CPU is a fraction of a physical CPU allocated to a virtual machine (VM) by the VM management software, called a hypervisor. The hypervisor can either assign a single CPU core or distribute the CPU time across multiple cores.

In Lambda, CPU scales with memory.

Each Lambda function is a micro VM, and vCPU is assigned:
- 128 MB of memory equivalent of 7% of a vCPU
- 1,769 MB of memory equivalent of one vCPU
- 10,240 MB of memory equivalent of six vCPUs
