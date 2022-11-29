## Change file mode `chmod`

- `u`: user, file/directory owner
- `g`: group owner
- `o`: other
- `a`: all above: user, group, owner
- `+`: permission is to be added
- `-`: permission is to be taken away
- `=`: only the specified permissions are to be applied and that all others are to be removed

```shell
# Add execute permission for the owner.
u+x

# Add execute permission for the owner, group, and world. Equivalent to a+x.
+x

# Remove the read and write permission from anyone besides the owner and group owner.
o-rw

# Add execute permission for the owner and set the permissions for the group and others to read and execute. Multiple specifications may be separated by commas.
u+x,go=rx
```


## Run A Shell With Substitute User And Group IDs

```shell
# Start a shell for the superuser
su -

# Execute A Command As Another User
sudo backup_script
```


## Execute command without sudo

```shell
sudo -i
```


## Run sudo command without typing password

```shell
sudo -i
visudo
```

Add this line to the bottom:
```
yourusername ALL=(ALL) NOPASSWD:ALL
```


## Change File Owner And Group

```shell
# Changes the ownership of the file from its current owner to user bob.
chown bob myfile

# Changes the group owner to the group admins. The file owner is unchanged.
chown :admins myfile
```


## Change user's password

```shell
passwd userp
```


## Other user commands

- adduser
- useradd
- groupadd


## Create a Sudo User on CentOS

- Log in to your server as the root user.
- Add a new user to your system
- update the new user's password.
- add the user to the wheel group
- Test sudo access on new user account

```bash
ssh root@server_ip_address
adduser username
passwd username
usermod -aG wheel username
su - username
```