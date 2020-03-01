# Strings

Python strings cannot be changed - they are immutable.

```python
a = 'a sample string'
b = "string with double quotes"
c = 'doesn\'t'
d = "doesn't"
```

If you don’t want characters prefaced by `\` to be interpreted as special characters, you can use raw strings by adding an `r` before the first quote:

```python
print(r'C:\some\name')
```


## Multiline string

End of lines are automatically included in multiline string, but it's possible to prevent this by adding a `\` at the end of the line.

```python
str1 = """\
Usage: thingy [OPTIONS]
     -h                        Display this usage message
     -H hostname               Hostname to connect to
""")

str2 = '''Lorem ipsum dolor sit amet,
consectetur adipiscing elit,
sed do eiusmod tempor incididunt
ut labore et dolore magna aliqua.'''

# string literals next to each other are automatically concatenated
str3 = ('Put several strings within parentheses '
    'to have them joined together.')
```


## Get string's length
```python
f = len('abc')
```


## Indexing

```python
word = 'Python'
f = word[0]  # character in position 0: 'P'
l = word[5]  # character in position 5: 'n'
w1 = word[-1]   # last character: 'n'
w2 = word[-2]   # second-last character: 'o'
w3 = word[-6]   # 'P'
```

## Slicing

```python
s1 = word[0:2]  # characters from position 0 (included) to 2 (excluded): 'Py'
s2 = word[:2]   # character from the beginning to position 2 (excluded): 'Py'
s3 = word[4:]   # characters from position 4 (included) to the end: 'on'
```

## String methods

```python
a = " Hello, World!"
b = a.lower()
c = a.upper()
d = a.strip()
e = a.replace("H", "J")
f = a.split(",") # returns ['Hello', ' World!']
x = "Hello" in a # returns True
```

- `endswith`: Returns true if the string ends with the specified value
- `find`: Searches the string for a specified value and returns the position of where it was found
- `isalnum`: Returns True if all characters in the string are alphanumeric
- `isdigit`: Returns True if all characters in the string are digits
- `join`: Joins the elements of an iterable to the end of the string
- `split`: Splits the string at the specified separator, and returns a list
- `splitlines`: Splits the string at line breaks and returns a list

## Format a string

### `printf`

```python
import math
print('The value of pi is approximately %5.3f.' % math.pi)
# The value of pi is approximately 3.142.
```

### `str.format`

```python
str1 = "My name is John, and I am {}".format(36)

str2 = "I want to pay {price} dollars for {quantity} pieces of item {item}.".format(price = 5, quantity = 2, itemno = 'abcd')

table = {'Sjoerd': 4127, 'Jack': 4098, 'Dcab': 8637678}
print('Jack: {0[Jack]:d}; Sjoerd: {0[Sjoerd]:d}; '
    'Dcab: {0[Dcab]:d}'.format(table))
# Jack: 4098; Sjoerd: 4127; Dcab: 8637678
```


### Formatted string literals

Begin a string with `f` or `F` before the opening quotation mark or triple quotation mark. Inside this string, you can write a Python expression between `{` and `}` characters that can refer to variables or literal values.

```python
year = 2016
event = 'Referendum'
#'Results of the 2016 Referendum'
str1 = f'Results of the {year} {event}'

import math
# rounds pi to three places after the decimal
print(f'The value of pi is approximately {math.pi:.3f}.')
# The value of pi is approximately 3.142.

# cause field to be a minimum number of characters wide, good for aligning
print(f'{2:10} ==> {4:10d}')
#         2 ==>          4
```


## Display values

The `str()` function is meant to return representations of values which are fairly human-readable, while `repr()` is meant to generate representations which can be read by the interpreter

```python
s = 'Hello, world.'

str(s)
# 'Hello, world.'

repr(s)
# "'Hello, world.'"

hello = 'hello, world\n'
hellos = repr(hello)
print(hellos)
# 'hello, world\n'
```
