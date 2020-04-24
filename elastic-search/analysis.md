# Text Analysis

Text analysis is the process of converting unstructured text, like the body of an email or a product description, into a structured format that’s optimized for search.


## Analyzer

An analyzer is a package which contains three lower-level building blocks: **character filters**, **tokenizers**, and **token filters**.


### Character filters

A character filter receives the original text as a stream of characters and can transform the stream by adding, removing, or changing characters.

For instance, a character filter could be used to strip HTML elements like `<b>` from the stream.

### Tokenizer

A tokenizer receives a stream of characters, breaks it up into individual tokens

For instance, a `whitespace` tokenizer would convert the text `"Quick brown fox!"` into the terms `[Quick, brown, fox!]`.


### Token filters

A token filter receives the token stream and may add, remove, or change tokens.

For example:
- a `lowercase` token filter converts all tokens to lowercase,
- a `stop` token filter removes common words (stop words) like `the` from the token stream,
- a `synonym` token filter introduces synonyms into the token stream.


## Index and search analysis

Text analysis occurs at two times:

**Index time:**

When a document is indexed, any text field values are analyzed.

**Search time:**

When running a full-text search on a text field, the query string (the text the user is searching for) is analyzed.

Search time is also called query time.

The analyzer, or set of analysis rules, used at each time is called the *index analyzer* or *search analyzer* respectively.


## Test an analyzer

```shell
curl -X POST "localhost:9200/_analyze?pretty" -H 'Content-Type: application/json' -d'
{
  "analyzer": "whitespace",
  "text":     "The quick brown fox."
}
'
```

```shell
curl -X POST "localhost:9200/_analyze?pretty" -H 'Content-Type: application/json' -d'
{
  "tokenizer": "standard",
  "filter":    ["lowercase", "asciifolding"],
  "text":      "Is this déja vu?"
}
'
```

```shell
curl -X GET "localhost:9200/my_index/_analyze?pretty" -H 'Content-Type: application/json' -d'
{
  "field": "my_text",
  "text":  "Is this déjà vu?"
}
'
```


## Configuring built-in analyzer

In the example below, we define the `std_english` analyzer to be based on the `standard` analyzer, but configured to remove the pre-defined list of English stopwords.

The `my_text` field uses the std_english analyzer, so English stop words will be removed. The resulting terms are: `[ old, brown, cow ]`

```shell
curl -X PUT "localhost:9200/my_index?pretty" -H 'Content-Type: application/json' -d'
{
  "settings": {
    "analysis": {
      "analyzer": {
        "std_english": {
          "type":      "standard",
          "stopwords": "_english_"
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "my_text": {
        "type":     "text",
        "analyzer": "std_english",
      }
    }
  }
}
'
curl -X POST "localhost:9200/my_index/_analyze?pretty" -H 'Content-Type: application/json' -d'
{
  "field": "my_text",
  "text": "The old brown cow"
}
'
```


## Create a custom analyzer

A custom analyzer is a combination of:

- zero or more [character filters](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-charfilters.html)
- a [tokenizer](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-tokenizers.html)
- zero or more [token filters](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-tokenfilters.html).

```shell
curl -X PUT "localhost:9200/my_index?pretty" -H 'Content-Type: application/json' -d'
{
  "settings": {
    "analysis": {
      "analyzer": {
        "my_custom_analyzer": {
          "type": "custom",
          "tokenizer": "standard",
          "char_filter": [
            "html_strip"
          ],
          "filter": [
            "lowercase",
            "asciifolding"
          ]
        }
      }
    }
  }
}
'
curl -X POST "localhost:9200/my_index/_analyze?pretty" -H 'Content-Type: application/json' -d'
{
  "analyzer": "my_custom_analyzer",
  "text": "Is this <b>déjà vu</b>?"
}
'
```


## Index Analyzer

### How Elasticsearch determines the index analyzer

1. The `analyzer` mapping parameter for the field.
2. The `analysis.analyzer.default` index setting.

If none of these parameters are specified, the `standard analyzer` is used.

### Specify the analyzer for a field

```shell
curl -X PUT "localhost:9200/my_index?pretty" -H 'Content-Type: application/json' -d'
{
  "mappings": {
    "properties": {
      "title": {
        "type": "text",
        "analyzer": "whitespace"
      }
    }
  }
}
'
```

### Specify the default analyzer for an index

```shell
curl -X PUT "localhost:9200/my_index?pretty" -H 'Content-Type: application/json' -d'
{
  "settings": {
    "analysis": {
      "analyzer": {
        "default": {
          "type": "simple"
        }
      }
    }
  }
}
'
```


## Search Analyzer

### How Elasticsearch determines the search analyzer

At search time, Elasticsearch determines which analyzer to use by checking the following parameters in order:

1. The `analyzer` parameter in the search query.
2. The `search_analyzer` mapping parameter for the field.
3. The `analysis.analyzer.default_search` index setting.
4. The `analyzer` mapping parameter for the field.

If none of these parameters are specified, the standard analyzer is used.


### Specify the search analyzer for a query

```shell
curl -X GET "localhost:9200/my_index/_search?pretty" -H 'Content-Type: application/json' -d'
{
  "query": {
    "match": {
      "message": {
        "query": "Quick foxes",
        "analyzer": "stop"
      }
    }
  }
}
'
```


### Specify the search analyzer for a field

```shell
curl -X PUT "localhost:9200/my_index?pretty" -H 'Content-Type: application/json' -d'
{
  "mappings": {
    "properties": {
      "title": {
        "type": "text",
        "analyzer": "whitespace",
        "search_analyzer": "simple"
      }
    }
  }
}
'
```


### Specify the default search analyzer for an index

```shell
curl -X PUT "localhost:9200/my_index?pretty" -H 'Content-Type: application/json' -d'
{
  "settings": {
    "analysis": {
      "analyzer": {
        "default": {
          "type": "simple"
        },
        "default_search": {
          "type": "whitespace"
        }
      }
    }
  }
}
'
```
