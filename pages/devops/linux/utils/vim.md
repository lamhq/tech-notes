# vim operations

## Overview

Vi is a popular text editors used in Unix-like operating systems.

Vim is an enhanced version of Vi with additional features and functionalities.

```sh
vim text-fime.txt
```

## Cursor movement

- `w`: move to the right one word
- `b`: move to the left one word
- `^`: move to the start of current line
- `$`: move to the end of current line
- `w`: move to the right one word
- `g`: move to the beginning of file
- `G`: move to the end of file


## Clear file content

- Type gg to move the cursor to the first line of the file, if it is not already there.
- Type dG to delete all the lines


## Quit without saving

Press `escape` then enter `:q!`


## Find word

To find a word in Vi/Vim, simply type the / or ? key, followed by the word you're searching for.


## Go to line number

You could press `Esc`, then press `:`, follow with the number, (ie:`:14`)


## Delete a single line

1. Place the cursor to the beginning of the line, press the `ESC` key.
2. Press `dd`


## References

https://devhints.io/vim