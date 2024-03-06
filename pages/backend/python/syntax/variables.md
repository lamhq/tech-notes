# Variables

## Declare variables

```py
x = 5
y = "John"
print(x)
print(y)
```

You will get an error if trying to used a variable that is not "defined" (assigned a value).

```py
>>> n  # try to access an undefined variable
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: name 'n' is not defined
```


## Display variables

The `str()` function return representations of values which are fairly human-readable.

The `repr()` function generate representations which can be read by the interpreter.

```py
s = 'Hello, world.'

str(s)
# 'Hello, world.'

repr(s)
# "'Hello, world.'"

hello = 'hello, world\n'
hellos = repr(hello)
print(hellos)
# 'hello, world\n'
```
