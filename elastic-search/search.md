# Search

## Search response

- `hits`: contains the `total` number of documents that matched our query, and a `hits` array containing the first 10 of those matching documents.
- `took`: how many milliseconds the entire search request took to execute.
- `shards`: the total number of `shards` that were involved in the query and, of them, how many were `successful` and how many `failed`. 
- `timeout`: whether the query timed out


## Search in multiple index, type

```
GET /_all/_search
GET /_search
GET /gb,us/_search
GET /g*,u*/_search
GET /gb,us/user,tweet/_search
```


## Pagination
- `size`: Indicates the number of results that should be returned, defaults to 10
- `from`: Indicates the number of initial results that should be skipped, defaults to 0

```
GET /_search?size=5&from=10
```
