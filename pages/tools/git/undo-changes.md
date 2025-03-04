# Undoing changes

## Revert working directory

- Change the working directory to the state before commits were made
- Reverted files are added as **staged changes**
- Commit history is not modified
- Caution: require your working tree to be clean
- Use cases: revert the working directory to the state before commits were made but keep commit history untouched

Revert changes of one commit:
```sh
git revert <commit> --no-commit
```

Revert multiple commits, from `<commit>` (not included) to `HEAD`:
```sh
git revert <commit>...HEAD --no-commit
```


## Reset everything to a commit

- Reset history to selected commit
- Working directory is rolled back to the state of the specified commit
- Caution: always check that your working directory is clean before using this command
- Use cases: undoing unwanted changes permanently

```sh
git reset --hard <commit>
```


## Reset history to a commit

- Reset history to selected commit
- Working directory is not changed
- Leaves all your changed files as `Changes not staged for commit`
- Use cases:
  - Undo commits but keep your changes staged for recommitting later
  - Combine local (uncommited) commits before pushing
  - Compare changes since the last commit by rolling back history (make sure to back up your branch first)

```sh
git reset <commit>
```
