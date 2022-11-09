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

## Deserialize object from a text file

```py
x = json.load(f)
```
