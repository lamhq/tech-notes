# Magic Methods

## Overview

Magic methods are a set of predefined methods you can use to enrich your classes.

They start and end with double underscores. E.g., `__init__`, `__str__`.

They're also called dunder methods (double under).

For example, to get the length of a string you can call `len('string')`. You can add a `__len__` dunder method to your class to support this behavior:
```py
class LenSupport:
    def __len__(self):
        return 42

obj = LenSupport()
len(obj)  # 42
```


## Object Initialization

`__init__(self, ...)`: The constructor of a class that sets up the initial state of an object.

```py
class Account:
    """A simple account class"""

    def __init__(self, owner, amount=0):
        """
        This is the constructor that lets us create
        objects from this class
        """
        self.owner = owner
        self.amount = amount
        self._transactions = []
```

```py
acc = Account('bob')  # default amount = 0
```


## Object Representation

1. `__repr__(self)`: Customizes an object's string representation. Useful for debugging and the Python REPL.
2. `__str__`: Get the string representation of an object. This is for the enduser.

```py
class Account:
    # ... (see above)

    def __repr__(self):
        return 'Account({!r}, {!r})'.format(self.owner, self.amount)

    def __str__(self):
        return 'Account of {} with starting amount: {}'.format(
            self.owner, self.amount)
```

```py
>>> str(acc)
'Account of bob with starting amount: 10'

>>> print(acc)
"Account of bob with starting amount: 10"

>>> repr(acc)
"Account('bob', 10)"
```


## Iteration

- `__len__`: customize how the built-in `len()` function behaves for instances of your custom classes
- `__getitem__`: define how your object retrieves elements based on their indices
- `__reversed__`: define the reverse iteration behavior for your custom sequence

```py
class Account:
    # ... (see above)

    def __len__(self):
        return len(self._transactions)

    def __getitem__(self, position):
        return self._transactions[position]

    def __reversed__(self):
        return self[::-1]
```

```py
>>> len(acc)
5

>>> for t in acc:
...    print(t)
20
-10
50
-20
30

>>> acc[1]
-10

>>> list(reversed(acc))
[30, -20, 50, -10, 20]
```


## Operator Overloading

- `__eq__`: defines behavior for the equality operator (`==`)
- `__lt__`: defines behavior for the less-than operator (`<`)
- `__add__`: defines behavior for the plus operator (`+`)

```py
from functools import total_ordering

@total_ordering
class Account:
    # ... (see above)

    def __eq__(self, other):
        return self.balance == other.balance

    def __lt__(self, other):
        return self.balance < other.balance

    def __add__(self, other):
        owner = self.owner + other.owner
        start_amount = self.balance + other.balance
        return Account(owner, start_amount)

acc = Account('bob', 10)
acc2 = Account('tim', 100)
```

`functools.total_ordering `decorator allows to take a shortcut, only implementing `__eq__` and `__lt__`.

```py
>>> acc2 > acc
True

>>> acc2 < acc
False

>>> acc == acc2
False

>>> acc3 = acc2 + acc
>>> acc3
Account('tim&bob', 110)
```


## Callable Python Objects

`__call__`: make instances of your custom classes callable, just like regular functions.

```py
class Person:
    def __call__(self, other):
        return f'Hi {other}'

alice = Person()
print(alice('Bob'))  # Output: Hi Bob
```


## Context Manager Support

See [Context Manager](./context-manager.md) section.