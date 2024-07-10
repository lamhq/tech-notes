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

## Split string by pattern

```py
import re
text = """Ross McFluff: 834.345.1254 155 Elm Street

Ronald Heathmore: 892.345.3428 436 Finley Avenue
Frank Burger: 925.541.7625 662 South Dogwood Way


Heather Albrecht: 548.326.4584 919 Park Place"""

entries = re.split("\n+", text)
print(entries)
```


## Replace strings by pattern

```py
import re
def repl(m):
    return m.group(1).lower() + m.group(2).upper() + m.group(3)
text = "Professor Abdolmalek, please report your absences promptly."
print(re.sub(r"(\w)(\w+)(\w)", repl, text))
```


## Notice

`re.search()` can find matches anywhere in the string.

`re.match()` find matches at the beginning of the string only.

`re.findall()` returns a list of all matching patterns. It only returns matched text, not match objects. 

`re.finditer()` return match objects instead of strings.

Raw string notation (`r"text"`) simplifies regular expressions by avoiding the need to escape backslashes:
```py
re.search(r"\W(.)\1\W", " ff ")
re.search("\\W(.)\\1\\W", " ff ")
```


## Regular Expression Syntax

Reference: [https://docs.python.org/3/library/re.html#regular-expression-syntax](https://docs.python.org/3/library/re.html#regular-expression-syntax)
