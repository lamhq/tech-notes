# Functions

## Docstrings

The first statement of the function body can optionally be a string literal; this string literal is the function's documentation string, or *docstring*.

There are tools which use docstrings to automatically produce online or printed documentation, or to let the user interactively browse through code.

It’s good practice to include docstrings in code that you write.

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


## Function Arguments

Default value:
```py
def my_function(country = "Norway"):
    print("I am from " + country)

my_function("Sweden")
my_function()
```

Arbitrary Arguments `*args`:

```py
def my_function(*kids):
    print("The youngest child is " + kids[2])

my_function("Emil", "Tobias", "Linus")
```


## Keyword arguments

```py
def my_function(child3, child2, child1):
    print("The youngest child is " + child3)

my_function(child1 = "Emil", child2 = "Tobias", child3 = "Linus")
```

You can define function parameters as keyword arguments using `*` syntax:

```py
def read_items(*, item_id: int, q: str):
    results = {"item_id": item_id}
    if q:
        results.update({"q": q})
    return results
```

Python won't do anything with that `*`, but it will know that all the following parameters should be called as keyword arguments (key-value pairs), aka. `kwargs`.

Arbitrary Keyword Arguments:

```py
def my_function(**kid):
    print("His last name is " + kid["lname"])

my_function(fname = "Tobias", lname = "Refsnes")
```


## Unpacking Arguments

When calling function, if the parameters are already in a list or tuple but need to be unpacked for a function call requiring separate positional arguments, write the function call with the `*`-operator to unpack the arguments out of a list or tuple:

```py
# normal call with separate arguments
list(range(3, 6))   # [3, 4, 5]

# call with arguments unpacked from a list
args = [3, 6]
list(range(*args))    # [3, 4, 5]
```

Unpacking dictionary:

```py
def parrot(voltage, state='a stiff', action='voom'):
    print("-- This parrot wouldn't", action, end=' ')
    print("if you put", voltage, "volts through it.", end=' ')
    print("E's", state, "!")

d = {"voltage": "four million", "state": "bleedin' demised", "action": "VOOM"}
parrot(**d)
```


## Lambda Expressions

Small anonymous functions can be created with the `lambda` keyword. 

lambda functions can reference variables from the containing scope.

```py
def make_incrementor(n):
    return lambda x: x + n

f = make_incrementor(42)
f(0)    # 42
f(1)    # 43
```


## Function Annotations

Function annotations are arbitrary Python expressions associated with various parts of a function. These expressions are evaluated at compile time and have no impact during runtime.

Python itself doesn’t assign any specific meaning to annotations; their significance arises when interpreted by third-party libraries or tools.

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
