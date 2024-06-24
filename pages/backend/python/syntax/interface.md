# Interface

## Overview

Interfaces are a way to define a blueprint for classes. 

Python doesn't have a dedicated `interface` keyword, but you can achieve similar functionality using abstract base classes (ABCs).

## Defining Interfaces

Python's **Abstract Base Classes (ABCs)** provide a more structured way to define interfaces.

ABCs allow you to define abstract methods (methods without implementation) that must be overridden by concrete classes.

To create an interface using ABCs, follow these steps:
- Import the `abc` module: `import abc`
- Define an abstract base class by inheriting from `abc.ABC`.
- Use the `@abc.abstractmethod` decorator to mark methods as abstract.
- Concrete classes that implement the interface must provide implementations for all abstract methods.

Interface:
```py 
import abc

class Shape(abc.ABC):
    @abc.abstractmethod
    def area(self) -> float:
        """Calculate the area of the shape."""
        pass

    @abc.abstractmethod
    def perimeter(self) -> float:
        """Calculate the perimeter of the shape."""
        pass
```

Concrete class:
```py
class Rectangle(Shape):
    def __init__(self, length: float, width: float):
        self.length = length
        self.width = width

    def area(self) -> float:
        return self.length * self.width

    def perimeter(self) -> float:
        return 2 * (self.length + self.width)
```

Usage:
```py
rectangle = Rectangle(length=4, width=6)
print(f"Rectangle area: {rectangle.area()}")
print(f"Rectangle perimeter: {rectangle.perimeter()}")
```

Remember that Python's approach to interfaces is flexible and relies on the principle of duck typing. Use ABCs when you need more structure or enforce specific method signatures. 🐍🔍
