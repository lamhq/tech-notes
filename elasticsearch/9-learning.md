Compound query
Relevance score
Pagination
Query context
Filter context

# Learning

## Full Text Queries

Analysis is conducted on query before execution.

```
GET /accounts/_search
{
  "query": {
    "match": {
      "firstname": "huff dale"
    }
  }
}
```

## Term Queries

No analysis is conducted on query before execution.


```
GET /accounts/_search
{
  "query": {
    "term": {
      "firstname": "huff dale"
    }
  }
}
```


## Multi-Match

- Full-text search
- Allow searching on multiple fields

```
GET /accounts/_search
{
  "query": {
    "multi_match": {
      "query": "ford",
      "fields": ["firstname", "address"]
    }
  }
}
```

## Match phrase

Match a phrase in a specific field

```
GET /accounts/_search
{
  "query": {
    "match_phrase": {
      "address": "sedgwick street"
    }
  }
}
```

## Wildcards Query

- Term level
- Match term with wild card pattern

```
GET /accounts/_search
{
  "query": {
    "wildcard": {
      "firstname": {
        "value": "h*ll"
      }
    }
  }
}
```


## Fuzzy Query

Return documents that contain terms similar to search terms (close to what we're looking for).

```json
GET /_search
{
  "query": {
    "fuzzy": {
      "user.id": {
        "value": "ki"
      }
    }
  }
}
```


## Regular Expression

```json
GET /_search
{
  "query": {
    "regexp": {
      "user.id": {
        "value": "k.*y",
        "flags": "ALL"
      }
    }
  }
}
```


## Range

```json
GET /accounts/_search
{
  "query": {
    "range": {
      "balance": {
        "gte": 10000,
        "lte": 40000
      }
    }
  }
}
```