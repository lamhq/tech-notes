# Reading and Writting Files

## Load text from a file
```py
file = 'resume.md'

with open(file, 'r') as file:
    file_contents = file.read()
```

## Save text to file
```py
# Define the text you want to save
text_to_save = "Hello, World!"

# Open the file in write mode
with open('file_path.txt', 'w') as file:
    file.write(text_to_save)
```


## Pattern when working with files

Here's a general pattern that you should consider using when you're working with files:

```py
import logging

try:
    with open('workfile', 'w', encoding="utf-8") as file:
        file.write("Hello, World!")
except OSError as error:
    logging.error("Writing to file %s failed due to: %s", file_path, error)
```

- You wrap the `with` statement in a `try … except` statement.
- If an `OSError` occurs during the execution of with, then you use `logging` to log the error with a user-friendly and descriptive message.
- If you're not using the `with` keyword, then you should call `f.close()` to close the file.

`open(filename, mode)` returns a **file object**.

## File mode

The `mode` argument describes the way in which the file will be used:
- `r` when the file will only be read (default)
- `w` for only writing
- `a` opens the file for appending
- `r+` opens the file for both reading and writing


### Text mode

The default behavior for Python files (read or write) is text mode, for working python string.

Text mode, combined with the `encoding` option of `open`, can convert string from Unicode encoding to another:
```py
with open(path) as source:
    with open(sink_path, "x", encoding="iso-8859-1") as sink:
        sink.write(source.read())
```

### Binary mode

Binary mode is enabled by appending `b` to the file mode.

`read` method will get exact number of bytes:
```py
with open(path, mode="rb") as f:
    data = f.read(10)
```

`seek(offset, whence)` can be used to change the file object's position:
- The position is computed from adding offset to a reference point
- The reference point is selected by the `whence` argument (0 from the beginning of the file, 1 uses the current file position, 2 uses the end of the file).
- `whence` can be omitted and defaults to 0


## Methods of File Objects

- `read(size?)`: reads some quantity of data and returns it as a string (in text mode) or bytes object (in binary mode). If the end of the file has been reached, return an empty string `('')`
- `readline()` reads a single line from the file
- `write(string)` writes the contents of string to the file, returning the number of characters written
- `tell()` returns an integer giving the file object's current position


## Reading file by lines

For reading lines from a file, you can loop over the file object. This is memory efficient, fast, and leads to simple code:

```py
for line in f:
    print(line, end='')
```

If you want to read all the lines of a file in a list you can also use `list(f)` or `f.readlines()`.


## Write text to file

```py
with open('target.txt', 'w', encoding='utf-8') as f_out:
    f_out.write('data')
```


## Check if file exists

```py
from os.path import exists

file_exists = exists(path_to_file)
```