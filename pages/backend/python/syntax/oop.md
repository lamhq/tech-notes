# Object-Oriented Programming

## Define a class

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


## Using class

```py
x = Employee()
x.displayCount()
```


## Iterators

Declare an iterator class:

```py
class Reverse:
    """Iterator for looping over a sequence backwards."""
    def __init__(self, data):
        self.data = data
        self.index = len(data)

    def __iter__(self):
        return self

    def __next__(self):
        if self.index == 0:
            raise StopIteration
        self.index = self.index - 1
        return self.data[self.index]
```

Using iterator:

```py
rev = Reverse('spam')
for char in rev:
    print(char)
```


### Generators

```py
def reverse(data):
    for index in range(len(data)-1, -1, -1):
        yield data[index]

for char in reverse('golf'):
    print(char)
# f
# l
# o
# g
```

Anything that can be done with generators can also be done with class-based iterators as described in the previous section. What makes generators so compact is that the `__iter__()` and `__next__()` methods are created automatically.


### Generator Expressions

Some simple generators can be coded succinctly as expressions using a syntax similar to list comprehensions but with parentheses instead of square brackets.

```py
sum(i*i for i in range(10))                 # sum of squares
# 285

xvec = [10, 20, 30]
yvec = [7, 5, 3]
sum(x*y for x,y in zip(xvec, yvec))         # dot product
# 260

data = 'golf'
list(data[i] for i in range(len(data)-1, -1, -1))
# ['f', 'l', 'o', 'g']
```
