# Object-oriented Programming

## Defining a class

```py
class Employee:
    """Common base class for all employees"""
    empCount = 0    # class variable shared by all instances

    def __init__(self, name, salary):
        self.name = name    # instance variable unique to each instance
        self.salary = salary
        Employee.empCount += 1

    def displayCount(self):
        print("Total Employee %d", Employee.empCount)

    def displayEmployee(self):
        print("Name : ", self.name,  ", Salary: ", self.salary)
```


## Creating class instances

```py
x = Employee()
x.displayCount()
```

## Chaining methods

```py
# Create an instance of MyClass
my_instance = MyClass(10)

# Chain multiple method calls in multiline with \
result = my_instance \
    .add(5) \
    .multiply(2) \
    .add(3) \
    .multiply(4) \
    .value
```


## Accessing attributes

Attributes and methods can also be accessed by name via the `getattr` function:
```py
a = "foo"
getattr(a, "split")
```


## Getting class name
```py
class Account:
    def get_name(self):
        return self.__class__.__name__
```


## Inheritance

```py
class DerivedClassName(modname.BaseClassName):
    <statement-1>
    .
    .
    .
    <statement-N>
```

Python has two built-in functions that work with inheritance:

- `isinstance(object, classinfo)`: Return `True` if the `object` argument is an instance of the `classinfo` argument, or of a (direct, indirect or virtual) subclass thereof.
- `issubclass(class, classinfo)`: Return `True` if class is a subclass (direct, indirect or virtual) of `classinfo`.


## Multiple Inheritance

```py
class DerivedClassName(Base1, Base2, Base3):
    <statement-1>
    .
    .
    .
    <statement-N>
```

If an attribute is not found in `DerivedClassName`, it is searched for in `Base1`, then (recursively) in the base classes of `Base1`, and if it was not found there, it was searched for in `Base2`, and so on.


## Monkey patch instance's method at runtime

```py
import types

# Create an instance of a class
class MyClass:
    def method(self, n):
        return n

obj = MyClass()

# get the original method from the instance
org_mt = obj.method

# define the new method
my_method = lambda self, n: 0 if n < 5 else org_mt(n)

# Bind the function 'my_method' to the instance 'obj'
obj.method = types.MethodType(my_method, obj)

print(obj.method(6))  # Calls my_method(self=obj)
```

- `MethodType` is a class provided by the Python standard library. It allows you to bind a function to an instance of a user-defined class and call the function on that instance.
- `my_method` is the function that extends the original `obj.method` method
- `obj.method` is a new callable object that holds both the function and the instance
- Calling `obj.method()` is equivalent to calling `obj.my_method()`.

Make sure to restore the orginal method after finishing:
```py
obj.method = org_mt
```

### Using Context manager to restore patched object

```py
import types
from contextlib import contextmanager

class MyClass:
    def method(self, n):
        print("the old method")
        return n


@contextmanager
def monkey_patch(obj):
    # get the original method from the instance
    org_mt = obj.method

    # define the new method
    def my_method(self, n): 
        print("the new method")
        return 0 if n < 5 else org_mt(n)

    # Bind the function 'my_method' to the instance 'obj'
    obj.method = types.MethodType(my_method, obj)

    yield obj

    obj.method = org_mt

# the object need to be patched
obj = MyClass()

# patching the object
with monkey_patch(obj) as new_obj:
    print(new_obj.method(4))  # 0

# the object should be restored after exiting context manager block
print(new_obj.method(4)) # 4
```
