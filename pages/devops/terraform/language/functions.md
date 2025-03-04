# Built-in Functions

Terraform does not support user-defined functions.

## Trying function calls

You can experiment with the behavior of Terraform's built-in functions from the Terraform expression console:

```sh
terraform console
```

```hcl
max(5, 12, 9)
```


## Frequently used functions

- `concat`: Concatenates two or more lists together.
- `element`: Selects a specific element from a list.
- `join`: Joins a list of strings into a single string.
- `map`: Creates a map from a list of keys and values.
- `slice`: Extracts a slice of a list.
- `format`: Formats a string with placeholders for variables.
- `file`: Reads the contents of a file.
- `toset`: Converts a value to a set, removing duplicate elements. Useful when looping through a list using `for_each`.
- `tomap`: Converts its argument to a map value.
- `tolist`: Converts its argument to a list value.
