# Concepts

## Document

The value of a field can be any of the [BSON data type](https://docs.mongodb.com/manual/reference/bson-types/)

To access an element of an array by the zero-based index position:

```js
{
   ...
   contribs: [ "Turing machine", "Turing test", "Turingery" ],
   ...
}

contribs.2
```


## The `_id` Field

each document stored in a collection requires a unique `_id` field that acts as a primary key.

If an inserted document omits the `_id` field, the MongoDB driver automatically generates an `ObjectId` for the `_id` field. This also applies to documents inserted through update operations with `upsert: true`.

Most MongoDB driver clients will include the `_id` field and generate an `ObjectId` before sending the insert operation to MongoDB; however, if the client sends a document without an `_id` field, the mongod will add the `_id` field and generate the `ObjectId`.

By default, MongoDB creates a unique index on the `_id` field during the creation of a collection.

The `_id` field is always the first field in the documents.

The _id field may contain values of any [BSON data type](https://docs.mongodb.com/manual/reference/bson-types/), other than an array.


## ObjectId

ObjectIds are small, likely unique, fast to generate, and ordered. ObjectId values are 12 bytes in length, consisting of:

- a 4-byte timestamp value, representing the ObjectId’s creation, measured in seconds since the Unix epoch
- a 5-byte random value
- a 3-byte incrementing counter, initialized to a random value

Using ObjectIds for the _id field provides the following additional benefits:

- in the mongo shell, you can access the creation time of the ObjectId, using the `ObjectId.getTimestamp()` method.
- sorting on an `_id` field that stores `ObjectId` values is roughly equivalent to sorting by creation time.


## Timestamps

BSON has a special timestamp type for internal MongoDB use and is not associated with the regular Date type. This internal timestamp type is a 64 bit value where:

- the most significant 32 bits are a time_t value (seconds since the Unix epoch)
- the least significant 32 bits are an incrementing ordinal for operations within a given second.

Within a single mongod instance, timestamp values are always unique.

The BSON timestamp type is for internal MongoDB use. For most cases, in application development, you will want to use the BSON date type.


## Date

BSON Date is a 64-bit integer that represents the number of milliseconds since the Unix epoch (Jan 1, 1970).

BSON Date type is signed. Negative values represent dates before 1970.

Construct a Date using the new Date() constructor in the mongo shell:

```js
var mydate1 = new Date()
```


## String Collation

Collation allows users to specify language-specific rules for string comparison, such as rules for lettercase and accent marks.

You can specify collation for a collection or a view, an index, or specific operations that support collation.


