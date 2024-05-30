# Processors

## Instruction Set Architecture

An Instruction Set Architecture (ISA) is part of the abstract model of a computer that defines how the CPU is controlled by the software. The ISA acts as an interface between the hardware and the software, specifying both what the processor is capable of doing as well as how it gets done.


## Supported processors

### 64-bit x86 architecture (x86_64)

Traditional CPU architecture, a lot of software has been built for this architecture.

Providing great compatibility and performance for general purpose workloads.

Your Lambda will likely run fine with the x86 instruction set.


### 64-bit ARM architecture (arm64)

Typically used in devices such as phones, tablets, newer M1 MacBooks.

Can achieve better performance for certain workloads, more power efficient for certain types of workloads.

Could have compatibility issues.

Not all runtime support ARM. Include Python 3.7, .NET 5, and Go 1.x.


## Migrate from x86 to ARM

If you do choose to migrate from x86 to ARM:
- check all the dependencies (libraries, packages, tooling, software) being used within the code base
- deploy an updated Lambda to a test environment:
  - check the functionality isn't impacted
  - check the performance