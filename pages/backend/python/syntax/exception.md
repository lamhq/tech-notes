# Error and Exception Handling

## `try ... except` Statement

A `try` statement may have more than one except clause, to specify handlers for different exceptions.

A class in an `except` clause is compatible with an exception if it is the same class or a base class thereof

The last except clause may omit the exception name(s), to serve as a wildcard. Use this with extreme caution, since it is easy to mask a real programming error in this way

```py
import sys

try:
    f = open('myfile.txt')
    s = f.readline()
    i = int(s.strip())
except OSError as err:
    print("OS error: {0}".format(err))
except ValueError:
    print("Could not convert data to an integer.")
except:
    print("Unexpected error:", sys.exc_info()[0])
    raise
```

The except clause may specify a variable after the exception name. The variable is bound to an exception instance with the arguments stored in `instance.args`.

```py
try:
    raise Exception('spam', 'eggs')
except Exception as inst:
    print(type(inst))    # the exception instance
    print(inst.args)     # arguments stored in .args
    print(inst)          # __str__ allows args to be printed directly,
                         # but may be overridden in exception subclasses
    x, y = inst.args     # unpack args
    print('x =', x)
    print('y =', y)
```

The `try` statement has another optional clause `finally` which is intended to define clean-up actions that must be executed under all circumstances.

```py
try:
    raise KeyboardInterrupt
finally:
    # perform cleanup tasks
    print('Goodbye, world!')
```


## Built-in Exceptions

Predefined exceptions are instances of classes derived from `BaseException`.

Some common built-in exceptions include:
- `TypeError`: Raised when an operation is performed on an inappropriate data type.
- `ValueError`: Raised when a function receives an argument of the correct type but an inappropriate value.
- `IndexError`: Raised when an index is out of range for a sequence (e.g., list, tuple).
- `KeyError`: Raised when a mapping (dictionary) key is not found in the set of existing keys.
- `ZeroDivisionError`: Raised when dividing by zero.
- `FileNotFoundError`: Raised when a file or directory is not found.

You can find a comprehensive list of built-in exceptions in the [Python documentation](https://docs.python.org/3/library/exceptions.html).


## User-defined Exceptions

```py
class Error(Exception):
    """Base class for exceptions in this module."""
    pass

class InputError(Error):
    """Exception raised for errors in the input.

    Attributes:
        expression -- input expression in which the error occurred
        message -- explanation of the error
    """

    def __init__(self, expression, message):
        self.expression = expression
        self.message = message

class TransitionError(Error):
    """Raised when an operation attempts a state transition that's not
    allowed.

    Attributes:
        previous -- state at beginning of transition
        next -- attempted new state
        message -- explanation of why the specific transition is not allowed
    """

    def __init__(self, previous, next, message):
        self.previous = previous
        self.next = next
        self.message = message
```