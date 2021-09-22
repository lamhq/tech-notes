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
psql \
  --host=localhost \
  --port=5432 \
  --username=postgres \
  --dbname=postgres

CREATE DATABASE wrx;
CREATE USER wrxadmin PASSWORD '123';
ALTER USER wrxadmin WITH SUPERUSER;
GRANT ALL PRIVILEGES ON DATABASE wrx TO wrxadmin;
```
