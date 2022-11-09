## Comment

```py
# this is a single line comment

"""
This is a comment
written in
more than just one line
"""
```


## Variables

```py
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

## Constants

Python doesn’t support constants. To work around this, you use all capital letters to name a variable to indicate that the variable should be treated as a constant. For example:

```py
FILE_SIZE_LIMIT = 2000
```