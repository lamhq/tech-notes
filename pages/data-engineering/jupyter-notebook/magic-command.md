# Magic commands

## Cell magics

### `%%bash`

Allows you to run Bash shell commands directly within a cell.

The entire cell content is treated as a Bash script.

The output is displayed in the notebook.

```sh
%%bash
psql -d postgres << EOF
DROP DATABASE test_db;
CREATE DATABASE test_db;
GRANT ALL PRIVILEGES ON DATABASE test_db TO albert;
EOF
```


## References

- [Built-in magic commands](https://ipython.readthedocs.io/en/stable/interactive/magics.html)