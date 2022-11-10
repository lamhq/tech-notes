# Functions in Java

## Lambda Expression

```java
package mypack;

interface MathOperation {
    int operation(int a, int b);
}

public class Java8Tester {
    private int operate(int a, int b, MathOperation mathOperation) {
        return mathOperation.operation(a, b);
    }

    public static void main(String args[]) {
        Java8Tester tester = new Java8Tester();

        MathOperation subtraction = (a, b) -> a - b;
        System.out.println("10 - 5 = " + tester.operate(10, 5, subtraction));
    }
}
```


## Method References

```java
import java.util.List;
import java.util.ArrayList;

public class Java8Tester {

   public static void main(String args[]) {
      List names = new ArrayList();

      names.add("Mahesh");
      names.add("Suresh");
      names.add("Ramesh");
      names.add("Naresh");
      names.add("Kalpesh");

      names.forEach(System.out::println);
   }
}
```


## Functional Interfaces

A functional interface is an interface with ony one abstract method. Java 8 has defined a lot of functional interfaces to be used extensively in lambda expressions.

```java
public interface Runnable {
    run();
}
```

### Supplier

```java
@FunctionalInterface
public interface Supplier<T> {
    T get();
}
```


### Consumer

```java
@FunctionalInterface
public interface Consumer<T> {
    void accept(T t);
}

@FunctionalInterface
public interface BiConsumer<T, U> {
    void accept(T t, U u);
}
```

### Predicate

```java
@FunctionalInterface
public interface Predicate<T> {
    boolean test(T t);
}

@FunctionalInterface
public interface BiPredicate<T, U> {
    boolean test(T t, U u);
}
```

### Function

```java
@FunctionalInterface
public interface Function<T, R> {
    R apply(T t);
}

@FunctionalInterface
public interface BiFunction<T, U, R> {
    R apply(T t, U u);
}

@FunctionalInterface
public interface UnaryOperator<T> extends Function<T, T> {
}

@FunctionalInterface
public interface BinaryOperator<T> extends BiFunction<T, T, T> {
}
```


### Default Methods

Java 8 introduces default method so that List/Collection interface can have a default implementation of `forEach` method, and the class implementing these interfaces need not implement the same.

An interface can also have static helper methods from Java 8 onwards.

```java
interface Vehicle {

   default void print() {
      System.out.println("I am a vehicle!");
   }

   static void blowHorn() {
      System.out.println("Blowing horn!!!");
   }
}

interface FourWheeler {

   default void print() {
      System.out.println("I am a four wheeler!");
   }
}

class Car implements Vehicle, FourWheeler {

   public void print() {
      Vehicle.super.print();
      FourWheeler.super.print();
      Vehicle.blowHorn();
      System.out.println("I am a car!");
   }
}

public class Java8Tester {

   public static void main(String args[]) {
      Vehicle vehicle = new Car();
      vehicle.print();
   }
}
```