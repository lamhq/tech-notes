# Regular expression

## Regular Expression Syntax

Reference: [https://docs.python.org/3/library/re.html#regular-expression-syntax](https://docs.python.org/3/library/re.html#regular-expression-syntax)


## Notice

The `re.search()` method is similar to `re.match()` but it doesn’t limit us to find matches at the beginning of the string only.

The `re.findall()` helps to get a list of all matching patterns. It only returns all matched text, not match objects. To return match objects instead of strings, use `re.finditer()`

Raw string notation (`r"text"`) keeps regular expressions sane. Without it, every backslash (`'\'`) in a regular expression would have to be prefixed with another one to escape it.

```python
re.search(r"\W(.)\1\W", " ff ")
re.search("\\W(.)\\1\\W", " ff ")
```


## Check for a match

```python
import re

# check if match
string = "The rain in Spain"
pattern = "^The.*Spain$"
result = re.search(pattern, string)
print(result is None)

# compile regular expression pattern into
# a regular expression object for future use
prog = re.compile(pattern)
result = prog.search(string)
```


## Split string by pattern

```python
import re
text = """Ross McFluff: 834.345.1254 155 Elm Street

Ronald Heathmore: 892.345.3428 436 Finley Avenue
Frank Burger: 925.541.7625 662 South Dogwood Way


Heather Albrecht: 548.326.4584 919 Park Place"""

entries = re.split("\n+", text)
print(entries)
```


## Replace string by pattern

```python
import re
def repl(m):
    return m.group(1).lower() + m.group(2).upper() + m.group(3)
text = "Professor Abdolmalek, please report your absences promptly."
print(re.sub(r"(\w)(\w+)(\w)", repl, text))
```