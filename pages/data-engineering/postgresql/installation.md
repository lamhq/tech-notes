# Installation

## Install Postgres for macOS

Install PostgreSQL 14 on macOS for local development.

### Using zip archive

Download a [zip archive](https://www.enterprisedb.com/download-postgresql-binaries) for MacOS, then unzip the archive:

```sh
unzip postgre*.zip
```

Add postgresql's bin folder to the Path Environment Variable by executing this command:

```sh
echo "\n# Install postgresql\n\
export PATH=\"/Users/admin/Desktop/apps/pgsql/bin:\$PATH\"" >> ~/.zshrc
```

Create database directory (if the command fail, go to [permission section](./installation.md#persmission-setting)):

```sh
initdb -D /Users/admin/Desktop/apps/pgsql/data
```

Create a script to start the database server:

```sh
echo 'postgres -D /Users/admin/Desktop/apps/pgsql/data' > /Users/admin/Desktop/apps/postgresql.sh
chmod +x /Users/admin/Desktop/apps/postgresql.sh
```

#### Persmission setting

If the `initdb` command fails, go to **Privacy & Security** to allow apps from `Anywhere`.

You may need to run the below command to make the option `Anywhere` appears:

```sh
sudo spctl --master-disable
```


### Using Homebrew

```sh
brew install postgresql
```

This installs the command line console (psql) as well as a PostgreSQL server locally.

Start the server (in foreground):

```sh
/opt/homebrew/opt/postgresql/bin/postgres -D /opt/homebrew/var/postgres
```

To get the command above, run `brew info postgresql` and copy it from the output.


## Install Postgresql client on Amazon Linux 2

```sh
sudo amazon-linux-extras install postgresql13
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
CREATE USER albert PASSWORD '123';
ALTER USER albert WITH SUPERUSER;
CREATE DATABASE test_db;
GRANT ALL PRIVILEGES ON DATABASE test_db TO albert;
```


## Change user password

```sql
ALTER USER albert WITH PASSWORD 'LpcCfWmYezV5UDSq';
```
