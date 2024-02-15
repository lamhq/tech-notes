# SSH

## Use multiple SSH keys

Edit file `~/.ssh/config` with the following content:

```
Host github.com
    IdentityFile /home/lam/Desktop/source/keys/id_rsa
```

Update permission for private key:

```sh
chmod 600 id_rsa
```

## Specify private key when connect

```sh
ssh -i /path/to/id_rsa ec2-user@54.151.198.132
```

## Generate SSH key pair silently

```sh
ssh-keygen -t rsa -b 4096 -q -N "" -f ~/Desktop/source/keys/id_rsa_hqlambt
```

See [reference](http://man.openbsd.org/cgi-bin/man.cgi/OpenBSD-current/man1/ssh-keygen.1?query=ssh-keygen&sec=1)


## Copy public key to server

```sh
ssh-copy-id username@host
```

Now you can connect to server with your system private key

```sh
ssh username@host
```

## Download file from server

```sh
scp <source> <destination>
scp mscadmin@192.168.21.10:~/csv.tar.gz /Users/lam/Desktop/source/msc/embulk/
```

## SSH Tunnel

```sh
ssh -N -L 3000:203.150.7.51:3000 kero@115.78.2.236
```


## Use existing private key instead of generating

Replace the file `~/.ssh/id_rsa` with your private key:

Add new private key to ssh agent by command:

```sh
eval `ssh-agent -s`
ssh-add ~/.ssh/id_rsa
```


## Execute command without password from a ssh connection

Replace `Defaults requiretty` by `Defaults !requiretty` in your `/etc/sudoers`

Reference: [https://www.shell-tips.com/2014/09/08/sudo-sorry-you-must-have-a-tty-to-run-sudo/](https://www.shell-tips.com/2014/09/08/sudo-sorry-you-must-have-a-tty-to-run-sudo/)
