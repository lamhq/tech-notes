## Command line keyboard shortcuts

- `ctrl-a`: move cursor to the beginning of line
- `ctrl-e`: move cursor to the end of line
- `ctrl-l`: clear screen, same as `clear` command
- `ctrl-k`: clear text from cursor location to the end of line
- `ctrl-u`: clear text from cursor location to the beginning of line


## Most important directories

- `/bin`: Contains binaries (programs)
- `/etc`: contains all of the system-wide configuration files. Everything in this directory should be readable text.
- `/etc/crontab`: defines when automated jobs will run.
- `/etc/passwd`: a list of the user accounts.
- `/home`: each user is given a directory in `/home`. Ordinary users can only write files in their home
directories.
- `/lib`: Contains shared library files used by the core system programs
- `/root`: home directory for the root account.
- `/sbin`: This directory contains "system" binaries.
- `/tmp`: intended for storage of temporary, transient files created by various programs.
- `/usr/bin`: contains the executable programs installed by your Linux distribution.
- `/usr/lib`: shared libraries for the programs in `/usr/bin`.
- `/usr/local`: programs compiled from source code are normally installed in `/usr/local/bin`
- `/var`: where data that is likely to change is stored. Various databases, spool files, user mail, etc. are located here.
- `/var/log`: contains log files


## Wildcards

- `*`: Matches any characters
- `?`: Matches any single character
- `[characters]`: Matches any character that is a member of the set characters
- `[!characters]`: Matches any character that is not a member of the set character
- `[[:class:]]`: Matches any character that is a member of the specified class


**Character classes**

- `[:alnum:]`: Matches any alphanumeric character
- `[:alpha:]`: Matches any alphabetic character
- `[:digit:]`: Matches any numeral
- `[:lower:]`: Matches any lowercase letter
- `[:upper:]`: Matches any uppercase letter


## Symbolic Links

Symbolic links work by creating a special type of file that contains a text pointer to the referenced file or directory.

If you write something to the symbolic link, the ref- erenced file is written to. However when you delete a symbolic link, only the link is deleted, not the file itself. If the file is deleted before the symbolic link, the link will con- tinue to exist, but will point to nothing. In this case, the link is said to be **broken**

To create a symbolic link

```shell
ln -s item link
```

## Display Command's Usage Information

```shell
docker run --help
man tar
```


## Redirect

### Send standard output to file

```bash
ls -l /usr/bin > ls-output.txt
```


### Append redirected output to a file

```bash
ls -l /usr/bin >> ls-output.txt
```


### Redirect standard error

```bash
ls -l /bin/usr 2> ls-error.txt
```

### Redirecting Standard Output And Standard Error To One File

```bash
ls -l /bin/usr > ls-output.txt 2>&1
ls -l /bin/usr &> ls-output.txt
ls -l /bin/usr &>> ls-output.txt
ls -l /bin/usr >>ls-output.txt 2>&1
```

### Suppress error messages from a command

```bash
ls -l /bin/usr 2> /dev/null
```


### Debuging pipeline output with `tee`

The tee program reads standard input and copies it to both standard output and files

```bash
ls /usr/bin | tee ls.txt | grep zip
```


## Expansion

```bash
# Pathname Expansion
echo D*
echo *s
echo [[:upper:]]*
echo /usr/*/share

# Arithmetic Expansion
echo $((2 + 2))

# Brace Expansion
echo Front-{A,B,C}-Back    # Front-A-Back Front-B-Back Front-C-Back
echo Number_{1..5}         # Number_1 Number_2 Number_3 Number_4 Number_5
echo {01..5}               # 01 02 03 04 05
echo {Z..A}
echo a{A{1,2},B{3,4}}b     # aA1b aA2b aB3b aB4b

# Parameter Expansion
echo $USER

# Command Substitution
ls -l $(which cp)
file $(ls -d /usr/bin/* | grep zip)
```

## Quoting

If you place text inside *double quotes*, all the special characters used by the shell lose their special meaning and are treated as ordinary characters. The exceptions are `$`, `\` (backslash), and `` ` `` (backtick).

Parameter expansion, arithmetic expansion, and command substitution still take place within double quotes.

Word-splitting looks for the presence of spaces, tabs, and newlines (linefeed characters) and treats them as delimiters between words. This means that unquoted spaces, tabs, and newlines are not considered to be part of the text. They only serve as separators.

If we need to suppress all expansions, we use *single quotes*.

```bash
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

Sometimes we only want to quote a single character. To do this, we can precede a charac- ter with a backslash

```bash
echo "The balance for user $USER is: \$5.00"
# The balance for user me is: $5.00

mv bad\&filename good_filename
```

## Heredoc

https://linuxize.com/post/bash-heredoc/


## Using history

### View command history

```bash
history
```

### Search history

Press `ctrl-r`, followed by the text you are looking for.

To find the next occurrence of the text (moving "up" the history list), press `Ctrl-r` again.

To quit searching, press either `Ctrl-g` or `Ctrl-c`.


## Environment

There are two kinds of shell session: login shell session and non-login shell session. A login shell session is one in which we are prompted for our username and password (terminal, for example). A non-ogin shell session typically occurs when we launch a terminal session in the GUI.

### Starup files for login shell session

- `/etc/profile`: a global configuration script that applies to all users
- `~/.bash_profile`: A user's personal startup file
- `~/.bash_login`
- `~/.profile`

The `~/.bashrc` is the most important startup file, since it is almost always read (both login shell and non-login shell).


### Apply changes in `.bashrc` immediately

```shell
source .bashrc
```


## Check os version

```bash
cat /etc/os-release
```

## Set server timezone

```bash
cd /etc
sudo rm localtime
sudo ln -s /usr/share/zoneinfo/Asia/Bangkok localtime
```


## List directory's content with `ls`

- `-A`: does not list . (current directory) and .. (parent directory).
- `-l`: List in long format.
- `-h`: display file sizes in human readable format rather than in bytes.
- `-S`: Sort results by file size.
- `-t`: Sort by modification time.
- `-r`: Display the results in reverse order.


## Viewing file content with `less`

- Exit less: `q`.
- Page up: `b`
- Page down: `space`
- Scroll up oneline: `Up arrow`
- Scroll down oneline: `Down arrow`
- Move to end of file: `G`
- Move to beginning of file: `g`
- Search: `/characters`
- Find next: `n`
- Display help screen: `h`


## `cp` options

- `-a`: Copy the files and directories and all of their attributes, including ownerships and permissions
- `-i`: silently overwrite files.
- `-r`: Recursively copy directories and their contents.
- `-u`: only copy files that either don't exist, or are newer than the existing corresponding files
- `-v`: Display informative messages as the copy is performed.


## `rm` options

- `r`: Recursively delete directories.
- `f`: Ignore nonexistent files and do not prompt.


## Print number of lines, words, bytes in file with `wc`

```bash
wc -l ls-output.txt
ls /bin /usr/bin | sort | uniq | wc -l
```


## Print lines matching a pattern with `grep`

- `-i`: ignore case
- `-v`: print lines do not match

```bash
ls /bin /usr/bin | sort | uniq | grep zip
```


## Print first/last part of files

```bash
head -n 5 ls-output.txt
tail -n 5 -f /var/log/system.log
```

