# Indexing data

## How to ingest data into Elasticsearch Service

Reference: [How to ingest data into Elasticsearch Service](https://www.elastic.co/blog/how-to-ingest-data-into-elasticsearch-service)

Elasticsearch provides a flexible RESTful API for communication with client applications. REST calls are therefore used to ingest data, perform search and data analytics, as well as to manage the cluster and its indices. Under the hood, all of the described methods rely on this API to ingest data into Elasticsearch.

Now, get ready to dive into data ingestion using the following methods:

- Elastic Beats
- Logstash
- Language clients
- Kibana Dev Tools

### Elastic Beats

Elastic Beats are a set of lightweight data shippers that allow to conveniently send data to Elasticsearch Service. 

Beats come in various flavors to collect different kinds of data:

- **Filebeat** allows you to read, preprocess and ship data from sources that come in the form of files.
- **Metricbeat** collects and preprocesses system and service metrics. System metrics include information about running processes, as well as CPU / memory / disk / network utilization numbers.
- **Winlogbeat** is all about capturing event logs from Windows operating systems, including application events, hardware events, and security and system events. 
- **Auditbeat** detects changes to critical files and collects events from the Linux Audit Framework.
- **Heartbeat** uses probing to monitor the availability of systems and services. Heartbeat is therefore useful in a number of scenarios such as infrastructure monitoring and security analytics. ICMP, TCP, and HTTP are supported protocols.
- **Functionbeat** collects logs and metrics from within a serverless environment such as AWS Lambda.

### Logstash

Logstash is a powerful and flexible tool to read, process, and ship data of any kind. 

Logstash provides a number of capabilities that are not currently available or too costly to perform with Beats, such as enriching documents by performing lookups against external data sources.

Hardware requirements for Logstash are significantly higher than for Beats. As such, Logstash should generally not be deployed on low-resource devices.

A common architectural pattern is to combine Beats and Logstash: use Beats to collect data and use Logstash to perform any data processing that Beats are not capable of doing.

Logstash works by executing event processing pipelines, whereby each pipeline consists of at least one of each of the following:

- **Inputs** read from data sources.
- **Filters** process and enrich the data in various ways.
- **Outputs** write the parsed and enriched data to data sinks

### Language clients

In some situations, it is preferable to integrate data ingestion with your custom application code. For this, we recommend using one of the [officially supported Elasticsearch clients](https://www.elastic.co/guide/en/elasticsearch/client/index.html).


### Kibana Dev Tools

Our recommended tool of choice for developing and debugging Elasticsearch requests is the [Kibana Dev Tools Console](https://www.elastic.co/guide/en/kibana/current/console-kibana.html). You can use Dev Tools Console to PUT raw JSON documents into Elasticsearch.


## Index API

### Indexing a document

```json
PUT /<target>/_doc/<_id>
{
  "field": "value"
}
```

- Adds a JSON document to the specified data stream or index and makes it searchable.
- If the target is an index and the document already exists, the request updates the document and increments its version.

**Path parameters:**

- `<target>`(Required, string) : Name of the data stream or index to target.
- `<_id>`(Optional, string): Unique identifier for the document.


### Indexing documents in bulk



## Retrieving a document

```
GET /{index}/{type}/{id}?pretty
```

## Deleting a Document

```
DELETE /website/blog/123
```



## Retrieving Part of a Document

```
GET /{index}/{type}/{id}?_source=title,text
```


## Checking whether a Document exists

```
HEAD /{index}/{type}/{id}
```

## Partial Updates to Documents

```json
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

```json
POST /website/pageviews/1/_update
{
  "script" : "ctx._source.views+=1",
  "upsert": {
    "views": 1
  }
}
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

## Import sample data for testing

Download the sample data

```sh
curl -O https://download.elastic.co/demos/kibana/gettingstarted/accounts.zip
unzip accounts.zip
```

Index data from json file

```bash
curl  -XPOST "localhost:9200/accounts/_bulk" -H "Content-Type: application/json" --data-binary "@accounts.json"
```
