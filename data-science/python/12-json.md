# Saving structured data with json

## Serialize object to JSON string

```py
import json
json.dumps([1, 'simple', 'list'])
# '[1, "simple", "list"]'
```

## Serialize object to a text file

```py
json.dump(x, f)
```

## Load from string

```py
x = json.loads('[1, 2, 3]')
```

## Load from file

```py
x = json.load(f)
```
