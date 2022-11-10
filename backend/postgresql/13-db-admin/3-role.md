# Roles

PostgreSQL handles credentialing using roles.

Roles that can log in are called **login roles**.

Roles that contain other roles are called **group roles**. Group roles generally cannot log in.


## Creating Login Roles

Creating login roles:

```sql
CREATE ROLE leo LOGIN PASSWORD 'king' VALID UNTIL 'infinity' CREATEDB;
```

- `VALID UNTIL` is optional
- `CREATEDB` grants database creation privilege

When you initialize the data cluster during setup, PostgreSQL creates a single login role with the name `postgres`


Creating superuser roles:

```sql
CREATE ROLE regina LOGIN PASSWORD 'queen' SUPERUSER;
```

You must be a superuser to create other superusers.


## Creating Group Roles

```sql
CREATE ROLE royalty INHERIT;
```

- `INHERIT` means any member of royalty will automatically inherit privileges of the `royalty` role 

## Add members to a group role

```sql
GRANT royalty TO leo;
GRANT royalty TO regina;
```


## superuser privilege inheritance

PostgreSQL never passes down the **superuser** privilege

For example, although you can create a group role that you mark as superuser, this doesn’t make its member roles superusers. 

However, those users can impersonate their group role by using the `SET ROLE` command. Their superuser rights will last only for their current session.