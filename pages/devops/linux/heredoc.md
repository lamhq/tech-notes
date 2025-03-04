# Heredoc

## Snippets

### Print text with variable interpolation
```sh
cat << EOF
The current working directory is: $PWD
You are logged in as: $(whoami)
EOF
```

Output:
```
The current working directory is: /home/linuxize
You are logged in as: linuxize
```

### Disable expansion (delimiter is quoted)

```sh
cat <<- "EOF"
The current working directory is: $PWD
You are logged in as: $(whoami)
EOF
```

### Using a heredoc inside a statement or loop

Use the `<<-` redirection operation that allows you to indent your code:
```sh
if true; then
    cat <<- EOF
    Line with a leading tab.
    EOF
fi
```

### Redirect output to a file using the `>`, `>>` operators

```sh
cat << EOF > file.txt
The current working directory is: $PWD
You are logged in as: $(whoami)
EOF
```

### Pipe heredoc input to a command

The `sed` command will replace all instances of the `l` character with `e`:

```sh
cat <<'EOF' |  sed 's/l/e/g'
Hello
World
EOF
```

Output:

```sh
Heeeo
Wored
```

### Using Heredoc with SSH

Using Heredoc is one of the most convenient and easiest ways to execute multiple commands on a remote system over SSH.

When using unquoted delimiter make sure you escape all variables, commands and special characters otherwise they will be interpolated locally:

```sh
ssh -T user@host.com << EOF
echo "The current local working directory is: $PWD"
echo "The current remote working directory is: \$PWD"
EOF
```

Output:
```sh
The current local working directory is: /home/linuxize
The current remote working directory is: /home/user
```


## Overview

When writing shell scripts you may be in a situation where you need to pass a multiline block of text or code to an interactive command.

In Bash and other shells like Zsh, a Here document (Heredoc) is a type of redirection that allows you to pass multiple lines of input to a command.

## Syntax

```sh
[COMMAND] <<[-] 'DELIMITER'
  HERE-DOCUMENT
DELIMITER
```

The first line starts with an optional command followed by the special redirection operator `<<` and the delimiting identifier.
- You can use any string as a delimiting identifier, the most commonly used are EOF or END.
- If the delimiting identifier is unquoted, the shell will substitute all variables, commands and special characters before passing the here-document lines to the command.
- Appending a minus sign to the redirection operator `<<-`, will cause all leading tab characters to be ignored. This allows you to use indentation when writing here-documents in shell scripts. Leading whitespace characters are not allowed, only tab.

The here-document block can contain strings, variables, commands and any other type of input.

The last line ends with the delimiting identifier. White space in front of the delimiter is not allowed.

## References

https://linuxize.com/post/bash-heredoc/
