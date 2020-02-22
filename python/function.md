## Basic

The first statement of the function body can optionally be a string literal; this string literal is the function's documentation string, or `docstring`.

```python
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

## Arguments

```python
# Arbitrary Arguments, *args
def my_function(*kids):
    print("The youngest child is " + kids[2])

my_function("Emil", "Tobias", "Linus")


# Keyword Arguments
def my_function(child3, child2, child1):
    print("The youngest child is " + child3)

my_function(child1 = "Emil", child2 = "Tobias", child3 = "Linus")


# Arbitrary Keyword Arguments
def my_function(**kid):
    print("His last name is " + kid["lname"])

my_function(fname = "Tobias", lname = "Refsnes")


# Default argument value
def my_function(country = "Norway"):
    print("I am from " + country)

my_function("Sweden")
my_function()
```


## Unpacking Argument Lists

The reverse situation occurs when the arguments are already in a list or tuple but need to be unpacked for a function call requiring separate positional arguments. Write the function call with the `*`-operator to unpack the arguments out of a list or tuple:

```python
# normal call with separate arguments
list(range(3, 6))   # [3, 4, 5]

# call with arguments unpacked from a list
args = [3, 6]
list(range(*args))    # [3, 4, 5]

# an example for unpacking dictionary
def parrot(voltage, state='a stiff', action='voom'):
    print("-- This parrot wouldn't", action, end=' ')
    print("if you put", voltage, "volts through it.", end=' ')
    print("E's", state, "!")

d = {"voltage": "four million", "state": "bleedin' demised", "action": "VOOM"}
parrot(**d)
```


## Lambda Expressions

Small anonymous functions can be created with the `lambda` keyword. Like nested function definitions, lambda functions can reference variables from the containing scope:

```python
def make_incrementor(n):
    return lambda x: x + n

f = make_incrementor(42)
f(0)    # 42
f(1)    # 43
```


## Function Annotations

```python
def f(ham: str, eggs: str = 'eggs') -> str:
    print("Annotations:", f.__annotations__)
    print("Arguments:", ham, eggs)
    return ham + ' and ' + eggs
```
