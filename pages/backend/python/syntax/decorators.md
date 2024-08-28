# Decorator

## Overview

A decorator is a function that takes another function and extends the behavior of the latter function without explicitly modifying it.


## Defining decorators

Starter code for a custom decorator:

```py
import functools

def my_decorator(func):
    @functools.wraps(func)
    def wrapper_decorator(*args, **kwargs):
        # Do something before
        value = func(*args, **kwargs)
        # Do something after
        return value
    return wrapper_decorator
```

- `@functools.wraps(func)` decorator is applied to `wrapper_decorator` to preserve the metadata (such as the docstring, name, etc.) of `func`.
- `wrapper_decorator(*args, **kwargs)` make the wrapper function accepts an arbitrary number of positional and keyword arguments.
- The original function `func` is called with all arguments `(*args, **kwargs)`. The result is stored in `value`.

Using decorator:
```py
@my_decorator
def say_whee():
    print("Whee!")

# equivalent to: `say_whee = my_decorator(say_whee)`
```

## Decorators with arguments

Define a decorator `repeat` that executes the decorated function multiple times:
```py
import functools

def repeat(_func=None, *, num_times=2):
    def decorator_repeat(func):
        @functools.wraps(func)
        def wrapper_repeat(*args, **kwargs):
            for _ in range(num_times):
                value = func(*args, **kwargs)
            return value
        return wrapper_repeat

    if _func is None:
        return decorator_repeat
    else:
        return decorator_repeat(_func)
```

- The `repeat` function take one positional argument `_func` and one keyword argument `num_times`, both are optional.
- The asterisk `*` in the argument list means that you can't call the remaining arguments as positional arguments.
- If you call `@repeat` with arguments, then `_func` will be `None` and `repeat(_func)` return a decorator function that takes a function as an argument and returns a wrapper function.
- If you call `@repeat` without arguments, then the decorated function will be passed in as `_func`. `@repeat` apply the decorator to the function immediately.
- `wrapper_repeat` function takes arbitrary arguments and returns the value of the decorated function `func`.


```py
@repeat
def say_whee():
    print("Whee!")

@repeat(num_times=4)
def greet(name):
    print(f"Hello {name}")
```

```py
>>> say_whee()
Whee!
Whee!

>>> greet("Penny")
Hello Penny
Hello Penny
Hello Penny
```


## Nesting Decorators

```py
from decorators import debug, do_twice

@debug
@do_twice
def greet(name):
    print(f"Hello {name}")
```

Decorators will be executed in the order they're listed: `debug(do_twice(greet()))`.


## Tracking State

You might want to have a decorator that can keep track of state.

For example, a decorator that counts the number of times a function is called:

```py
import functools

def count_calls(func):
    @functools.wraps(func)
    def wrapper_count_calls(*args, **kwargs):
        wrapper_count_calls.num_calls += 1
        print(f"Call {wrapper_count_calls.num_calls} of {func.__name__}()")
        return func(*args, **kwargs)

    wrapper_count_calls.num_calls = 0
    return wrapper_count_calls
```

```py
@count_calls
def say_whee():
    print("Whee!")


say_whee()
# Call 1 of say_whee()
# Whee!

say_whee()
# Call 2 of say_whee()
# Whee!

say_whee.num_calls
# 2
```

You can also use classes as decorator to keep state.


## Using Classes as Decorators

The typical way to maintain state in Python is by using decorators that are defined by classes.

If decorator is a class:
- It needs to take function as an argument in its `.__init__()` initializer
- The class instance needs to be callable (by implementing the magic method `.__call__()`) so that it can use the decorator syntax `@`.

```py
import functools

class CountCalls:
    def __init__(self, func):
        functools.update_wrapper(self, func)
        self.func = func
        self.num_calls = 0

    def __call__(self, *args, **kwargs):
        self.num_calls += 1
        print(f"Call {self.num_calls} of {self.func.__name__}()")
        return self.func(*args, **kwargs)
```

