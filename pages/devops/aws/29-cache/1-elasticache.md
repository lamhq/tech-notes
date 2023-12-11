# Amazon ElastiCache

## Overview

ElastiCache is a managed version of 2 open-source technologies: **Memcached** and **Redis**. Neither of these tools are specific to AWS, but by using ElastiCache you avoid a lot of common issues you might encounter.

**Memcached**:
- Simple database caching solution
- Not a database by itself
- No failover or Multi-AZ support
- No backups

**Redis**:
- Supported as a caching solution
- Functions as a standalone database (noSQL)
- Failover and Multi-AZ support
- Supports backups

ElastiCache is an internal caching solution, it sits between application and database.