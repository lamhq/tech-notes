# Modules and Packages

## Modules

A module is a file containing Python definitions and statements. The file name is the module name with the suffix `.py` appended.

Within a module, you can access the name of the current module using the global variable `__name__`.

A module can contain executable statements, they are intended to initialize the module. They are executed only the first time the module name is encountered in an import statement.

Each module has its own private symbol table, the author of a module can use global variables in the module without worrying about accidental clashes with a user's global variables.


## Packages

A Python package is a directory that contains one or more Python modules

Each package must have a special file named` __init__.py`. This file can be empty or contain initialization code.

A package can contain sub-packages, which are also directories containing modules.


## Modules & Packages Example

Let's say you have a file structure like this:
```
.
├── app
│   ├── __init__.py
│   ├── main.py
│   ├── dependencies.py
│   └── routers
│   │   ├── __init__.py
│   │   ├── items.py
│   │   └── users.py
│   └── internal
│       ├── __init__.py
│       └── admin.py
```

* The `app` directory contains everything. And it has an empty file `app/__init__.py`, it is a "Python package", named: `app`.
* The `app/main.py` file is a module of the `app` package: `app.main`.
* There's a subdirectory `app/routers/` with another file `__init__.py`, so it's a "Python subpackage": `app.routers`.
* The file `app/routers/items.py` is inside a package, `app/routers/`, so, it's a submodule: `app.routers.items`.
* The same with `app/routers/users.py`, it's another submodule: `app.routers.users`.
* There's also a subdirectory `app/internal/` with another file `__init__.py`, so it's another "Python subpackage": `app.internal`.
* And the file `app/internal/admin.py` is another submodule: `app.internal.admin`.


## Importing a module

When a module named `spam` is imported, the interpreter first searches for a built-in module with that name.

If not found, it then searches for a file named `spam.py` in a list of directories given by the variable [`sys.path`](#syspath).

```py
import math
import fibo as fib
from fibo import fib, fib2

print(math.pi)
fib(500)
```

## Relative import

**A single dot `.`, like in:**

```Python
from .dependencies import get_token_header
```

would mean:

* Starting in the same package that this module lives in ...
* find the module `dependencies` ...
* and from it, import the function `get_token_header`.


**The two dots `..`, like in:**

```Python
from ..dependencies import get_token_header
```

mean:

* Starting in the same package that this module lives in ...
* go to the parent package...
* and in there, find the module `dependencies` ...
* and from it, import the function `get_token_header`.


**if we had used three dots `...`, like in:**

```Python
from ...dependencies import get_token_header
```

that would mean:

* Starting in the same package that this module lives in...
* go to the parent package...
* then go to the parent of that package...
* and in there, find the module `dependencies`...
* and from it, import the function `get_token_header`.


## Modifying modules search path

The `sys.path` variable is a list of strings that determines the interpreter's search path for modules. It's an essential part of the `sys` module.

`sys.path` is initialized from these locations:
- The directory containing the input script (or the current directory when no file is specified).
- `PYTHONPATH` environment variable (a list of directory names, with the same syntax as the shell variable `PATH`).
- The installation-dependent default.

You can modify it using standard list operations:
```py
import sys
sys.path.append('/ufs/guido/lib/python')
```


## Creating a module

We create a module named `mymodule.py`:
```py
def greeting(name):
  print("Hello, " + name)
```

Then import the module, and call its function:

```py
import mymodule

mymodule.greeting("Jonathan")
```


## Running code from a module

Using `if __name__ == '__main__'` is a quick way to run some code from a file but not allow the code to be run if it is imported.

Explanation: When a module is imported, Python will fill in `__name__` with the name of the module, which is the name of the file without the `.py`. However, if you run the file with python file.py, `__name__` will be filled in by Python with the string `"__main__"`

```py
# module code

if __name__ == "__main__":
    # do something when running the module file
```
