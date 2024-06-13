# Concurrency

## Anomalies

Different types of anomalies that can occur due to concurrent transactions.

### Dirty Read

This occurs when a transaction reads data that has been modified by another transaction but not yet committed.

The data read might be rolled back if the other transaction fails, leading to potential inconsistencies.


### Non-Repeatable Read

This happens when a transaction reads the same row twice and the data changes between reads due to another committed transaction.

This means the first transaction cannot repeat the initial read because the data has been modified.


### Phantom Read

A phantom read occurs when a transaction re-executes a query and finds that the set of rows it returns has changed because of another committed transaction.

This typically happens when new rows are added or existing rows are deleted by the other transaction.


## Locks

Locks are mechanisms used to manage concurrent access to data to ensure consistency and isolation.

They help prevent issues like dirty reads, non-repeatable reads, and phantom reads by controlling access to data during concurrent transactions.


### Shared Lock (S-Lock)

This lock allows multiple transactions to read a data item concurrently but prevents any transaction from writing to the data item while the lock is in place.

It's often used for read operations and ensures that no updates occur on the data item during the read, maintaining read integrity.

### Exclusive Lock (X-Lock)

This lock allows a transaction to both read and write a data item. While an exclusive lock is held, no other transactions can read or write the data item.

It's typically used for write operations to ensure that no other transactions can access the data item until the lock is released, either by a commit or rollback.


## Isolation Levels

### Serializalble

This is the highest isolation level.

Concurrent transactions are guaranteed to be executed in sequence.


### Repeatable Read

Data read during the transaction stays the same as the transaction starts.


### Read Committed

Data modification can only be read after the transaction is committed.


### Read Uncommitted

The data modification can be read by other transactions before a transaction is committed.


| Dirty Read | Non-repeatable | Phantom Read | Isolation Level  |
|------------|----------------|--------------|------------------|
| Impossible | Impossible     | Impossible   | Serializable     |
| Impossible | Impossible     | Probably     | Repeatable Read  |
| Impossible | Probably       | Probably     | Read Committed   |
| Probably   | Probably       | Probably     | Read Uncommitted |
