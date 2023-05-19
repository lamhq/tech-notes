# Mapping

Mapping is the process of defining how a document, and the fields it contains, are stored and indexed.

A mapping definition defines structure and field types of the documents stored in an index.

## Explicit mapping

We define the fields and their types when creating the index (or add fields to an existing index).

Explicit mapping allows you to precisely choose how to define the mapping definition, such as:

- Which string fields should be treated as full text fields.
- Which fields contain numbers, dates, or geolocations.
- The format of date values.
- Custom rules to control the mapping for dynamically added fields.


## Dynamic mapping

To index a document, you don't have to first create an index, define a mapping type, and define your fields — you can just index a document and the index, type, and fields will display automatically.


## Create a new index with an explicit mapping

```json
PUT /my-index-000001
{
  "mappings": {
    "properties": {
      "age":    { "type": "integer" },
      "email":  { "type": "keyword"  },
      "name":   { "type": "text"  },
      "manager": {
        "properties": {
          "age":  { "type": "integer" },
          "name": {
            "properties": {
              "first": { "type": "text" },
              "last":  { "type": "text" }
            }
          }
        }
      }
    }
  }
}
```


## View the mapping of an index

```json
GET /my-index-000001/_mapping
```


## Field data types

### `text`

Use when you require full-text search for particular fields such as the bodies of e-mails or product descriptions

### `keyword`

Use when you require an exact-value search, particularly when filtering, sorting, or using aggregations.

Keyword fields are only searchable by their exact value.

Use keyword data types when you have fields like email addresses, hostnames, status codes, zip codes, or tags.

### `date`

JSON doesn’t have a date data type, so dates in Elasticsearch can either be:

- strings containing formatted dates, e.g. `"2015-01-01"` or `"2015/01/01 12:10:30"`.
- a number representing *milliseconds-since-the-epoch*.
- a number representing *seconds-since-the-epoch*.

Internally, dates are converted to UTC and stored as a long number representing milliseconds-since-the-epoch.

Queries on dates are internally converted to range queries on this long representation.

The result of aggregations and stored fields is converted back to a string depending on the date format that is associated with the field.

Date formats can be customised, but if no format is specified then it uses the default: `"strict_date_optional_time||epoch_millis"`

```json
// The date field uses the default format.
PUT my-index-000001
{
  "mappings": {
    "properties": {
      "date": {
        "type": "date"
      }
    }
  }
}

// This document uses a plain date.
PUT my-index-000001/_doc/1
{ "date": "2015-01-01" }

// This document includes a time.
PUT my-index-000001/_doc/2
{ "date": "2015-01-01T12:10:30Z" }

// This document uses milliseconds-since-the-epoch.
PUT my-index-000001/_doc/3
{ "date": 1420070400001 }

// Note that the sort values that are returned are all in milliseconds-since-the-epoch.
GET my-index-000001/_search
{
  "sort": { "date": "asc"}
}
```

### `nested`

The `nested` type allows arrays of objects to be indexed in a way that they can be queried independently of each other.


```json
PUT my-index-000001
{
  "mappings": {
    "properties": {
      "user": {
        "type": "nested" 
      }
    }
  }
}

PUT my-index-000001/_doc/1
{
  "group" : "fans",
  "user" : [
    {
      "first" : "John",
      "last" :  "Smith"
    },
    {
      "first" : "Alice",
      "last" :  "White"
    }
  ]
}

GET my-index-000001/_search
{
  "query": {
    "nested": {
      "path": "user",
      "query": {
        "bool": {
          "must": [
            { "match": { "user.first": "Alice" }},
            { "match": { "user.last":  "Smith" }} 
          ]
        }
      }
    }
  }
}
```

### How about Arrays?

In Elasticsearch, there is no dedicated array data type.

All values in the array must be of the same data type.

Arrays with a mixture of data types are not supported: `[ 10, "some string" ]`

```json
[ "one", "two" ]

[ 1, 2 ]

[ { "name": "Mary", "age": 12 }, { "name": "John", "age": 10 }]
```

**Arrays of objects**

You cannot query each object independently of the other objects in the array. If you need to be able to do this then you should use the `nested` data type instead of the `object` data type.
