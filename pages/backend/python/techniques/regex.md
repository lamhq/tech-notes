# Regular expression

## Check for a match

```py
import re

# check if match
string = "The rain in Spain"
pattern = "^The.*Spain$"
result = re.search(pattern, string)
is_match = result is not None
```

Compile a regular expression pattern into a regex object for future use:
```py
import re

checker = re.compile(pattern)
result = checker.search(string)
```

## Split string

```py
import re
text = """Ross McFluff: 834.345.1254 155 Elm Street

Ronald Heathmore: 892.345.3428 436 Finley Avenue
Frank Burger: 925.541.7625 662 South Dogwood Way


Heather Albrecht: 548.326.4584 919 Park Place"""

entries = re.split("\n+", text)
print(entries)
```

## Extract matches
```py
import re
text = '123_456_789.csv'
matches = re.findall(r"(\d+)_(\d+)_(\d+)", text)
if matches:
    a, b, c = matches[0]
    print(a, b, c)
```

## Substitute string with callback function

```py
import re
def repl(m):
    return m.group(1).lower() + m.group(2).upper() + m.group(3)
text = "Professor Abdolmalek, please report your absences promptly."
print(re.sub(r"(\w)(\w+)(\w)", repl, text))
```

## Escape regex pattern

You can use raw string notation (`r"text"`) to avoid the need to escape backslashes in regular expressions:
```py
# without raw string
re.search("\\W(.)\\1\\W", " ff ")

# with raw string
re.search(r"\W(.)\1\W", " ff ")
```


## Notices

`re.search()` can find matches anywhere in the string.

`re.match()` find matches at the beginning of the string only.

`re.findall()` returns a list of all matching patterns. It only returns matched text, not match objects. 

`re.finditer()` return match objects instead of strings.


## References

- [Regular Expression Syntax](https://docs.python.org/3/library/re.html#regular-expression-syntax)
