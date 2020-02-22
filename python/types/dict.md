# Dictionary

## Create and a dictionary

```python
thisdict = {
    "brand": "Ford",
    "model": "Mustang",
    "year": 1964
}
print(thisdict)
```

## Accessing Items

```python
x = thisdict["model"]
x = thisdict.get("model")
thisdict["year"] = 2018
```

## Loop Through a Dictionary

```python
for key in thisdict:
    print(key)