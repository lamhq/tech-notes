# Search your data

## Run a search

A search consists of one or more queries that are combined and sent to Elasticsearch. Documents that match a search’s queries are returned in the _hits_, or _search results_, of the response.

You can use the [search API](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/search-search.html) to search and aggregate data stored in Elasticsearch data streams or indices. The API’s query request body parameter accepts queries written in Query DSL.

The following request searches `my-index-000001 `using a `match` query. This query matches documents with a `user.id` value of `kimchy`.

```json
GET /my-index-000001/_search
{
  "query": {
    "match": {
      "user.id": "kimchy"
    }
  }
}
```