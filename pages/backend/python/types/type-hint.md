# Type Hint

## Syntax

Type hints are specified using the `:` syntax, followed by the type of the variable. For example:

```py
def greet(name: str) -> str:
    return "Hello, " + name
```

Initialize the variable with a value:

```py
physics_magic_number: float = 1.0/137.03599913
```


## Primitive types

`int`, `float`, `bool`, `str`, `bytes`:

```py
def add(x: int, y: int) -> int:
    return x + y

def is_even(n: int) -> bool:
    return n % 2 == 0

def to_lower(s: str) -> str:
    return s.lower()
```


## Generic types

### List

```py
def process_items(items: list[str]):
    for item in items:
        print(item)
```

### Tuple and Set

```py
def process_items(items_t: tuple[int, int, str], items_s: set[bytes]):
    return items_t, items_s
```

### Dict

```py
def process_items(prices: dict[str, float]):
    for item_name, item_price in prices.items():
        print(item_name)
        print(item_price)
```

### Union

Python 3.10+:
```py
def process_item(item: int | str):
    print(item)
```

Python 3.8+:
```py
from typing import Union


def process_item(item: Union[int, str]):
    print(item)
```

### Possibly `None`

`Optional[Something]` is actually a shortcut for `Union[Something, None]`, they are equivalent.

Python 3.10+:
```py
def say_hi(name: str | None = None):
    if name is not None:
        print(f"Hey {name}!")
    else:
        print("Hello World")
```

Python 3.8+:
```py
from typing import Optional


def say_hi(name: Optional[str] = None):
    if name is not None:
        print(f"Hey {name}!")
    else:
        print("Hello World")
```

If you are using a Python version below 3.10:
- Avoid using `Optional[SomeType]`
- use `Union[SomeType, None]`


## Enum

```py
from enum import Enum

class ModelName(str, Enum):
    alexnet = "alexnet"
    resnet = "resnet"
    lenet = "lenet"


async def get_model(model_name: ModelName):
    if model_name is ModelName.alexnet:
        return {"model_name": model_name, "message": "Deep Learning FTW!"}

    if model_name.value == "lenet":
        return {"model_name": model_name, "message": "LeCNN all the images"}

    return {"model_name": model_name, "message": "Have some residuals"}
```


## Class

```py
class Person:
    def __init__(self, name: str):
        self.name = name


def get_person_name(one_person: Person):
    return one_person.name
```


## Duck typing

Define the type hint for shapes with duck typing using `Protocol` class:
```py
from typing import Protocol

class Shape(Protocol):
    def area(self) -> float: ...

    def perimeter(self) -> float: ...
```

The concrete classes that are compatible with the interface:
```py
from math import pi

class Circle:
    def __init__(self, radius: float) -> None:
        self.radius = radius

    def area(self) -> float:
        return pi * self.radius**2

    def perimeter(self) -> float:
        return 2 * pi * self.radius

class Square:
    def __init__(self, side: float) -> None:
        self.side = side

    def area(self) -> float:
        return self.side**2

    def perimeter(self) -> float:
        return 4 * self.side

class Rectangle:
    def __init__(self, length: float, width: float) -> None:
        self.length = length
        self.width = width

    def area(self) -> float:
        return self.length * self.width

    def perimeter(self) -> float:
        return 2 * (self.length + self.width)
```

Using the type hint:
```py
def describe_shape(shape: Shape):
    print(f"{type(shape).__name__}")
    print(f" Area: {shape.area():.2f}")
    print(f" Perimeter: {shape.perimeter():.2f}")

describe_shape(Circle(3))
describe_shape(Square(5))
describe_shape(Rectangle(4, 5))
```


## Any type

```py
from typing import Any

responses: dict[str, Any] = {"Marco": "Polo", "answer": 42}
```


## Type aliases

You can use type aliases to create a new name for an existing type

```py
NumberList = list[int]

def sum_numbers(numbers: NumberList) -> int:
    return sum(numbers)
```


## Metadata Annotations

Python also has a feature that allows putting additional metadata in these type hints using `Annotated`.

```py
from typing import Annotated


def say_hello(name: Annotated[str, "this is just metadata"]) -> str:
    return f"Hello {name}"
```

The first type parameter you pass to Annotated is the actual type. The rest, is just metadata for other tools.


## References

- [Python Types Intro](https://fastapi.tiangolo.com/python-types/)
- [Type hints cheat sheet](https://mypy.readthedocs.io/en/stable/cheat_sheet_py3.html)
- [Support for type hints](https://docs.python.org/3/library/typing.html)
