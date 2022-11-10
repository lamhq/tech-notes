# Optional

The purpose of the class is to provide a type-level solution for representing optional values instead of null references. This class has various utility methods to facilitate code to handle values as `available` or `not available` instead of checking null values


## Creating Optional Objects

```java
// create an empty Optional object
Optional<String> empty = Optional.empty();

// ccreate an optional object with the static method of()
// Optional.of - throws NullPointerException if passed parameter is null
String name = "baeldung";
Optional<String> opt = Optional.of(name);

// Optional.ofNullable - allows passed parameter to be null.
String name = null;
Optional<String> opt = Optional.ofNullable(name);
```


## Checking Value Presence

```java
// isPresent
Optional<String> opt = Optional.of("Baeldung");
assertTrue(opt.isPresent());

// isEmpty
Optional<String> opt = Optional.ofNullable(null);
assertTrue(opt.isEmpty());
```


## Setting Default Value

```java
String text = "Text present";
String defaultText = Optional.ofNullable(text).orElseGet(this::getMyDefault);
defaultText = Optional.ofNullable(text).orElse(getMyDefault());
String name = Optional.ofNullable(nullName).orElseThrow(IllegalArgumentException::new);
```


## Getting Value
```java
Optional<String> opt = Optional.of("baeldung");
// Optional.get - throws exception if value is null
String name = opt.get();
```


## Reference

[https://www.baeldung.com/java-optional](https://www.baeldung.com/java-optional)