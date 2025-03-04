# Commands

## Snippets

**Set working directory for a command**:
```sh
(cd /desired/directory && your_command)
```

**Display help for Shell Builtins**:
```sh
help cd
```

**Display Command's usage**:
```sh
man tar
```

**Other commands**:
- `history`: Display or manipulate the history list
- `clear`: Clear the terminal screen
- `exit` or `CTRL-D`: end a terminal session
- `which`: display which executable program will be executed
- `whatis`: Display one-line manual page descriptions
- `apropos`: search command
- `info`: Display a command’s info entry
- `man`: Display a command's manual page
- `help`: Display help for Shell Builtins


## Keyboard shortcuts

- `CTRL-A`: move cursor to the beginning of line
- `CTRL-E`: move cursor to the end of line
- `CTRL-L`: clear screen, same as `clear` command
- `CTRL-D`: Delete the character at the cursor location.
- `CTRL-K`: cut text from cursor location to the end of line
- `CTRL-U`: cut text from cursor location to the beginning of line
- `CTRL-Y`: insert cut text at the cursor location
- `TAB`: trigger completion
- up arrow: move to the previous command
- down arrow: move to the next command


## Search history

Press `CTRL-R`, followed by the text you are looking for.

To find the next occurrence, press `CTRL-R` again.

To quit searching, press either `CTRL-G` or `CTRL-C`.


## What are Commands?

A command can be one of four different things:
- An executable program
- A command built into the shell itself (shell builtins). For example, the `cd` command
- A shell function. A way to group commands for later execution using a single name (like functions in programming).
- An alias. Commands that we can define ourselves, built from other commands.


## Expansion

Expansion is the process that performs substitutions upon the command before execution.

For example, with the command `echo *`, the shell expands the `*`  into  the names of the files in the current working directory before the `echo` command is executed.

### Pathname Expansion

The mechanism by which wildcards work is called **pathname expansion**.

```sh
echo D*
echo *s
echo [[:upper:]]*
echo /usr/*/share
```

### Tilde Expansion

The tilde character (`~`) has a special meaning. When used at the beginning of a word, it expands into the name of the home directory of the named user or, if no user is named, the home directory of the current user.

```sh
echo ~    # /home/me
```

### Arithmetic Expansion
```sh
echo $((2 + 2))   # 4
```

### Brace Expansion
```sh
echo Front-{A,B,C}-Back    # Front-A-Back Front-B-Back Front-C-Back
echo Number_{1..5}         # Number_1 Number_2 Number_3 Number_4 Number_5
echo {01..5}               # 01 02 03 04 05
echo {Z..A}
echo a{A{1,2},B{3,4}}b     # aA1b aA2b aB3b aB4b
```

### Parameter Expansion
```sh
echo $USER
```

### Command Substitution

Command substitution allows us to use the output of a command as an expansion.

Lists detailed information about the cp command:

```sh
ls -l $(which cp)
```
- The `ls -l` part displays files in a **long listing format**
- `$(which cp)` retrieves the path of the `cp` command

Alternate syntax for command substitution that uses backquotes `` ` `` instead of the dollar sign and parentheses:

```sh
ls -l `which cp`
```

## Quoting

**Double Quotes** treats special characters as ordinary, except for `$`, `\`, and `` ` ``.

Parameter expansion, arithmetic expansion, and command substitution still take place within double quotes.

Unquoted spaces, tabs, and newlines are not considered to be part of the text. They only serve as separators.

If we need to suppress all expansions, we use *single quotes*.

```sh
ls -l "two words.txt"
echo "$USER $((2+2)) $(cal)"
echo $(cal)    # result in a command contains 38 arguments
echo "$(cal)"  # result in a command with one arguments

echo text ~/*.txt {a,b} $(echo foo) $((2+2)) $USER
# text /home/me/ls-output.txt a b foo 4 me

echo "text ~/*.txt {a,b} $(echo foo) $((2+2)) $USER"
# text ~/*.txt {a,b} foo 4 me

echo 'text ~/*.txt {a,b} $(echo foo) $((2+2)) $USER'
# text ~/*.txt {a,b} $(echo foo) $((2+2)) $USER
```

Sometimes we only want to quote a single character. To do this, we can precede a character with a backslash `\`

```sh
echo "The balance for user $USER is: \$5.00"
# The balance for user me is: $5.00

mv bad\&filename good_filename
```
