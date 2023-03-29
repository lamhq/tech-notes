# Classes and Objects

## Declaring a class

- The first letter of a class name should be capitalized, and
- The first (or only) word in a method name should be a verb.
- If your class has no explicit superclass, then it has an implicit superclass of `Object`

```java
public class Bicycle implements YourInterface {
    // fields
    public int cadence;
    public int gear;
    public int speed;

    // constructor
    public Bicycle(int startCadence, int startSpeed, int startGear) {
        gear = startGear;
        cadence = startCadence;
        speed = startSpeed;
    }

    // method
    public void setCadence(int newValue) {
        cadence = newValue;
    }
}

public class MountainBike extends Bicycle {
    public int seatHeight;

    public MountainBike(int startHeight, int startCadence,
                        int startSpeed, int startGear) {
        super(startCadence, startSpeed, startGear);
        seatHeight = startHeight;
    }

    public void setHeight(int newValue) {
        seatHeight = newValue;
    }
}
```

## Overloading Methods

Methods within a class can have the same name if they have different parameter lists

You cannot declare two methods with the same signature even if they have a different return type.

Overloaded methods should be used sparingly, as they can make code much less readable.

```java
public class DataArtist {
    ...
    public void draw(String s) {
        ...
    }
    public void draw(int i) {
        ...
    }
    public void draw(double f) {
        ...
    }
    public void draw(int i, double f) {
        ...
    }
}
```

## Arbitrary Number of Arguments in method

```java
public Polygon polygonFrom(Point... corners) {
    int numberOfSides = corners.length;
    double squareOfSide1, lengthOfSide1;
    squareOfSide1 = (corners[1].x - corners[0].x)
                     * (corners[1].x - corners[0].x)
                     + (corners[1].y - corners[0].y)
                     * (corners[1].y - corners[0].y);
    lengthOfSide1 = Math.sqrt(squareOfSide1);
}

public PrintStream printf(String format, Object... args)
System.out.printf("%s: %d, %s%n", name, idnum, address);
```


## Using `this` keyword

```java
public class Rectangle {
    private int x, y;
    private int width, height;

    public Rectangle() {
        this(0, 0, 1, 1);
    }

    public Rectangle(int width, int height) {
        this(0, 0, width, height);
    }

    public Rectangle(int x, int y, int width, int height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}
```

## Class Variables & Class Methods

The `final` modifier indicates that the value of this field cannot change.

```java
public class Bicycle {

    private int cadence;
    private int gear;
    private int speed;
    private int id;

    // class variables
    private static int numberOfBicycles = 0;

    // class constants
    static final double PI = 3.141592653589793;

    public Bicycle(int startCadence, int startSpeed, int startGear) {
        gear = startGear;
        cadence = startCadence;
        speed = startSpeed;

        // increment number of Bicycles
        // and assign ID number
        id = ++numberOfBicycles;
    }

    public static int getNumberOfBicycles() {
        return numberOfBicycles;
    }
}
```
