# Linux distributions

## Definition

A Linux distribution (Linux distro) consists of:
- the Linux kernel (os)
- a collection of software that came from the GNU Project
- a package manager (method to install new software)

All distributions have one thing in common: the Linux kernel.

Most people just say Linux to refer to a specific Linux distribution.


## Major Linux distributions

View the [full list of Linux distributions](https://en.wikipedia.org/wiki/List_of_Linux_distributions).

### Debian GNU/ Linux

- noncommercial distribution, free of charge, started in 1993
- a huge distribution that takes some time to install.
- use `apt-get` to install packages

### Ubuntu Linux

- Debian-based, noncommercial Linux distribution
- use `apt-get` to install packages

### Fedora

- the successor to Red Hat Linux (Linux distribution from Red Hat)
- freely available
- uses Red Hat Package Manager (RPM)


### Alpine Linux

Designed to be minimalistic, focus on **simplicity**, **security**, and **lightweight design**. 

The default installation media for Alpine Linux is only **133 MB**.
   
Based on **musl libc** (a lightweight C library) and **BusyBox** (a set of Unix utilities).

**Use cases**: routers, firewalls, VPNs, servers, It’s also an excellent base image for [**creating containers**](https://www.tecmint.com/linux-distributions-for-containers/) or **running containerized workloads** in production

Incorporates proactive security measures like **PaX** and **SSP** to prevent software vulnerabilities from being exploited.

Alpine Linux is actively maintained and updated with new features, security patches, and bug fixes.

Uses `apk` (Alpine Package Keeper) for package management. Doesn’t strictly adhere to either the Debian-style or Redhat-style package management conventions.