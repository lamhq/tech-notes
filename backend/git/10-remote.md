## Changing a remote's URL

```bash
git remote set-url origin git@bitbucket.org:theappteamdevs/troocoo-web.git
```


## Rename remote
git remote rename <old> <new>


## List remote
git remote
git config --get remote.origin.url


## Remove remote
git remote remove <name>


## Add Remote
git remote add origin git@git.assembla.com:portfolio/space.space_name.git


## Get git push work on window (In case you have installed TortoiseGIT)
1. Open pageant, click Add Key, select your private key and add it to pageant
2. Add a system enviroment variable named `GIT_SSH`, with value is the path to `TortoiseGitPlink.exe`, (ex: `d:\program\TortoiseGit\bin\TortoiseGitPlink.exe`)
3. try `git push -u origin master` on your terminal

Reference: http://guides.beanstalkapp.com/version-control/git-on-windows.html (search for the keyword: In case you have installed TortoiseGIT)


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