### Use existing private key instead of generating

Replace the file ~/.ssh/id_rsa with your private key

Add new private key to ssh agent by command:

```
eval `ssh-agent -s`
ssh-add ~/.ssh/id_rsa
```