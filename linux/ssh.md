### Use existing private key instead of generating

Replace the file ~/.ssh/id_rsa with your private key:

Add new private key to ssh agent by command:

```
eval `ssh-agent -s`
ssh-add ~/.ssh/id_rsa
```

### SSH to server without entering password

1. Copy your local public key to remote server, enter your password:

```
ssh-copy-id username@host
```

2. Now try logging into the machine, with:

```
ssh username@host
```