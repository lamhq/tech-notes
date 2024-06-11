# Strings

## Defining strings

You can use either single or double quotes.

```py
a = 'a sample string'
b = "string with double quotes"
c = 'doesn\'t'
d = "doesn't"
```

## Raw string

If you don't want characters prefaced by `\` to be interpreted as special characters, you can use raw strings by adding an `r` before the first quote:

```py
raw_s = r'Hi\nHello'
print(raw_s)
# Hi\nHello
```


## Multi-line string

String literals can span multiple lines. Use triple-quotes: `"""..."""` or `'''...'''`

**End of lines** are automatically included in multi-line string, but you can prevent this by adding a `\` at the end of the line:
```py
s = '''\
123\
456\
789\
'''
# '123456789'
```

String literals next to each other are automatically concatenated:
```py
s = '123' '456'
# '123456'
```

Put several strings within parentheses to have them joined together:
```py
s = ('Put several strings within parentheses '
    'to have them joined together.')
```

## Get string's length

```py
f = len('abc')
```


## Concat strings

Strings can be concatenated with the `+` operator, and repeated with `*`:

```py
>>> # 3 times 'un', followed by 'ium'
>>> 3 * 'un' + 'ium'
'unununium'
```

## Check string contains a sub string
```py
x = "Hello" in " Hello, World!"
```


## Indexing

Strings can be indexed (subscripted), with the first character having index `0`.

```py
word = 'Python'
f = word[0]  # character in position 0: 'P'
l = word[5]  # character in position 5: 'n'
w1 = word[-1]   # last character: 'n'
w2 = word[-2]   # second-last character: 'o'
w3 = word[-6]   # 'P'
```


## Slicing

Syntax:
```py
str_var[start_index:end_index]
```

Get first 2 characters:
```py
word = 'Python'
s1 = word[0:2]  # 'Py'
```

Get 2 characters from the second character:
```py
s2 = word[1:3]  # 'yt'
```

Get last 3 characters:
```py
s3 = word[-3:]  # 'hon'
```


## Joining list of string

```py
my_list = ['a', 'b', 'c', 'd']
my_string = ','.join(my_list)
# Result: 'a,b,c,d'
```


## Splitting string into list

```py
my_string = " apple , banana , cherry , date "
my_list = my_string.split(", ")
# Result: ['apple', 'banana', 'cherry', 'date']
```

Splits the string at line breaks and returns a list:
```py
my_string = "Thank you for the music\nWelcome to the jungle"
lines_list = my_string.splitlines()
# Result: ['Thank you for the music', 'Welcome to the jungle']
```


## Format a string

### `printf`

```py
import math
print('The value of pi is approximately %5.3f.' % math.pi)
# The value of pi is approximately 3.142.
```

### `str.format`

```py
str1 = "My name is John, and I am {}".format(36)

str2 = "I want to pay {price} dollars for {quantity} pieces of item {item}.".format(price = 5, quantity = 2, itemno = 'abcd')

table = {'Sjoerd': 4127, 'Jack': 4098, 'Dcab': 8637678}
print('Jack: {0[Jack]:d}; Sjoerd: {0[Sjoerd]:d}; '
    'Dcab: {0[Dcab]:d}'.format(table))
# Jack: 4098; Sjoerd: 4127; Dcab: 8637678
```


### Formatted string literals

Begin a string with `f` or `F` before the opening quotation mark or triple quotation mark. Inside this string, you can write a Python expression between `{` and `}` characters that can refer to variables or literal values.

```py
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


## Modify strings

Python strings cannot be changed - they are immutable, You cannot change the string. For example, you'll get an error if you update one or more characters in a string:

```py
str = "Python String"
str[0] = 'J'

Traceback (most recent call last):
  File "app.py", line 2, in <module>
    str[0] = 'J'
TypeError: 'str' object does not support item assignment</module>
```

When want to modify a string, you need to create a new one from the existing string. For example:

```py
str = "Python String"
new_str = 'J' + str[1:]
print(new_str)
```


## String methods

```py
a = " Hello, World!"
b = a.lower()
c = a.upper()
d = a.strip()

# replace
e = a.replace("H", "J")
```

- `endswith`: Returns true if the string ends with the specified value
- `find`: Searches the string for a specified value and returns the position of where it was found
- `isalnum`: Returns True if all characters in the string are alphanumeric
- `isdigit`: Returns True if all characters in the string are digits
