# Getting Source Code

## Clone the latest commit

```shell
git clone --depth 1 -b <branch> <git_url> <directory>
```


## Download a directory

Go to [download-directory.github.io](https://download-directory.github.io/), paste the URL to download.



## Specify SSH key when cloning

```shell
GIT_SSH_COMMAND="ssh -i ~/.ssh/id_rsa" git clone <REPO_URL>
```


## Set default SSH key

```shell
git config core.sshCommand 'ssh -i ~/.ssh/id_rsa'
```
