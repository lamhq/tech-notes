# Dictionary

## Create a dictionary

```python
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

```python
x = thisdict["model"]
x = thisdict.get("model")
thisdict["year"] = 2018
```


## Loop Through a Dictionary

```python
# loop through all keys
for key in thisdict:
    print(key)

# loop through keys and values
knights = {'gallahad': 'the pure', 'robin': 'the brave'}
for k, v in knights.items():
    print(k, v)
```

questions = ['name', 'quest', 'favorite color']
answers = ['lancelot', 'the holy grail', 'blue']