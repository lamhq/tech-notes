# Install PostgreSQL (macOS)

## Using Homebrew

```sh
brew install postgresql
```

This installs the command line console (psql) as well as a PostgreSQL server locally.

Start the server (in foreground):

```sh
/opt/homebrew/opt/postgresql/bin/postgres -D /opt/homebrew/var/postgres
```

To get the command above, run `brew info postgresql` and copy it from the output.

## Install using zip archive

### Download

Download a zip archive for MacOS at [here](https://www.enterprisedb.com/download-postgresql-binaries), then unzip the archive:

```sh
unzip postgre*.zip
```

### Config

Add postgresql's bin folder to the Path Environment Variable by edit `~/.zshrc`:

```sh
export PATH="/Users/lam/Desktop/program/pgsql/bin:$PATH"
```

Create database directory:

```sh
initdb -D /Users/lam/Desktop/program/pgsql/data
```

### Start

```sh
postgres -D /Users/lam/Desktop/program/pgsql/data
```


## Connect to database

```sh
psql postgres
```

Getting the current version:

```sql
SELECT VERSION();
```

## Create database and user

```sql
CREATE USER grvadmin PASSWORD '123';
ALTER USER grvadmin WITH SUPERUSER;
CREATE DATABASE gravity;
GRANT ALL PRIVILEGES ON DATABASE gravity TO grvadmin;
```


## Change user password

```sql
ALTER USER grvadmin WITH PASSWORD 'LpcCfWmYezV5UDSq';
```

# Install Postgresql client on Amazon Linux 2

```sh
sudo amazon-linux-extras install postgresql13
```