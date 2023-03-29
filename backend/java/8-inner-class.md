# Inner class in java

Inner class means one class which is a member of another class. There are basically four types of inner classes in java:

- Static nested class
- Nested class
- Local class
- Anonymous class


## Static nested class

Static nested classes are not technically an inner class. They are like a static member of outer class.

```java
// outer class
class OuterClass {
    // static member
    static int outer_x = 10;

    // instance(non-static) member
    int outer_y = 20;

    // private member
    private static int outer_private = 30;

    // static nested class
    static class StaticNestedClass {
        void display() {
            // can access static member of outer class
            System.out.println("outer_x = " + outer_x);

            // can access display private static member of outer class
            System.out.println("outer_private = " + outer_private);

            // The following statement will give compilation error
            // as static nested class cannot directly access non-static membera
            // System.out.println("outer_y = " + outer_y);

        }
    }
}

// Driver class
public class StaticNestedClassDemo {
    public static void main(String[] args) {
        // accessing a static nested class
        OuterClass.StaticNestedClass nestedObject = new OuterClass.StaticNestedClass();
        nestedObject.display();
    }
}
```


## Nested class

We can't have static method in a nested class because an inner class is implicitly associated with an object of its outer class so it cannot define any static method for itself.

To instantiate an inner class, you must first instantiate the outer class. Then, create the inner object within the outer object.

Non-static nested classes (inner classes) has access to all members(static and non-static variables and methods, including private) of its outer class and may refer to them directly in the same way that other non-static members of the outer class do.

```java
class Outer {
    // Simple nested inner class
    class Inner {
        public void show() {
            System.out.println("In a nested class method");
        }
    }
}

class Main {
    public static void main(String[] args) {
        Outer outerObject = new Outer();
        Outer.Inner in = outerObject.new Inner();
        in.show();
    }
}
```


## Local class

```java
class Outer {
    void outerMethod() {
        System.out.println("inside outerMethod");
        // Inner class is local to outerMethod()
        class Inner {
            void innerMethod() {
                System.out.println("inside innerMethod");
            }
        }
        Inner y = new Inner();
        y.innerMethod();
    }
}

class MethodDemo {
    public static void main(String[] args) {
        Outer x = new Outer();
        x.outerMethod();
    }
}
```

## Anonymous class

Types of anonymous inner class:

- Anonymous Inner class that extends a class
- Anonymous Inner class that implements a interface
- Anonymous Inner class that defines inside method/constructor argument

Difference between Normal/Regular class and Anonymous Inner class:

- A normal class can implement any number of interfaces but anonymous inner class can implement only one interface at a time.
- A regular class can extend a class and implement any number of interface simultaneously. But anonymous Inner class can extend a class or can implement an interface but not both at a time.
- For regular/normal class, we can write any number of constructors but we can't write any constructor for anonymous Inner class

Anonymous classes can capture variables; they have the same access to local variables of the enclosing scope:

- An anonymous class has access to the members of its enclosing class.
- An anonymous class cannot access local variables in its enclosing scope that are not declared as final or effectively final.
- Like a nested class, a declaration of a type (such as a variable) in an anonymous class shadows any other declarations in the enclosing scope that have the same name.

You can declare the following in anonymous classes:

- Fields
- Extra methods
- Instance initializers
- Local classes


```java
package mypack;

interface TestInt {
    public void print();
}

public class Main {
    public static void main(String[] var0) {
        // Anonymous Inner class that implements a interface
        TestInt testc = new TestInt() {
            @Override
            public void print() {
                System.out.println("printed text");
            }
        };
        testc.print();

        // Anonymous Inner class that defines inside method/constructor argument
        Thread t = new Thread(new Runnable()
        {
            public void run()
            {
                System.out.println("Child Thread");
            }
        });

        t.start();
    }
}
```

