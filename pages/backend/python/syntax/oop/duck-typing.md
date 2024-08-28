# Duck Typing in Python

## What is Duck Typing?

Duck typing is a programming style which does not check object's type to determine if it has the right interface; instead it focus on whether a given method or attribute exists.

In other words, treating objects based on their behavior (methods and attributes) rather than their explicit type.

The term **"duck typing"** originates from the saying, "*If it looks like a duck, swims like a duck, and quacks like a duck, then it probably is a duck*".

Duck-typing avoids tests using `type()` or `isinstance()`. Instead, it typically employs `hasattr()` tests or [EAFP](../../code-style/eafp.md) programming.


## Example

We have a list of objects of different types: `Duck`, `Swan`, `Albatross`. They all support the two methods: `swim` and `fly`:

```py
class Duck:
    def swim(self):
        print("The duck is swimming")

    def fly(self):
        print("The duck is flying")

class Swan:
    def swim(self):
        print("The swan is swimming")

    def fly(self):
        print("The swan is flying")

class Albatross:
    def swim(self):
        print("The albatross is swimming")

    def fly(self):
        print("The albatross is flying")

birds = [Duck(), Swan(), Albatross()]
```

The code below just calls the expected methods, it doesn't care about what object bird is holding at a given time. If the object provides the method, then the code works without breaking. That's the flexibility that duck typing offers:

```py
for bird in birds:
    bird.fly()
    bird.swim()
```

Because Python is a dynamically typed language, there are no type-checking restrictions.


## Pros

**Decoupling**: Objects don't have to inherit from a common superclass, which make them flexible and decoupled.

**Flexibility**: objects of different types can be used interchangeably based on their behavior. This promotes modularity and extensibility in your code.

**Simplicity**: focus on the required behavior rather than thinking of specific types, classes, and the relationships between them. This allows for more concise and expressive code.

**Code reuse**: You can reuse one or more of your classes in other apps without having to export a complex class hierarchy for the classes to work.

**Easier prototyping**: You can quickly create objects that exhibit the necessary behavior without complex type definitions. This is useful during the initial stages of development, where you may not have fully fleshed out class hierarchies or interfaces.


## Cons

**Potential runtime errors**: can lead to unexpected behavior or crashes if an object doesn't conform to the expected behavior.

**Lack of explicitness**: code might be less explicit and more challenging to understand. The lack of explicit interface definitions make it difficult to grasp what are required for a behavior (attributes or methods?).

**Potential maintenance issues**: hard to track which objects must exhibit certain behaviors. Need careful evaluation.

**No support from IDE for Refactoring**: when renaming/finding attributes/methods, you have no support from the IDE since there's no relationship between classes.

## Duck Typing in Python's Built-in Tools

Built-in types, such as Lists, Tuples, Strings, Ranges, Dictionaries, Sets support operations like iteration, indexing, slicing, concatenating, getting length, sorting, and reversing.

View the details [here](https://realpython.com/duck-typing-python/#exploring-duck-typing-in-pythons-built-in-tools).
