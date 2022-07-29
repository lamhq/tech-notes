# Introduction

## Full-text search

### Definition

- An optimized mechanism for retrieving data based on keywords
- All the search results are ranked based on your query.

A full text search engine is a mechanism for retrieving data that is optimized to efficiently find the data when the user knows only some portion of the data they are looking for.

Full-text search refers to searching some text inside extensive text data stored electronically and returning results that contain some or all of the words from the query. In contrast, traditional search would return exact matches.

Full-Text Search là một phương pháp/ kỹ thuật giúp bạn có thể tìm kiếm thông tin một cách tự nhiên nhất. Ngôn ngữ tìm kiếm thường là ngôn ngữ tự nhiên (ngôn ngữ bình thường của con người).

### Example

Search with keyword `run` (exact match):

- I'm going for a **run**, want to come along?
- I am **run**ning out of battery power
- I'm too d**run**k to drive
- This text will be t**run**cated

```sql
SELECT text FROM phrases WHERE text LIKE '%run%';
```

Search with keyword `run` (full-text search):

- I'm going for a **run**, want to come along?
- I am **run**ning out of battery power

### Usecases

- Search engine will use a full-text search to look for keywords in all the web pages that it indexed
- Search items on a website (Amazon, shopee, ...)
- Matching job descriptions with stored resumes

### Comparison of `LIKE` to Full-Text Search

Full text is about word search, while `LIKE` is about character search.

I would personally use full text search on tables where I have big amounts of human text - usually big columns (descriptions, content).


## What is Elasticsearch?

Elasticsearch is the distributed search and analytics engine.

Elasticsearch provides near real-time search and analytics for all types of data: structured or unstructured text, numerical data, or geospatial data

Elasticsearch can efficiently store and index data in a way that supports fast searches.

Elasticsearch is open source (before 7.11), developed in Java, so inherently cross-platform. It's based on Apache Lucene library (free & open source search engine library)

Elasticsearch is deployable in various cloud environments as well as on-premises. You can self-host Elasticsearch or use a cloud service

## Why Elasticsearch?

### Easy to scale

Elasticsearch allows you to start small, but will grow with your business. It is built to scale horizontally out of the box.

As you need more capacity, just add more nodes, and
let the cluster reorganize itself to take advantage of
the extra hardware.

### RESTFUL API

Elasticsearch is API driven. Almost any action can be performed using a simple RESTful API using JSON over HTTP. An API already exists in the language of your choice.

Responses are always in JSON, which is both machine and human readable.

### Excellent Query DSL

The REST API exposes a very complex and capable query DSL, that is very easy to use. Every query is just a JSON object that can practically contain any type of query, or even several of them combined.

### Support for advanced search features (Full Text)

Elasticsearch uses Lucene under the covers to provide the most powerful full text search capabilities available in any open source product.

Search comes with multi-language support, a powerful query language, support for geolocation, context aware did-you-mean suggestions, autocomplete and search snippets.

### Document Oriented

Store complex real world entities in Elasticsearch as structured JSON documents.

All fields are indexed by default, and all the indices can be
used in a single query, to return results at breath taking speed.

### Schema free

Elasticsearch allows you to get started easily. Toss it a JSON document and it will try to detect the data structure, index the data and make it searchable.

Later, apply your domain specific knowledge of your data to customize how your data is indexed.

### Active community

The community, other than creating nice **tools** and **plugins**, is very helpful and supporting. The overall vibe is really great, and this is an important metric of any OSS project.

There are also some **books** currently being written by community members, and many **blog posts** around the net sharing experiences and knowledge


## Which companies use Elasticsearch

- Netflix
- Linkedin
- Stackoverflow
- Github
- Facebook


## How Does Elasticsearch Work?

Elasticsearch uses shipping agents, called beats, to transfer raw data from multiple sources into Elasticsearch. After data is shipped into Elasticsearch, the engine runs data ingestion processes, which parse, normalize, enrich, and prepare data for indexing.

After the data is indexed, users can run complex queries and use aggregations to retrieve complex data summaries.

For visualization and management, the Elastic Stack offers a tool called Kibana, which enables users to create real-time data visualizations, such as pie charts, maps, line graphs, and histograms.


## Why Elasticsearch should not be your Primary Data Store

### It is a search engine not a database

Most databases are ACID compliant. Elasticsearch is not which means it is inherently riskier to use it like a database. Elasticsearch offers atomicity only on a per-document basis, not on a transaction basis.

### Search engines and databases perform differently

Elasticsearch focuses on making data available in “near real-time.” In order to do that, it requires making engineering choices focused on speed rather than perfectly reliable results.

It’s better to use Elasticsearch to only host data you’ll need to search quickly, and let a database host anything that needs permanence, transactions, consistency, etc.

### Changing Data Structures is Complicated

Unlike a database that can validate a migration before committing any changes, Elasticsearch usually requires a full reindex from the data source to safely apply those changes.

The whole process becomes pretty involved if you have a large amount of data, especially if Elasticsearch is your only data store.

### Where Elasticsearch Shines

- Full Text Search
- Analytics
- Fuzzy Searching
- Logging and Log Analysis
- Autocompletion and Instant Search
