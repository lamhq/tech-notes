# Working with JSON

## Serialize object to JSON string

```py
import json
json.dumps([1, 'simple', 'list'])
# '[1, "simple", "list"]'
```

## Serialize object to a text file

```py
with open("data.json", "w") as outfile:
  json.dump(data, outfile)
```

## Load from string

```py
x = json.loads('[1, 2, 3]')
```

## Load from file

```py
with open('/path/to/file.json', 'r') as f:
  x = json.load(f)
```
