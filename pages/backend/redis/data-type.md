# Data Types

Redis supports 5 types of data types.

## String

Commands used on `STRING` values

| Command | What it does |
|---|---|
| GET | Fetches the data stored at the given key |
| SET | Sets the value stored at the given key |
| DEL | Deletes the value stored at the given key (works for all types) |

There are also a handful of other commands for reading and writing **parts of `STRING`s**, and commands that allow us to treat strings as **numbers** to increment/decrement them.

```sh
set hello world
get hello
del hello
```

## List

`LIST`s in Redis store an ordered sequence of strings

| Command | What it does |
|---|---|
| RPUSH | Pushes the value onto the right end of the list |
| LRANGE | Fetches a range of values from the list |
| LINDEX | Fetches an item at a given position in the list |
| LPOP | Pops the value from the left end of the list and returns it |

```sh
# When we push items onto a LIST, the command returns the current length of the list.
rpush list-key item

# fetch the entire list by passing a range of 0 for the start index and -1 for the last index.
lrange list-key 0 -1

# fetch individual items from the list with LINDEX
lindex list-key 1

# Popping an item from the list makes it no longer available
lpop list-key
```

## Set

`SET`s are similar to `LIST`s, but all items are unique.

`SET`s are unordered, we can’t push and pop items from the
ends. Instead, we add and remove items by value with the `SADD` and `SREM` commands

| Command | What it does |
|---|---|
| SADD | Adds the item to the set |
| SMEMBERS | Returns the entire set of items |
| SISMEMBER | Checks if an item is in the set |
| SREM | Removes the item from the set, if it exists |

Three commonly used operations with SETs include intersection, union, and difference (`SINTER`, `SUNION`, and `SDIFF`)

```sh
# return a 1 if the item is new to the set and 0 if it was already in the SET
add set-key item

# fetch all of the items in the SET,
smembers set-key

# check whether an item is in the SET
sismember set-key item4

# remove item
srem set-key item2
```

## Hashes

`HASH`es store a mapping of keys to values.

The values that can be stored in `HASH`es are the same as what can be stored as normal `STRING`s.

We can think of `HASH`es in Redis as miniature versions of Redis itself.

we can consider a Redis `HASH` as being similar to a **document** in a document store, or a **row** in a relational database, in that we can access or change individual or multiple fields at a time.

| Command | What it does |
|---|---|
| HSET | Stores the value at the key in the hash |
| HGET | Fetches the value at the given hash key |
| HGETALL | Fetches the entire hash |
| HDEL | Removes a key from the hash, if it exists |
| HINCRBY | Increments the number stored at `field` in the hash |

```sh
hset hash-key sub-key1 value1
hset hash-key sub-key2 value2
hgetall hash-key
hget hash-key sub-key1
hdel hash-key sub-key2
```

## Sorted set

Like Redis `HASH`es, `ZSET`s also hold a type of key and value.

The keys (called **members**) are unique, and the values (called **scores**) are limited to **floating-point numbers**.

Members are ordered by associated score. Scores, ordered by numeric value.

| Command | What it does |
|---|---|
| ZADD | Adds member with the given score to the ZSET |
| ZSCORE | Returns the score of `member` in the sorted set `key` |
| ZRANGE | Fetches the items in the ZSET from their positions in sorted order |
| ZRANGEBYSCORE | Fetches items in the ZSET based on a range of scores |
| ZREM | Removes the item from the ZSET, if it exists |
| ZINCRBY | Increments the score of `member` in the sorted set |

```sh
zadd zset-key 728 member1
zadd zset-key 982 member0

# fetch all items
zrange zset-key 0 -1 withscores

# fetch items based on their scores
zrangebyscore zset-key 0 800 withscores
zrem zset-key member1
```