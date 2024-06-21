# Git history

## List the commit history

```sh
git log

# Display each commit on a single line
git log --oneline

# Limits the commits shown to the correlating time frame
git log --after 2017-07-04

# Lists all commits whose author matches the name
git log --author="Alana"

# Returns any commit with a commit message which matches the string you entered
git log --grep="HOT-"
```


## Export all files in a commit

TAR format:
```sh
git archive --format=tar --output=commit.tar.gz HEAD
```

ZIP format:
```sh
git archive --format=zip --output=commit.zip HEAD
```


## Export changed files between commits

```sh
git diff --name-only <FROM_COMMIT> <TO_COMMIT> | zip changes.zip -@
```


## View commit details

```sh
git show c5826d
```
