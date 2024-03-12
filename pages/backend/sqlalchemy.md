# SQLAlchemy

## Version

This document is for version `1.4.51`.


## Why Use SQLAlchemy?

- **Abstraction:** Hides database SQL specifics.
- **Efficiency:** Creates efficient SQL for each database type automatically.
- **Migration:** Simplifies moving between different databases like Oracle to PostgreSQL.
- **Security:** Prevents SQL injection through proper input sanitation.
- **Flexibility:** Offers two major modes of usage: SQL Expression Language (SQLAlchemy Core) and ORM.


## SQLAlchemy Core or ORM?

- If you are working with a framework that already has an ORM built in, but want to add more powerful reporting, use **Core**.
- If you want to view your data in a more schema-centric view (as used in SQL), use **Core**.
- If you have data for which business objects are not needed, use **Core**.
- If you view your data as business objects, use **ORM**.
- If you are building a quick prototype, use **ORM**.
- If you have a combination of needs that really could leverage both business objects and other data unrelated to the problem domain, use **both**!


## Architecture & Components

![](https://docs.sqlalchemy.org/en/14/_images/sqla_arch_small.png)


### SQLAlchemy Core

SQLAlchemy Core is the foundational architecture for SQLAlchemy as a “database toolkit”.

The library provides tools for managing connectivity to a database, interacting with database queries and results, and programmatic construction of SQL statements.

#### SQL Expression Language

The SQL Expression Language is a toolkit on its own, independent of the ORM package, which provides a system of constructing SQL expressions represented by composable objects, which can then be “executed” against a target database

#### Dialects

The dialect is the system SQLAlchemy uses to communicate with various types of **DBAPI** implementations and databases.

All dialects require that an appropriate DBAPI driver is installed.


### DBAPI

The DBAPI is a “low level” API which is used in a Python application to talk to a database.


### SQLAlchemy ORM

SQLAlchemy ORM builds upon the Core to provide optional object relational mapping capabilities.





## References

- [SQLAlchemy 1.4 / 2.0 Tutorial](https://docs.sqlalchemy.org/en/14/tutorial/index.html#unified-tutorial)
- [SQLAlchemy ORM](https://docs.sqlalchemy.org/en/14/orm/index.html)
- [SQLAlchemy Core](https://docs.sqlalchemy.org/en/14/core/index.html)
- [Dialects](https://docs.sqlalchemy.org/en/14/dialects/index.html)
