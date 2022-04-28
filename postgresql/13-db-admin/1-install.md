# Install PostgreSQL on Mac

## Download

Download a zip archive for MacOS at [here](https://www.enterprisedb.com/download-postgresql-binaries), then unzip the archive:

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


## Connect to database

```sh
psql \
  --host=localhost \
  --port=5432 \
  --username=postgres \
  --dbname=postgres
```


## Create database and user

```sql
CREATE USER grvadmin PASSWORD '123';
ALTER USER grvadmin WITH SUPERUSER;
CREATE DATABASE wrx;
GRANT ALL PRIVILEGES ON DATABASE wrx TO grvadmin;
```


## Change user password

```sql
ALTER USER grvadmin WITH PASSWORD 'LpcCfWmYezV5UDSq';
```

# Install Postgresql client on Amazon Linux 2

```sh
sudo amazon-linux-extras install postgresql13
```