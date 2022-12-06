# Undoing changes

## Abort a merge

```sh
git merge --abort
```

## Revert to a commit

Revert changes from the `HEAD` commit to a previous commit:

```sh
git reset --hard <commit>
```

## Combine previous commits

Revert multiple commits and combine them to one commit

```shell
git reset --soft HEAD~3
```

## More on reverting

### `git revert`

- Revert the changes in one or more selected commits
- Appends (or not) new commits with the inverse content.
- Requires your working tree to be clean

```sh
git revert <commit1> <commit2> ...
```

Example: revert the changes from commit `8d87357` (not included) to HEAD (included)  but do not create any commit with the reverted changes.

```sh
git revert 8d87357...HEAD --no-commit
```

### `git reset`

Reset history to selected commit.


`git reset [--mixed] <commit>`: 
- not modifying files in the working directory.
- leaves all your changed files as "Changes not staged for commit"

`git reset --soft <commit>`: 
- not modifying files in the working directory.
- leaves all your changed files as "Changes to be committed"

`git reset --hard <commit>`: 
- working directory is reset to selected commit.
- any changes since selected commit are discarded.


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

## Find changes on your local system

```sh
git status
```

## View commit details

```sh
git show c5826d
```
