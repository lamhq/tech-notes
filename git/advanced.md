## Set email and username (global)
git config --global user.email "daibanglam@gmail.com"
git config --global user.name "Lam"


## Set email and username (per project)
git config user.email "daibanglam@gmail.com"
git config user.name "Lam"


## view git config
git config user.email
git config user.name


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


## Use VIM to fix git merge problem
GIT PROBLEM / ERROR : ‘PLEASE ENTER A COMMIT MESSAGE TO EXPLAIN WHY THIS MERGE IS NECESSARY …’

1. press "i"
2. write your merge message
3. press "esc"
4. write ":wq"
5. then press enter

Vim tutorial: https://kipalog.com/posts/Lam-quen-VIM-trong-5-phut


## Combine commits
```
git reset --soft HEAD~3
```

Reference: https://stackoverflow.com/questions/5189560/squash-my-last-x-commits-together-using-git#answer-5201642


## extract changed files in a commit

In below example `8449c1e65a` is parent commit of `2f4367`:

```
git diff --name-only 2f4367 8449c1e65a | zip changes.zip -@
```

## export all files in a commit

```
git archive --format tar --output web.tar.gz bf4d7495a8e
```

## Changing a remote's URL

```bash
git remote set-url origin git@bitbucket.org:theappteamdevs/troocoo-web.git
```