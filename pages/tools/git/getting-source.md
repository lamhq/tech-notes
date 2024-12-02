# Getting Source Code

## Get only the lasted commit

```shell
git clone --depth 1 -b <branch> <git_url> <directory>
```


## Specify SSH key when cloning

```shell
GIT_SSH_COMMAND="ssh -i ~/.ssh/id_rsa" git clone <REPO_URL>
```


## Set SSH key when pushing

```shell
git config core.sshCommand 'ssh -i ~/.ssh/id_rsa'
```
