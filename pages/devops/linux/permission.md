# Permissions

## Snippets

### Display user identity

View your `uid`, `gid`:

```sh
id
```

### Start a new shell as a superuser
```sh
su -
```
```sh
sudo -i
```

### Start a new shell as another user
```sh
su -l [username]
```

### Execute a single command as superuser
```sh
su -c 'command'
```

```sh
sudo command
```

### See what privileges are granted by `sudo`
```sh
sudo -l
```

### Add file permission

Add execute permission for the owner
```sh
chmod u+x foo.txt
```

Add execute permission for the owner, group, and world (equivalent to `a+x`):
```sh
chmod +x foo.txt
```

### Remove file permission

Remove the read and write permission from anyone besides the owner and group owner:
```sh
chmod o-rw foo.txt
```

Add execute permission for the owner and set the permissions for the group and others to read and execute. Multiple specifications may be separated by commas:
```sh
chmod u+x,go=rx foo.txt
```


## Changing file permission

To change the mode (permissions) of a file or directory, use the `chmod` command.

### `chmod` Symbolic Notation

- `u`: user, file/directory owner
- `g`: group owner
- `o`: other
- `a`: all above: user, group, owner
- `+`: added permission
- `-`: remove permission
- `=`: assign permissions


### Permission Attributes

```sh
[me@linuxbox ~]$ ls -l foo.txt
-rw-rw-r-- 1 me me 0 2018-03-06 14:52 foo.txt
```

| Attributes | Files | Directories |
|---|---|---|
| r | Allows a file to be opened and read. | Allows a directory's contents to be listed if the execute attribute is also set. |
| w | Allows a file to be written to or truncated; however, this attribute does not allow files to be renamed or deleted. The ability to delete or rename files is determined by directory attributes. | Allows files within a directory to be created, deleted, and renamed if the execute attribute is also set. |
| x | Allows a file to be treated as a program and executed. Program files written in scripting languages must also be set as readable to be executed. | Allows a directory to be entered, e.g., cd directory. |


## Changing Identities

It's necessary to take on the identity of another user (to carry out some administrative task or to test an account).

The `su` command allows you to:
- assume the identity of another user
- start a new shell session with that user’s ID. The user’s environment is loaded and the working directory is changed to the user’s home directory
- issue a single command as that user. 

The `sudo` command is like `su` in many ways but:
- a user may be restricted to one or more specific commands and no others
- does not require access to the **superuser's password** (we are prompted for our password)
- does not start a new shell, nor does it load another user’s environment.
- commands do not need to be quoted


### Updating sudoers file

The `sudo` command allows an administrator to set up a configuration file called `/etc/sudoers` and define specific commands that particular users are permitted to execute under an assumed identity. 

To allow a user to run the `sudo` without entering password, update the file `sudoers` by this command (superuser privileges are required):

```sh
visudo
```

Add this line to the bottom:
```
yourusername ALL=(ALL) NOPASSWD:ALL
```


## Change File Owner And Group

The `chown` command is used to change the owner and group owner of a file or directory.

Superuser privileges are required to use this command.

Changes the ownership of the file from its current owner to user *bob*:
```sh
chown bob myfile
```

Changes the file owner from the current owner to user *bob* and changes the group owner to the login group of user *bob*:
```sh
chown bob: myfile
```

Changes the group owner to the group *admins*. The file owner is unchanged:
```sh
chown :admins myfile
```

Changes the ownership of the file from its current owner to user *bob* and changes the file group owner to group *users*.
```sh
chown bob:users myfile
```

## Changing user's password

Change your own password:
```sh
passwd
```

Change user's password (superuser privileges are required):
```sh
passwd [user]
```


## Create a Sudo User on CentOS

- Log in to your server as the root user.
- Add a new user to your system
- update the new user's password.
- add the user to the wheel group
- Test sudo access on new user account

```sh
ssh root@server_ip_address
adduser username
passwd username
usermod -aG wheel username
su - username
```

## Users and Groups

A user may own files and directories. When a user owns a file or directory, the user has control over its access.

Users can belong to a group of users who are given access to files and directories by their owners.

An owner may also grant some set of access rights to everybody (`world`).

Users are assigned a number called a user ID (uid), mapped to a username, then a group ID (gid) and may belong to additional groups.


## Important files

- `/etc/passwd`: define user accounts: (login) name, uid, gid, account's real name, home directory, and login shell
- `/etc/group`: define groups
- `/etc/shadow`: holds information about the user’s password


## Other user commands

- adduser
- useradd
- groupadd
