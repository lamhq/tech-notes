## Comment

```python
# this is a single line comment

"""
This is a comment
written in
more than just one line
"""
```


## Creating Variables

```python
x = 5
y = "John"
print(x)
print(y)
```

If a variable is not “defined” (assigned a value), trying to use it will give you an error:

```py
>>> n  # try to access an undefined variable
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: name 'n' is not defined
```

## Types

```python
# getting data type
x = 5
print(type(x))

# type conversion
x = float(1) # x will be 1.0
y = int(2.8) # y will be 2
z = int("3") # z will be 3
w = float("4.2") # w will be 4.2
i = str(3.0)  # z will be '3.0'
```

## Check if a value is None

```python
if foo is None:
    print('foo is None')
else:
    print('foo is not None')
```

## Check variable is type
```python
val = 1.0
isinstance(val, float)
```