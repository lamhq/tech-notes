# Git history

## List the project history

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


## View commit details

```sh
git show c5826d
```
