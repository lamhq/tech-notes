# Learning

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
