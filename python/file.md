# Reading and Writing Files

## Open a file

```python
with open('workfile') as f:
    read_data = f.read()
```

`open(filename, mode)` returns a file object. The second argument describes the way in which the file will be used:

- 'r' when the file will only be read (default)
- 'w' for only writing
- 'a' opens the file for appending
- 'r+' opens the file for both reading and writing

If you’re not using the `with` keyword, then you should call `f.close()` to close the file.


## Methods of File Objects

`read(size?)`: reads some quantity of data and returns it as a string (in text mode) or bytes object (in binary mode). If the end of the file has been reached, `f.read()` will return an empty string `('')`

`readline()` reads a single line from the file

`write(string)` writes the contents of string to the file, returning the number of characters written

`tell()` returns an integer giving the file object’s current position

`seek(offset, whence)` change the file object’s position. The position is computed from adding offset to a reference point; the reference point is selected by the `whence` argument.(0 from the beginning of the file, 1 uses the current file position, 2 uses the end of the file). `whence` can be omitted and defaults to 0.

For reading lines from a file, you can loop over the file object. This is memory efficient, fast, and leads to simple code:

```python
for line in f:
    print(line, end='')
```

If you want to read all the lines of a file in a list you can also use `list(f)` or `f.readlines()`.