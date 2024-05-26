# Dictionary

## Overview
A dictionary stores a collection of key-value pairs, where key and value are Python objects.

Each key is associated with a value so that a value can be conveniently retrieved, inserted, modified, or deleted given a particular key.

Keys must be hashable. To check whether an object is hashable, use the `hash` function.
```py
hash(1, 2, (2, 3))
```


## Create a dictionary

```py
thisdict = {
    "brand": "Ford",
    "model": "Mustang",
    "year": 1964
}
print(thisdict)
```

Create an empty dictionary:
```py
emp = {}
```


From lists/sequences of key-value pairs:
```py
mydict = dict([
    ('sape', 4139), 
    ('guido', 4127), 
    ('jack', 4098)
])
# -> {'sape': 4139, 'guido': 4127, 'jack': 4098}
```

From two lists of key and value:
```py
keys = ['name', 'quest', 'favorite color']
values = ['lancelot', 'the holy grail', 'blue']
dict1 = dict(zip(keys, values))
```


## Dict operations

### Merge dict
You can merge one dictionary into another (in place):
```py
d1.update({"b": "foo", "c": 12})
```

### Iterate

Iterate through all keys:
```py
for key in thisdict:
    print(key)
```

Iterate through keys and values:
```py
knights = {'gallahad': 'the pure', 'robin': 'the brave'}
for k, v in knights.items():
    print(k, v)
```


## Elements operations

Accessing elements:
```py
x = thisdict["model"]
x = thisdict.get("model")
thisdict["year"] = 2018
```

Get element by key, return default value if key is not present:
```py
value = some_dict.get(key, default_value)
```

Set value for element if key is not present:
```py
value = some_dict.setdefault(key, default_value)
```

Delete element by key:
```py
del thisdict["model"]
```

Delete element and return its value:
```py
thisdict.pop("model")
```


## Key operations

Check if a key exists:
```py
d = {"key1": 10, "key2": 23}

if "key1" in d:
    print("this will execute")
```

Get all keys and values:
```py
list(d.keys())

list(d.values())
```


## Dict comprehension

Create a dict from a collection:
```py
items = [
    ('sape', 4139), 
    ('guido', 4127), 
    ('jack', 4098)
]
dd = {key: value for (key, value) in items if key != 'sape'}
dd
# {'guido': 4127, 'jack': 4098}
```
