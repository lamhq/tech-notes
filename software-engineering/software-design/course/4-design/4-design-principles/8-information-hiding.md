# Information Hiding

## Introduction

Information hiding allows models of the system to provide others with the minimum amount of information needed to use them correctly while hiding unnecessary details. 

Encapsulation is often associated with information hiding and is used to bundle attributes and behaviors into their appropriate classes, exposing only an **interface** to provide access.

This effectively hides the implementation of behaviors so that other classes rely only on the information in these method signatures, not the underlying implementations.

## Apply information hiding in code

You can apply information hiding to your own classes through the use of access modifiers. Access modifiers change which classes are able to access attributes and behaviors. They also determine which attribute and behaviors a superclass will share with its subclasses.

### Public Access Modifier

Attributes and methods with public access modifier can be accessed from any class within or outside of the package. 

However, the implementation of the method cannot be changed by other classes.

The public attribute can also be modified by other classes. 

```java
public class Person {
  public String name;

  public void sleep(int n) {
    wait(n);
  }
}

public static void main(String[] args) {
  Person johnDoe = new Person();
  johnDoe.name = "John Doe":
  johnDoe.sleep(6000);
}
```

### Protected Access Modifier

Protected attributes and methods can only be accessed by the same class, subclasses, and other classes present in the same package.

Packages are the means by which Java organizes related classes into a single namespace.

### Default Access Modifier

Methods and attributes without an explicit access modifier have default access modifier. 

It only allows access to attributes and methods to subclasses or classes that are part of the same package or encapsulation.


### Private Access Modifier

Attributes and methods that are private are not accessible by any other class other than by the encapsulating class itself. 