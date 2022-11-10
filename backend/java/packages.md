# Java Packages

A package in Java is used to group related classes.


## Built-in Packages

[https://docs.oracle.com/javase/8/docs/api/](https://docs.oracle.com/javase/8/docs/api/)


## Import a Package

```java
import package.name.Class;   // Import a single class
import package.name.*;   // Import the whole package
```


## Create Package

Create class file `MyPackageClass.java` in `mypack` directory:

```shell
touch mypack/MyPackageClass.java
```

*MyPackageClass.java:*

```java
package mypack;

class MyPackageClass {
  public static void main(String[] args) {
    System.out.println("This is my package!");
  }
}
```

## Compile java package

This will create a file `MyPackageClass.class` in `mypack`

```shell
javac ./mypack/MyPackageClass.java
```


## Run java package program

```shell
java mypack.MyPackageClass
```