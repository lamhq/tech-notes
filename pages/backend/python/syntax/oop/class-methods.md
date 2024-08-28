# Class Method and Static Methods

```py
class MyClass:
    def method(self):
        return 'instance method called', self

    @classmethod
    def classmethod(cls):
        return 'class method called', cls

    @staticmethod
    def staticmethod():
        return 'static method called'
```

## Instance Method

The most common type of methods.

Defined within a class and take the `self` parameter (which refers to the instance of the class).

Can freely access attributes and other methods on the same object.

Have the power to modify both object state and class state through `self` and `self.__class__`, respectively.


## Class Methods
Marked with the `@classmethod` decorator.

Accept the `cls` parameter (referring to the class itself, not an instance).

Cannot modify object instance state (since they lack access to `self`).

Use cases:
- modifying class-level state shared across all instances
- implementing factory methods to create instances
- creating alternative constructors


## Static Methods

Defined using the `@staticmethod` decorator.

Do not require an instance or class reference.

Similar to regular functions but are scoped within a class.

Use cases:
- utility functions that don't depend on instance or class state.
- functions that are logically related to the class but don't need access to instance-specific data.

Static and class methods help enforce restrictions about class design. This can have maintenance benefits.
