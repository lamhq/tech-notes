# Installation

## System requirement

- Python 3.6+


## Install SQLAlchemy

Install via pip:

```shell
pip install SQLAlchemy==1.4.51
```


## Install Database Drivers (dialect)

### SQLite3

By default, SQLAlchemy will support SQLite3 with no additional drivers.

### Amazon Redshift

Install dialect and connector for Redshift:
```shell
pip install sqlalchemy-redshift==0.8.14 redshift_connector==2.0.918
```

### PostgreSQL (macOS)

```shell
pip install psycopg2-binary
```

### MySQL

```shell
pip install pymysql
```


## Version Check

```py
import sqlalchemy

sqlalchemy.__version__
```
