# Privileges

When an object is created, it is assigned an owner.

The initial state is that only the owner (or a superuser) can do anything with the object. 

To allow other roles to use it, privileges must be granted.

The privileges applicable to a particular object vary depending on the object's type.

An object can be **assigned to a new owner** with an `ALTER` command:

```sql
ALTER TABLE table_name OWNER TO new_owner;
```

To **assign privileges**, the `GRANT` command is used:

```sql
GRANT UPDATE ON accounts TO joe;
```

To **revoke** a previously-granted privilege:

```sql
REVOKE ALL ON accounts FROM PUBLIC;
```

## With grant option

Ordinarily, only the object's owner (or a superuser) can grant or revoke privileges on an object. 

However, it is possible to grant a privilege “with grant option”, which gives the recipient the right to grant it in turn to others.

If the grant option is subsequently revoked then all who received the privilege from that recipient (directly or through a chain of grants) will lose the privilege.

Owners are always treated as holding all grant options, so they can always re-grant their own privileges.


## Available privileges

- `TRUNCATE`: Allows `TRUNCATE` on a table.
- `REFERENCES`: Allows creation of a foreign key constraint referencing a table, or specific column(s) of a table.
- `TRIGGER`: Allows creation of a trigger on a table, view, etc.
- `CONNECT`: Allows the grantee to connect to the database.
- `TEMPORARY`: Allows temporary tables to be created while using the database.
- `EXECUTE`: Allows calling a function or procedure
- `USAGE`: For schemas, allows access to objects contained in the schema

[ACL Privilege Abbreviations](https://www.postgresql.org/docs/14/ddl-priv.html#PRIVILEGE-ABBREVS-TABLE)

[psql commands to examine privilege settings for each object type](https://www.postgresql.org/docs/14/ddl-priv.html#PRIVILEGES-SUMMARY-TABLE)

The privileges that have been granted for a particular object are displayed as a list of aclitem entries, where each aclitem describes the permissions of one grantee that have been granted by a particular grantor. 


## Row Security Policies

https://www.postgresql.org/docs/14/ddl-rowsecurity.html
