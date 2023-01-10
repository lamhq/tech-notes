# Configuration Files

## `postgresql.conf`

Controls general settings:

- memory allocation
- default storage location for new databases
- the IP addresses that PostgreSQL listens on
- location of logs
- ...

Instead of editing `postgresql.conf` directly, you should override settings using an additional file called `postgresql.auto.conf`

## `pg_hba.conf`

Controls access to the server:
- which users can log in
- which IP addresses can connect
- which authentication scheme to accept

A typical `pg_hba.conf` looks like this:

```
# TYPE  DATABASE USER ADDRESS         METHOD
host    all      all  127.0.0.1/32    ident
host    all      all  ::1/128         trust
host    all      all  192.168.54.0/24 md5
hostssl all      all  0.0.0.0/0       md5
```

- `METHOD`: Authentication method:
  - `trust`: no password is needed, should only for local connections or private network
  - `md5`: requires an md5-encrypted password to connect.
  - `password`: Uses clear-text password authentication.
  - `ident`: Uses `pg_ident.conf` to check OS account
  - `cert`: Stipulates that connections use SSL
- `ADDRESS`: network range, support IPv6 and IPv4
- `TYPE`: connection type, support ssl


## `pg_ident.conf`

This file maps an authenticated OS login to a PostgreSQL user.


## Configuration Files Location

you will find configuration files in the main PostgreSQL data folder

If you are unable to find the physical location of these files, run the query below as a superuser while connected to any database:

```sql
SELECT name, setting FROM pg_settings WHERE category = 'File Locations';
```

Lists the source file where the settings can be found:

```sql
SELECT name, sourcefile, sourceline, setting, applied
FROM pg_file_settings
WHERE name IN ('listen_addresses','deadlock_timeout','shared_buffers', 'effective_cache_size','work_mem','maintenance_work_mem')
ORDER BY name;
```

The `applied` tells you whether the setting is in effect; if the setting has an `f` in that column you need to reload or restart to make it take effect.


## Making Configurations Take Effect

Some configuration changes require a PostgreSQL service **restart**. Other changes require just a **reload**.

If you’re not sure whether a configuration change requires a reload or restart, look under the `context` setting associated with a configuration. If the `context` is `postmaster`, you’ll need a restart. If the `context` is `user`, a reload will suffice.


### Reloading

open a console window and run this command:

```sh
pg_ctl reload -D your_data_directory_here
```

If you have PostgreSQL installed as a service in RedHat Enterprise Linux, CentOS, or Ubuntu, enter instead:

```sh
service postgresql-9.5 reload
```

You can also log in as a superuser and execute the following SQL:

```sql
SELECT pg_reload_conf();
```


### Restarting

you can trigger a restart from the operating system shell. On Linux/Unix with a service, enter:

```sh
service postgresql-9.6 restart
```

For any PostgreSQL instance not installed as a service:

```sh
pg_ctl restart -D your_data_directory_here
```


## Getting `postgresql.conf` settings

```sql
SELECT
  name,
  context,
  unit,
  setting, boot_val, reset_val
FROM pg_settings
WHERE name IN ('listen_addresses','deadlock_timeout', 'shared_buffers', 'effective_cache_size','work_mem','maintenance_work_mem')
ORDER BY context, name;
```

- `context` is the scope of the setting
- `units` is the unit of measurement used for memory
- `setting` is the current setting
- `boot_val` is the default setting
- `reset_val` is the new setting if you were to restart or reload the server.


## Changing `postgresql.conf` settings

```sql
ALTER SYSTEM SET work_mem = '500MB';
```


## Allow connections from outside

To allow connections to a PostgreSQL server from a public IP address, you will need to modify the `pg_hba.conf` file and the `postgresql.conf` file.

The `pg_hba.conf` file controls which IP addresses are allowed to connect to the PostgreSQL server. You will need to add a line to the file:

```
host    all             all             0.0.0.0/0              trust
```

The `postgresql.conf` file controls the network settings for the PostgreSQL server. To allow connections from a public IP address, you will need to ensure that the `listen_addresses` setting is set to `'*'`.