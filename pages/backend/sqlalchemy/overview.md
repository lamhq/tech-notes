# SQLAlchemy

## Version

This document is for version `2.0.25` (Jan 2024).

## Components

![](https://docs.sqlalchemy.org/en/20/_images/sqla_arch_small.png)

### DBAPI

The DBAPI is a “low level” API which is used in a Python application to talk to a database.


### Dialects

The dialect is the system SQLAlchemy uses to communicate with various types of **DBAPI** implementations and databases.

All dialects require that an appropriate DBAPI driver is installed.


### SQL Expression Language

The SQL Expression Language is a toolkit on its own, independent of the ORM package, which provides a system of constructing SQL expressions represented by composable objects, which can then be “executed” against a target database


### SQLAlchemy Core

SQLAlchemy Core is the foundational architecture for SQLAlchemy as a “database toolkit”.

The library provides tools for managing connectivity to a database, interacting with database queries and results, and programmatic construction of SQL statements.


### SQLAlchemy ORM

SQLAlchemy ORM builds upon the Core to provide optional object relational mapping capabilities.


## References

- [SQLAlchemy Unified Tutorial](https://docs.sqlalchemy.org/en/20/tutorial/index.html#unified-tutorial)
- [SQLAlchemy ORM](https://docs.sqlalchemy.org/en/20/orm/index.html)
- [SQLAlchemy Core](https://docs.sqlalchemy.org/en/20/core/index.html)
- [Dialects](https://docs.sqlalchemy.org/en/20/dialects/index.html)
- [Code Examples](https://docs.sqlalchemy.org/en/20/orm/examples.html)
