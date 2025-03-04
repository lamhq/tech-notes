# Files and Directories

Filenames that begin with a period character are hidden.

## Snippets

**View content of a file in paginated mode**:
```sh
less ls-output.txt
```

**Display first 5 lines of a file**:
```sh
head -n 5 ls-output.txt
```

**Display last 5 lines of a file**:
```sh
tail -n 5 -f /var/log/system.log
```

**Other commands**:
- `pwd`: Print name of current working directory
- `cd`: Change directory
- `cp`: Copy files and directories
- `mv`: Move/rename files and directories
- `mkdir`: Create directories
- `rm`: Remove files and directories
- `ln`: Create hard and symbolic links
- `ls`: List directory contents
- `file`: Determine file type
- `less`: view text files (paginated)
- `head`: view first part of file
- `tail`: view last part of file
- `cat`: display content of files


## Viewing file shortcuts

When viewing file in termnial (using `less` or other commands), here're some keyboard shortcuts we can use:

- Exit: `q`.
- Display help screen: `h`

Navigation:
- Page up: `b`
- Page down: `space`
- Scroll up oneline: `Up arrow`
- Scroll down oneline: `Down arrow`
- Move to end of file: `G`
- Move to beginning of file: `g`

Searching:
- Search: `/characters`
- Find next: `n`


## `ls` options

- `-A`: does not list `.` (current directory) and `..` (parent directory).
- `-l`: List in long format.
- `-h`: display file sizes in human readable format rather than in bytes.
- `-S`: Sort results by file size.
- `-t`: Sort by modification time.
- `-r`: Display the results in reverse order.


## `cp` options

- `-a`: Copy the files and directories and all of their attributes, including ownerships and permissions
- `-i`: silently overwrite files.
- `-r`: Recursively copy directories and their contents.
- `-u`: only copy files that either don't exist, or are newer than the existing corresponding files
- `-v`: Display informative messages as the copy is performed.


## `rm` options

- `r`: Recursively delete directories.
- `f`: Ignore nonexistent files and do not prompt.


## Wildcards (globbing)

The shell provides special characters to help you rapidly specify groups of filenames. These special characters are called wildcards.

Using wildcards allows you to select filenames based on patterns of characters.

- `*`: Matches any characters
- `?`: Matches any single character
- `[characters]`: Matches any character that is a member of the set characters
- `[!characters]`: Matches any character that is not a member of the set character
- `[[:class:]]`: Matches any character that is a member of the specified class


**Character classes:**

- `[:alnum:]`: Matches any alphanumeric character
- `[:alpha:]`: Matches any alphabetic character
- `[:digit:]`: Matches any numeral
- `[:lower:]`: Matches any lowercase letter
- `[:upper:]`: Matches any uppercase letter


## Symbolic Links

A symbolic link is a special type of file that contains a text pointer to the referenced file or directory.

If you write something to the symbolic link, the referenced file is written to.

When you delete a symbolic link, only the link is deleted.

If the file is deleted, the link will continue to exist, but will point to nothing (broken).

To create a symbolic link:

```sh
ln -s item link
```


## File attributes

Look at the output of the ls command

```sh
[me@linuxbox ~]$ ls -l foo.txt
-rw-rw-r-- 1 me me 0 2018-03-06 14:52 foo.txt
```

The first 10 characters of the listing are the **file attributes**: `-rw-rw-r--`

The first character is **file type** `-`.

The remaining 9 characters of the file attributes are the **file mode**, represent the read, write, and execute permissions for the file’s owner, the file’s group owner, and everybody else:

| Owner | Group | World |
|---|---|---|
| rwx | rwx | rwx |


### File types

List of File types:

| Attribute | File type |
|---|---|
| - | A regular file. |
| d | A directory. |
| l | A symbolic link. Notice that with symbolic links, the remaining file attributes are always `rwxrwxrwx` and are dummy values. The real file attributes are those of the file the symbolic link points to. |
| c | A *character special* file. This file type refers to a device that handles data as a stream of bytes, such as a terminal or `/dev/null`. |
| b | A *block special* file. This file type refers to a device that handles data in blocks, such as a hard drive or DVD drive. |


## Important directories

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
