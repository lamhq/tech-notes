# Common tasks

## Indexing data

- Indexing a document
- Indexing documents in bulk

## Retrieving a document


## Deleting a Document




## Checking Elasticsearch is running

```
GET /
```


## Indexing a document

```
PUT /{index}/{id}
{
    "field": "value"
}
```


## Indexing documents in bulk

Download the [accounts.json](https://github.com/elastic/elasticsearch/blob/master/docs/src/test/resources/accounts.json?raw=true) sample data set.

```bash
curl -H "Content-Type: application/json" -XPOST "localhost:9200/bank/account/_bulk?pretty&refresh" --data-binary "@accounts.json"
```


## Retrieving a document

```
GET /{index}/{type}/{id}?pretty
```


## Retrieving Part of a Document

```
GET /{index}/{type}/{id}?_source=title,text
```


## Checking whether a Document exists

```
HEAD /{index}/{type}/{id}
```


## Deleting a Document

```
DELETE /website/blog/123
```


## Create an index with an explicit mapping

```
PUT /my-index
{
  "mappings": {
    "properties": {
      "age":    { "type": "integer" },  
      "email":  { "type": "keyword"  }, 
      "name":   { "type": "text"  }     
    }
  }
}
```


## View mapping of an index

```
GET /my-index/_mapping
```


## View the mapping of specific field

```
GET /my-index/_mapping/field/employee-id
```
## Using Versions from an External System

If your main database already has version numbers—or a value such as timestamp that can be used as a version number—then you can reuse these same version numbers in Elasticsearch by adding `version_type=external` to the query string.

The way external version numbers are handled is a bit different from the internal version numbers we discussed previously. Instead of checking that the current `_version` is the same as the one specified in the request, Elasticsearch checks that the current `_version` is less than the specified version. If the request succeeds, the external ver‐ sion number is stored as the document’s new `_version`.

External version numbers can be specified not only on index and delete requests, but also when creating new documents.


## Partial Updates to Documents

```
POST /website/blog/1/_update
{
  "script" : "ctx._source.views+=1"
}

POST /website/blog/1/_update
{
  "script" : "ctx._source.tags+=new_tag",
  "params" : {
    "new_tag" : "search"
  }
}
```

## Updating a Document That May Not Yet Exist

```
POST /website/pageviews/1/_update
{
  "script" : "ctx._source.views+=1",
  "upsert": {
    "views": 1
  }
}
```