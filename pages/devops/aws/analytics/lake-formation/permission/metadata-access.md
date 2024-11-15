# Metadata access permissions

These permissions control access to the metadata stored in the Data Catalog, not the underlying data itself.

They include:
- `Create table`: Allows creating new tables within a database.
- `Alter`: Allows modifying metadata of existing databases and tables.
- `Drop`: Allows deleting metadata objects, such as tables or databases
- `Describe`: Allows viewing metadata details, such as table schemas and database properties.
- `Super`: Grants all available permissions on the metadata resource

To grant metadata access permissions in the Lake Formation console:
1. Go to **Data lake permissions** section, choose **Grant**
2. Choose the principals to grant permissions
3. Choose a method to grant permissions: LF-Tags or catalog resources
4. After that, choose the permissions to grant. The permissions that a grantee can perform (`SELECT`, `CREATE_TABLE`, ...) differs based on the resource type (databases, tables, ...)

To access and manipulate the actual data, you need **Data Access Permissions** (see below).
