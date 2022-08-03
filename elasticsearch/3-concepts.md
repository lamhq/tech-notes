# Key concepts

## Comparing Elasticsearch and Relational Database

| Relational Database | Elasticsearch |
| -- | -- |
| SQL | DSL |
| Rows | Documents |
| Table | Index |
| Column | Field |


## Document

Documents are JSON objects that are stored within an Elasticsearch index.

Are considered the base unit of storage.

Data in documents is defined with fields comprised of keys and values. A key is the name of the field, and a value can be an item of many different types such as a string, a number, a boolean expression, another object, or an array of values.


## Index

A collection of similar documents.

User defined grouping semantics.

Is uniquely identified within a cluster by its name. 


## Node

A single server running an instance of Elasticsearch.

Perform data indexing and also participate in search and analysis operations.

Any search query will be run on multiple nodes in parallel.

Every node within a cluster is assigned a unique ID

Nodes within a cluster will automatically find each other within Elasticsearch by sending each other messages


## Cluster

A cluster is a collection of nodes that work together, have the same `cluster.name` attribute. A cluster can have one or more nodes.

Holds the entire indexed data.

Has a unique name.

The machines on a cluster have to be on the same network.

![https://www.dbi-services.com/blog/wp-content/uploads/sites/2/2022/01/Elasticsearch-index-shards.png](https://www.dbi-services.com/blog/wp-content/uploads/sites/2/2022/01/Elasticsearch-index-shards.png)


## Shard

Tập con các documents của 1 Index. Mỗi node bao gồm nhiều Shard. Shard hoạt động ở mức thấp nhất, đóng vai trò lưu trữ dữ liệu.

Có 2 loại Shard là : primary shard và replica shard.


## Cơ chế làm việc với Elasticsearch

![Workflow](https://stackjava.com/wp-content/uploads/2018/07/elasticsearch-1-768x393.png)

Các dữ liệu tổng hợp, dữ liệu được người dùng tải lên sẽ lưu vào database sau đấy đồng bộ hóa sang Elasticsearch.

Khi người dùng tìm kiếm thì sẽ tìm kiếm trên Elasticsearch, tốc độ vừa nhanh, vừa giảm tải cho database.


## Advantages and disadvantage of Elasticsearch

### Advantages

- It is a real-time search engine (only just one second before added document is searchable)
- It is horizontally scalable
- It is very fast comparatively other search engines
- Schema less, document-oriented, the data is presented in the form of JSON format, which is a widely accepted web format.
- Có khả năng phân tích, thống kê dữ liệu (aggregation)

### Disadvantage

- It is a flexible and powerful data storage search engine, but it is a bit difficult to learn
- Does not support database transaction


## Document version

When we discussed index, get, and delete requests previously, we pointed out that every document has a `_version` number that is incremented whenever a document is changed. Elasticsearch uses this `_version` number to ensure that changes are applied in the correct order. If an older version of a document arrives after a new version, it can simply be ignored.

We can take advantage of the `_version` number to ensure that conflicting changes made by our application do not result in data loss. We do this by specifying the version number of the document that we wish to change. If that version is no longer current, our request fails.

Now imagine that we want to edit the document: we load its data into a web form, make our changes, and then save the new version.

First we retrieve the document, The response body includes the same _version number of 1:

```json
{
  "_id": 1,
  "_version": 1,
  "_source": {...}
}
```

Now, when we try to save our changes by reindexing the document, we specify the version to which our changes should be applied

```
PUT /website/blog/1?version=1
```

This request succeeds, and the response body tells us that the `_version` has been incremented to 2

However, if we were to rerun the same index request, still specifying version=1, Elasticsearch would respond with a 409 Conflict HTTP response code.

All APIs that update or delete a document accept a version parameter, which allows you to apply optimistic concurrency control to just the parts of your code where it makes sense.
