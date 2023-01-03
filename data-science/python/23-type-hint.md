# Type Hinting

## Basic syntax

Type hints are specified using the `:` syntax, followed by the type of the variable. For example:

```py
def greet(name: str) -> str:
    return "Hello, " + name
```


## Primitive types

`int`, `float`, `bool`, and `str`:

```py
def add(x: int, y: int) -> int:
    return x + y

def is_even(n: int) -> bool:
    return n % 2 == 0

def to_lower(s: str) -> str:
    return s.lower()
```


## Collection types

`list`, `tuple`, and `dict`:

```py
def first_and_last(l: list[int]) -> tuple[int, int]:
    return (l[0], l[-1])

def word_count(s: str) -> dict[str, int]:
    words = s.split()
    counts = {}
    for word in words:
        if word in counts:
            counts[word] += 1
        else:
            counts[word] = 1
    return counts
```

## Custom types

```py
from enum import Enum

class Color(Enum):
    RED = 1
    GREEN = 2
    BLUE = 3

def get_color(name: str) -> Color:
    return Color[name]

def print_color(color: Color) -> None:
    print(color.name)
```


## Optional arguments

```py
from typing import Optional

def greet(name: str, greeting: Optional[str] = "Hello") -> str:
    return f"{greeting}, {name}"
```


## Variable-length arguments

you can use the `*` syntax:

```py
from typing import List

def sum_all(*numbers: int) -> int:
    return sum(numbers)
```


## Type aliases

You can use type aliases to create a new name for an existing type

```py
from typing import List

NumberList = List[int]

def sum_numbers(numbers: NumberList) -> int:
    return sum(numbers)
```

## Class

```py
class User:
    name: str
    age: int

    def __init__(self, name: str, age: int) -> None:
        self.name = name
        self.age = age
```

## Union types

```py
from typing_extensions import Union

def greet(name: Union[str, int, float]) -> str:
    if isinstance(name, str):
        return "Hello, " + name
    elif isinstance(name, (int, float)):
        return "Hello, user with ID: " + str(name)

print(greet("Alice"))  # Output: "Hello, Alice"
print(greet(123))      # Output: "Hello, user with ID: 123"
print(greet(123.4))    # Output: "Hello, user with ID: 123.4"
```
