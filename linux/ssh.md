### Use existing private key instead of generating

Replace the file ~/.ssh/id_rsa with your private key:

Add new private key to ssh agent by command:

```
eval `ssh-agent -s`
ssh-add ~/.ssh/id_rsa
```

### SSH to server without entering password

```
ssh-copy-id username@host
ssh username@host
```


### SSH Tunnel
```
ssh -N -L 3000:203.150.7.51:3000 kero@115.78.2.236
```


### Execute command without password from a ssh connection

Replace `Defaults requiretty` by `Defaults !requiretty` in your `/etc/sudoers`

Reference: [https://www.shell-tips.com/2014/09/08/sudo-sorry-you-must-have-a-tty-to-run-sudo/](https://www.shell-tips.com/2014/09/08/sudo-sorry-you-must-have-a-tty-to-run-sudo/)


### Download file from remote to local

```shell
scp <source> <destination>
scp mscadmin@192.168.21.10:~/csv.tar.gz /Users/lam/Desktop/source/msc/embulk/
```