```py
@CountCalls
def say_whee():
    print("Whee!")


say_whee()
# Call 1 of say_whee()
# Whee!

say_whee()
# Call 2 of say_whee()
# Whee!

say_whee.num_calls
# 2
```


## Examples

### Timming Functions

Create a `@timer` decorator that measures the time a function takes to execute and then print the duration to the console:

```py
import functools
import time

def timer(func):
    """Print the runtime of the decorated function"""
    @functools.wraps(func)
    def wrapper_timer(*args, **kwargs):
        start_time = time.perf_counter()
        value = func(*args, **kwargs)
        end_time = time.perf_counter()
        run_time = end_time - start_time
        print(f"Finished {func.__name__}() in {run_time:.4f} secs")
        return value
    return wrapper_timer
```

```py
from decorators import timer

@timer
def waste_some_time(num_times):
    for _ in range(num_times):
        sum([number**2 for number in range(10_000)])

waste_some_time(1)
```


### Debugging Code

The following `@debug` decorator will print a function's arguments and its return value every time you call the function:

```py
import functools

def debug(func):
    """Print the function signature and return value"""
    @functools.wraps(func)
    def wrapper_debug(*args, **kwargs):
        args_repr = [repr(a) for a in args]
        kwargs_repr = [f"{k}={repr(v)}" for k, v in kwargs.items()]
        signature = ", ".join(args_repr + kwargs_repr)
        print(f"Calling {func.__name__}({signature})")
        value = func(*args, **kwargs)
        print(f"{func.__name__}() returned {repr(value)}")
        return value
    return wrapper_debug
```


### Authenticating Users

Make a web page be visible to users that are logged in, otherwise redirect to login page:

```py
import functools
from flask import Flask, g, request, redirect, url_for

app = Flask(__name__)

def login_required(func):
    """Make sure user is logged in before proceeding"""
    @functools.wraps(func)
    def wrapper_login_required(*args, **kwargs):
        if g.user is None:
            return redirect(url_for("login", next=request.url))
        return func(*args, **kwargs)
    return wrapper_login_required

@app.route("/secret")
@login_required
def secret():
    # returning secret
```

You should usually not write these types of decorators yourself, but use framework's utilities instead, which adds more security and functionality.


### Creating Singletons

A singleton is a class with only one instance.

```py
import functools

def singleton(cls):
    """Make a class a Singleton class (only one instance)"""
    @functools.wraps(cls)
    def wrapper_singleton(*args, **kwargs):
        if wrapper_singleton.instance is None:
            wrapper_singleton.instance = cls(*args, **kwargs)
        return wrapper_singleton.instance
    wrapper_singleton.instance = None
    return wrapper_singleton
```

- The decorator uses `cls` instead of `func` as the parameter name to indicate that it's meant to be a class decorator.

```py
from decorators import singleton

@singleton
class TheOne:
    pass

first_one = TheOne()
another_one = TheOne()

id(first_one)
# 140094218762310

id(another_one)
# 140094218762310

first_one is another_one
# True
```


### Caching Return Values

```py
import functools

def cache(func):
    """Keep a cache of previous function calls"""
    @functools.wraps(func)
    def wrapper_cache(*args, **kwargs):
        cache_key = args + tuple(kwargs.items())
        if cache_key not in wrapper_cache.cache:
            wrapper_cache.cache[cache_key] = func(*args, **kwargs)
        return wrapper_cache.cache[cache_key]

    wrapper_cache.cache = {}
    return wrapper_cache
```

```py
@cache
@count_calls
def fibonacci(num):
    if num < 2:
        return num
    return fibonacci(num - 1) + fibonacci(num - 2)
```

```py
fibonacci(10)
# Call 1 of fibonacci()
# ...
# Call 11 of fibonacci()
# 55

fibonacci(8)
# 21
```

You should use `@functools.lru_cache` or `@functools.cache` instead of writing your own cache decorator.


## Built-in Decorators for Classes

Commonly built-ins decorators:
- `@classmethod`: used to define methods inside a class namespace that aren't connected to a particular instance of that class
- `@property`: used to customize getters and setters for class attributes.