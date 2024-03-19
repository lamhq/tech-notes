# Undoing changes

## Reset everything to a commit

```shell
git reset --hard <commit>
```
- Reset history to selected commit.
- **Discards** any uncommitted changes and resets everything to the state of the specified commit.

Use cases:
- Undoing unwanted changes permanently

Caution:
- Always check that your working directory is clean before using this command


## Reset history to a commit

```shell
git reset <commit>
```
- Reset history to selected commit.
- Do not modiy the working directory
- Leaves all your changed files as "Changes not staged for commit"

Use cases:
- You want to uncommit but keep your changes staged for recommitting later.
- Local development


## Undo commits

Change the working directory to the state before commits were made.

Revert changes of one commit:
```sh
git revert <commit> --no-commit
```

Revert multiple commits, from `<commit>` (not included) to `HEAD`:
```sh
git revert <commit>...HEAD --no-commit
```

- Create changes for creating a revert commit
- Commit history is not modified

Caution:
- Requires your working tree to be clean

Use cases:
- You want to revert the working directory to the state before commits were made but keep commit history untouched.


## More on reverting

### `git revert`

- Revert the changes in one or more selected commits
- Appends (or not) new commits with the inverse content.
- Requires your working tree to be clean

```sh
git revert <commit1> <commit2> ...
```

Example: revert the changes from commit `8d87357` (not included) to HEAD (included) but do not create any commit with the reverted changes.

```sh
git revert 8d87357...HEAD --no-commit
```


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
