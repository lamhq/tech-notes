# Installation

## System requirement

- Python 3.6+


## Install SQLAlchemy

Install via pip:

```shell
pip install SQLAlchemy==1.4.51
```


## Install Database Drivers (dialect)

By default, SQLAlchemy will support SQLite3 with no additional drivers.

Install **Redshift** dialect for SQLAlchemy:
```shell
pip install sqlalchemy-redshift==0.8.14
```

PostgreSQL:
```shell
pip install psycopg2
```

MySQL:
```shell
pip install pymysql
```


## Install connector

Install Redshift connector for Python:

```shell
pip install redshift_connector==2.0.918
```


## Version Check

```py
import sqlalchemy

sqlalchemy.__version__
```
