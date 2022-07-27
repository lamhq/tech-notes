# Installation

## Install Elasticsearch from archive on Linux or MacOS

### Download and install archive for MacOS (v7.17)

```sh
curl -O https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.17.5-darwin-x86_64.tar.gz
curl -O https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.17.5-darwin-x86_64.tar.gz.sha512
shasum -a 512 -c elasticsearch-7.17.5-darwin-x86_64.tar.gz.sha512 
tar -xzf elasticsearch-7.17.5-darwin-x86_64.tar.gz
cd elasticsearch-7.17.5/
```

### Run Elasticsearch from the command line

```sh
./bin/elasticsearch
```

To stop Elasticsearch, press `Ctrl-C`.


## Check that Elasticsearch is running

You can test that your Elasticsearch node is running by sending an HTTP request to port `9200` on `localhost`:

```sh
curl http://localhost:9200/
```

which should give you a response something like this:

```json
{
  "name" : "Cp8oag6",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "AT69_T_DTp-1qgIJlatQqA",
  "version" : {
    "number" : "7.17.5",
    "build_flavor" : "default",
    "build_type" : "tar",
    "build_hash" : "f27399d",
    "build_date" : "2016-03-30T09:51:41.449Z",
    "build_snapshot" : false,
    "lucene_version" : "8.11.1",
    "minimum_wire_compatibility_version" : "1.2.3",
    "minimum_index_compatibility_version" : "1.2.3"
  },
  "tagline" : "You Know, for Search"
}
```