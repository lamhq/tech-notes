# Variables and Types

## Variable naming convention

Always begin your variable names with a letter, not `$` or `_`.

When choosing a name for your variables, use full words instead of cryptic abbreviations.

If the name you choose consists of more than one word, capitalize the first letter of each subsequent word, ex: `gearRatio`, `currentGear`.

If your variable stores a constant value, capitalizing every letter and separating subsequent words with the underscore character, ex: `static final int NUM_GEARS = 6`.


## Primitive Data Types

The eight primitive data types supported by the Java programming language are:

- `byte`: 8-bit signed two's complement integer, -128 to 127
- `short`: 16-bit signed two's complement integer. -32,768 to 32,767. You can use a `short` (instead of `int` and `long`) to save memory in large arrays.
- `int`: 32-bit signed two's complement integer, -2<sup>31</sup> to 2<sup>31</sup>-1
- `long`: 64-bit two's complement integer, , -2<sup>63</sup> to 2<sup>63</sup>-1
- `float`: single-precision 32-bit IEEE 754 floating point.  You can use a `float` (instead of `double`) to save memory in large arrays. This data type should never be used for precise values, such as currency (use the `java.math.BigDecimal` class instead).
- `double`: double-precision 64-bit IEEE 754 floating point. For decimal values, this data type is generally the default choice. This data type should never be used for precise values, such as currency.
- `boolean`: has only two possible values: `true` and `false`. Use this data type for simple flags that track true/false conditions.
- `char`: single 16-bit Unicode character, `\u0000` (or 0) to `\uffff` (or 65,535 inclusive).


## Declaring variable

```java
int gear = 1;
boolean result = true;
char capitalC = 'C';
byte b = 100;
short s = 10000;
int i = 100000;
```


## Literal

A literal is the source code representation of a fixed value.

```java
// The number 26, in decimal
int decVal = 26;
//  The number 26, in hexadecimal (0x)
int hexVal = 0x1a;
// The number 26, in binary (0b)
int binVal = 0b11010;

double d1 = 123.4;
// 123.4, scientific notation
double d2 = 1.234e2;
float f1  = 123.4f;

// Unicode escape for capital C with circumflex
// use 'single quotes' for `char` literals
char unic = '\u0108';

// use "double quotes" for `String` literals.
String myStr = "S\u00ED Se\u00F1or";
```

Special escape sequences for char and String literals:

- `\b`: backspace
- `\t`: tab
- `\n`: line feed
- `\f`: form feed
- `\r`: carriage return
- `\"`: double quote
- `\'`: single quote
- `\\`: backslash.


### `null` literal

`null` literal can be used as a value for any reference type.

`null` may be assigned to any variable, except variables of primitive types.

`null` is often used in programs as a marker to indicate that some object is unavailable.


### Using Underscore Characters in Numeric Literals

if your code contains numbers with many digits, you can use an underscore character to separate digits in groups of three

```java
long creditCardNumber = 1234_5678_9012_3456L;
long socialSecurityNumber = 999_99_9999L;
float pi =  3.14_15F;
long hexBytes = 0xFF_EC_DE_5E;
long hexWords = 0xCAFE_BABE;
long maxLong = 0x7fff_ffff_ffff_ffffL;
byte nybbles = 0b0010_0101;
long bytes = 0b11010010_01101001_10010100_10010010;
```

## Enum Types

```java
public enum Day {
    SUNDAY, MONDAY, TUESDAY, WEDNESDAY,
    THURSDAY, FRIDAY, SATURDAY
}

Day theDay;
theDay = Day.MONDAY;
```
