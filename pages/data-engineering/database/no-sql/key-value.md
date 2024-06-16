# Key-Value Database

A key-value store is a dictionary or hash table database.

It is designed for CRUD operations with a unique key for each record:
- Create(key, value): Add a key-value pair to the datastore
- Read(key): Lookup the value associated with the key
- Update(key, value): Change the existing value for the key
- Delete(key): Delete the (key, value) record from the datastore

The values do not have a fixed schema and can be anything from primitive values to compound structures.

Key-value stores are highly partitionable (thus scale horizontally).

Options:
- Redis
