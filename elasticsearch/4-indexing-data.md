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