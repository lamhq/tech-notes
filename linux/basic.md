## Check os version

```bash
cat /etc/os-release
```

## Execute linux command without sudo

```shell
sudo -i
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


## `cp` options

- `-a`: Copy the files and directories and all of their attributes, including ownerships and permissions
- `-i`: silently overwrite files.
- `-r`: Recursively copy directories and their contents.
- `-u`: only copy files that either don't exist, or are newer than the existing corresponding files
- `-v`: Display informative messages as the copy is performed.


## `rm` options

- `r`: Recursively delete directories.
- `f`: Ignore nonexistent files and do not prompt.


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


## Expansion

```bash
# Pathname Expansion
echo D*
echo *s

```