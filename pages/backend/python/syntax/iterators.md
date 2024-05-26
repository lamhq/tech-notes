# Iterators and Generators

## Iterators

An iterator is an object that allows you to traverse through a sequence of values.

When used in a context like a for loop, the iterator will yield objects to the Python interpreter.

To declare an iterator class:
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

A generator is a function that construct an iterable object.

When you actually call the generator, no code is immediately executed.

Generators can return (yield) a sequence of multiple values by pausing and resuming execution each time the generator is used.

```py
def squares(n=10):
    print(f"Generating squares from 1 to {n ** 2}") 
    for i in range(1, n + 1):
        yield i**2

for item in squares(4):
    print(item)
"""
Generating squares from 1 to 16
1
4
9
16
"""
```

Anything that can be done with generators can also be done with class-based iterators as described in the previous section. What makes generators so compact is that the `__iter__()` and `__next__()` methods are created automatically.


### Generator Expressions

Another way to make a generator is by using a generator expression.

To create one, enclose what would otherwise be a list comprehension within **parentheses** instead of brackets:
```py
gen = (x ** 2 for x in range(100))
# <generator object <genexpr> at 0x7fefe437d000>
```

Generator expressions can be used instead of list comprehensions as function argu‐ ments in some cases:
```py
sum(x ** 2 for x in range(100))
# 328350

dict((i, i ** 2) for i in range(5))
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}
```


### `itertools` module

The standard library `itertools` module has a collection of generators for many common data algorithms.

For example, `groupby` is used to group elements in a list by a custom function:
```py
import itertools

def get_first_letter(x):
    return x[0]

names = ["Alan", "Adam", "Wes", "Will", "Albert", "Steven"]
for letter, names in itertools.groupby(names, get_first_letter):
    print(letter, list(names)) # names is a generator
```

Some useful `itertools` functions:
- `chain(*iterables)`: Generates a sequence by chaining iterators together. Once elements from the first iterator are exhausted, elements from the next iterator are returned, and so on.
- `combinations(iterable, k)`: Generates a sequence of all possible `k-tuples` of elements in the iterable, ignoring order and without replacement.
- `permutations(iterable, k)`: Generates a sequence of all possible `k-tuples` of elements in the iterable, respecting order.
- `groupby(iterable [, keyfunc])`: Generates `(key, sub-iterator)` for each unique key.
- `product(*iterables, repeat=1)`: Generates the Cartesian product of the input iterables as tuples, similar to a nested for loop.