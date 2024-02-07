# Concepts

## Registry

A registry in SQLAlchemy is a collection of mappings between classes and tables, which can be used to create, query, or modify database objects.

A registry can be associated with one or more engines or connections, and can be used to map classes using different methods, such as declarative base, declarative decorator, or imperative mapping.


## The Session object

The session is the way SQLAlchemy ORM interacts with the database.

It wraps a database connection via an engine, and provides an identity map for objects that you load via (or associate with) the session.

A session also wraps a transaction, and that transaction will be open until the session is committed or rolled back.


## Identity map

The identity map is a cache-like data structure that contains a unique list of objects determined by the object’s table and primary key.


## Unit of Work pattern

It's a software architecture where a persistence system (such as an object relational mapper) maintains a list of changes made to a series of objects, and periodically flushes all those pending changes out to the database.


## Flushing

The Session accumulates changes one at a time, but does not actually communicate them to the database until needed.

When it does emit SQL to the database to push out the current set of changes, the process is known as a **flush**.


## `flush()` vs. `commit()`

### `flush()`

- synchronizes the session with the database, but does not commit the changes
- it sends all pending changes to the database, allowing you to query the database and see the effects of those changes
- changes are still in a transaction that can be rolled back.
  
### `commit()`

- permanently saves the changes to the database, end the transaction
- also flushes out changes to the database before ending the transaction.
- the changes are visible to other sessions and transactions.


### Example

```py
# Create a new session
s = Session()

# Add a new user to the session
s.add(User(name="Alice"))

# The user is not in the database yet, but is returned by the query
print(s.query(User).all()) # [<User(name='Alice')>]

# Commit the changes to the database
s.commit()

# The user is now in the database and visible to other sessions
s2 = Session()
print(s2.query(User).all()) # [<User(name='Alice')>]

# Add another user to the session
s.add(User(name="Bob"))

# The user is not in the database yet, but is returned by the query
print(s.query(User).all()) # [<User(name='Alice')>, <User(name='Bob')>]

# Flush the changes to the database, but do not commit them
s.flush()

# The user is in the database, but not committed yet
print(s2.query(User).all()) # [<User(name='Alice')>]

# Roll back the changes
s.rollback()

# The user is no longer in the session or the database
print(s.query(User).all()) # [<User(name='Alice')>]
print(s2.query(User).all()) # [<User(name='Alice')>]
```
