# Functions

## Docstrings

The first statement of the function body can optionally be a string literal; this string literal is the function's documentation string, or *docstring*.

```py
# Creating a Function
def my_function():
    """Print a hello text."""
    print("Hello from a function")

# Calling a Function
my_function()

# Return Values
def my_function(x):
    return 5 * x
```

There are tools which use docstrings to automatically produce online or printed documentation, or to let the user interactively browse through code.


## Function Arguments

### Default value
```py
def my_function(country = "Norway"):
    print("I am from " + country)

my_function("Sweden")
my_function()
```

### Arbitrary postional arguments

```py
def my_function(*kids):
    print("The youngest child is " + kids[2])

my_function("Emil", "Tobias", "Linus")
```

### Keyword arguments

```py
def my_function(child3, child2, child1):
    print("The youngest child is " + child3)

my_function(child1 = "Emil", child2 = "Tobias", child3 = "Linus")
```

You can define function parameters as keyword arguments using `*` syntax. All the parameters after `*` should be called as keyword arguments (key-value pairs, aka. `kwargs`).

```py
def read_items(*, item_id: int, q: str):
    results = {"item_id": item_id}
    if q:
        results.update({"q": q})
    return results
```


Mixing positional arguments with keyword argument:
```py
def greet(name, age, *, city):
    print(f"Hi, I am {name}. My age is {age}. I live in {city}.")

greet('abc', 23, city='def')
```


### Arbitrary Keyword Arguments

```py
def my_function(**kid):
    print("His last name is " + kid["lname"])

my_function(fname = "Tobias", lname = "Refsnes")
```


### Passing Arguments

Passing a list to function as positional arguments (unpacking list):
```py
args = [3, 6]
list(range(*args))    # [3, 4, 5]
```

Passing a dict to function as key-value arguments (unpacking dictionary):
```py
def parrot(voltage, state='a stiff', action='voom'):
    pass

d = {"voltage": "four million", "state": "bleedin' demised", "action": "VOOM"}
parrot(**d)
```


## Returning values

To return multiple values from a function, return a tuple:
```py
def f(): 
    a=5; b=6; c=7
    return a, b, c 

a, b, c = f()
```


## Lambda Funtions

A way of writing functions consisting of a single statement.

Lambda functions can reference variables from the containing scope.

```py
strings = ["foo", "card", "bar", "aaaa", "abab"]
strings.sort(key=lambda x: len(set(x)))
strings
# ['aaaa', 'foo', 'abab', 'bar', 'card']
```


## Function Annotations

Function annotations are arbitrary Python expressions associated with various parts of a function. These expressions are evaluated at compile time and have no impact during runtime.

Python itself doesn't assign any specific meaning to annotations; their significance arises when interpreted by third-party libraries or tools.

Syntax:
- Parameters are annotated using the `:` symbol after the parameter name.
- Annotations can be any valid Python expression.

```py
def f(ham: str, eggs: str = 'eggs') -> str:
    print("Annotations:", f.__annotations__)
    print("Arguments:", ham, eggs)
    return ham + ' and ' + eggs
```


## `pass` Statements

The `pass` statement does nothing. It can be used when a statement is required syntactically but the program requires no action.

```py
while True:
    pass  # Busy-wait for keyboard interrupt (Ctrl+C)

def initlog(*args):
    pass

class MyEmptyClass:
    pass
```


## Namespaces, Scope, and Local Functions

Variable scope in Python is named *namespace*.

Functions can access variables created inside the function as well as those outside the function in higher scopes. 

Any variables that are assigned within a function by default are assigned to the *local namespace*. After the function is finished, the local namespace is destroyed.

To assign variables outside of the function's scope, use `global` or `nonlocal` keywords.
```py
a = None
def my_fn():
    global a
    a = []
```
