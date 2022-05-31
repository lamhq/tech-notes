# Saving structured data with json

## Serialize object to JSON string

```python
import json
json.dumps([1, 'simple', 'list'])
# '[1, "simple", "list"]'
```

## Serialize object to a text file

```python
json.dump(x, f)
```

## Deserialize object from a text file

```python
x = json.load(f)
```

