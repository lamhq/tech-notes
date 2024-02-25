# Pipelines

## Snippets

**Show the the number of items from the pipeline:**

```shell
ls /bin /usr/bin | sort | uniq | wc -l
```

**Find all files had the word `zip` embedded in the name:**

```shell
ls /bin /usr/bin | sort | uniq | grep zip
```

**Save pipeline output to file:**

```shell
ls /usr/bin | tee ls.txt | grep zip
```


## Operator `|`

Using the pipe operator `|`, the standard output of one command can be piped into the standard input of another command.

```shell
command1 | command2
```

For example, We use `less` to display, page by page, the output of `ls` command:

```shell
ls -l /usr/bin | less
```


## Pipeline commands

- `sort`: sorts the lines from files or standard input alphabetically
- `uniq`: removes any duplicates lines
- `wc`: display the number of lines, words, and bytes contained in files
- `grep`: Print Lines Matching a Pattern
- `tee`: reads standard input and sends it to both standard output and files


`wc` options:
- `-l` report only lines

`grep` options:
- `-i`: ignore case
- `-v`: print lines do not match
