# Git Remote

## Add Remote and Push

```bash
git remote add origin git@github.com:lamhq/aws-amplify-web.git
git push --set-upstream origin main
```


## Changing a remote's URL

```bash
git remote set-url origin git@bitbucket.org:theappteamdevs/troocoo-web.git
```


## Rename remote

```bash
git remote rename <old> <new>
```


## List remote

```bash
git remote
git config --get remote.origin.url
```


## Remove remote

```bash
git remote remove <name>
```


## Use different SSH private key for a repo

Use multiple Github account on the same machine.

### Modify the ssh config

```shell
vi ~/.ssh/config
```

Then add:

```
# Duong Pham account
Host github.com-truck2hand
	HostName github.com
	User git
	IdentityFile /Users/lam/Desktop/source/keys/id_rsa_pvd

# Lam account
Host github.com-lamhq
	HostName github.com
	User git
	IdentityFile ~/.ssh/id_rsa
```

### Clone you repo with modified url

Add `-truck2hand` in the host

```shell
git clone git@github.com-truck2hand:truck2hand/t2h-backend.git t2h
```

### Update remote url of existing repos

```shell
git remote set-url origin git@github.com-truck2hand:truck2hand/t2h-backend.git
```