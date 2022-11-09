## Numbers

Python supports integers, floats, and complex numbers. This tutorial discusses only integers and floats.

## Available operators

- `+`, `-`, `*`, `/`
- `//`, `%`, `**`

```py
# classic division returns a float
17 / 3  # 5.666666666666667

# floor division discards the fractional part
17 // 3 # 5

# the % operator returns the remainder of the division
17 % 3  # 2
2

# 5 squared
5 ** 2  # 25
```

## Underscores in numbers

When a number is large, it’ll become difficult to read. To make the long numbers more readable, you can group digits using underscores, like this:

```py
count = 10_000_000_000
```