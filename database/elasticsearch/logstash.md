# Logstash notes

## Test your Logstash installation

```bash
cd logstash-7.4.0
bin/logstash -e 'input { stdin { } } output { stdout {} }'
```

## Integrate with Filebeats

Configure your Logstash instance to use the Beats input plugin. `first-pipeline.conf`:

```
input {
    beats {
        port => "5044"
    }
}
output {
    elasticsearch {
        hosts => [ "localhost:9200" ]
    }
}
```

**Verify configuration**

```bash
bin/logstash -f first-pipeline.conf --config.test_and_exit
```

**Start logstash and auto reload when config change**

```bash
bin/logstash -f first-pipeline.conf --config.reload.automatic
```

## Accessing Event Data and Fields in the Configuration

For example, the following event has five top-level fields (agent, ip, request, response, ua) and three nested fields (status, bytes, os):

```
{
  "agent": "Mozilla/5.0 (compatible; MSIE 9.0)",
  "ip": "192.168.24.44",
  "request": "/index.html"
  "response": {
    "status": 200,
    "bytes": 52353
  },
  "ua": {
    "os": "Windows 7"
  }
}
```

To reference the `os` field, you specify `[ua][os]`. To reference a top-level field such as request, you can simply specify the field name. To refer to field values from within other strings:

```
output {
  statsd {
    increment => "apache.%{[response][status]}"
  }
}
```


## Conditionals

Sometimes you only want to filter or output an event under certain conditions. For that, you can use a conditional.

You can use the following comparison operators:

- equality: ==, !=, <, >, <=, >=
- regexp: =~, !~ (checks a pattern on the right against a string value on the left)
- inclusion: in, not in
- boolean operators: and, or, nand, xor, !

```
filter {
  if [foo] in [foobar] {
    mutate { add_tag => "field in field" }
  }
  if [foo] in "foo" {
    mutate { add_tag => "field in string" }
  }
  if "hello" in [greeting] {
    mutate { add_tag => "string in field" }
  }
  if [foo] in ["hello", "world", "foo"] {
    mutate { add_tag => "field in list" }
  }
  if [missing] in [alsomissing] {
    mutate { add_tag => "shouldnotexist" }
  }
  if !("foo" in ["hello", "world"]) {
    mutate { add_tag => "shouldexist" }
  }
}
```