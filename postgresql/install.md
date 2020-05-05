# Install PostgreSQL on Mac

## Download

Download a zip archive for MacOS at [here](https://www.enterprisedb.com/download-postgresql-binaries)

Then unzip the archive

```shell
unzip postgre*.zip
```

## Setup

Add postgresql's bin folder to the Path Environment Variable by edit `~/.zshrc`:

```shell
export PATH="/Users/lam/Desktop/program/pgsql/bin:$PATH"
```

Create database directory:

```shell
initdb -D /Users/lam/Desktop/program/pgsql/data
```

Start PostgreSQL:

```shell
postgres -D /Users/lam/Desktop/program/pgsql/data
```

## Create database and user

```shell
psql -h localhost -p 5432 postgres;

CREATE DATABASE mobilesc_db;
CREATE USER mscadmin PASSWORD 'abc@123!';
ALTER USER mscadmin WITH SUPERUSER;
GRANT ALL PRIVILEGES ON DATABASE mobilesc_db TO mscadmin;
```
