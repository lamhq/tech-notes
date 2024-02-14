# Environment variables

## Environment

There are two kinds of shell session: login shell session and non-login shell session. A login shell session is one in which we are prompted for our username and password (terminal, for example). A non-login shell session typically occurs when we launch a terminal session in the GUI.

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


## Print available environment variables

```shell
printenv | less
```
