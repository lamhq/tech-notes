# Dictionary

## Create a dictionary

```py
thisdict = {
    "brand": "Ford",
    "model": "Mustang",
    "year": 1964
}
print(thisdict)

# create an empty dictionary
emp = {}

# from sequences of key-value pairs
mydict = dict([('sape', 4139), ('guido', 4127), ('jack', 4098)])
# -> {'sape': 4139, 'guido': 4127, 'jack': 4098}

# from two lists of key and value
keys = ['name', 'quest', 'favorite color']
values = ['lancelot', 'the holy grail', 'blue']
dict1 = dict(zip(keys, values))
```


## Accessing Items

```py
x = thisdict["model"]
x = thisdict.get("model")
thisdict["year"] = 2018
```


## Loop Through a Dictionary

Loop through all keys:
```py
for key in thisdict:
    print(key)
```

Loop through keys and values:
```py
knights = {'gallahad': 'the pure', 'robin': 'the brave'}
for k, v in knights.items():
    print(k, v)
```


## Get all keys
```py
d.keys()
```


## Check if a key exists

```py
d = {"key1": 10, "key2": 23}

if "key1" in d:
    print("this will execute")

if "nonexistent key" in d:
    print("this will not")
```