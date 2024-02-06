# Numbers

## Overview

The integer numbers (e.g. 2, 4, 20) have type `int`

The ones with a fractional part (e.g. 5.0, 1.6) have type `float`.

Python supports other types of numbers, such as [`Decimal`](https://docs.python.org/3/library/decimal.html#decimal.Decimal) and [`Fraction`](https://docs.python.org/3/library/fractions.html#fractions.Fraction), [complex numbers](https://docs.python.org/3/library/stdtypes.html#typesnumeric).


## Float

Division (`/`) always returns a float.

To do floor division and get an integer result, use `//` operator.

To calculate the remainder, use `%`.

```py
# classic division returns a float
17 / 3  # 5.666666666666667

# floor division discards the fractional part
17 // 3 # 5

# the % operator returns the remainder of the division
17 % 3  # 2
2
```

Calculate powers:

```py
5 ** 2  # 25
```

## Underscores in numbers

When a number is large, it’ll become difficult to read. To make the long numbers more readable, you can group digits using underscores, like this:

```py
count = 10_000_000_000
```