# Merging

## Merging changes from a branch

Combine changes from the `main` branch into the current branch:
```shell
git merge main
```

## Resolving merge conflicts

When merging, you can encounter a merge conflict.

Here's how you can resolve the conflict:
1. Editing the conflicting files
2. Using `git add` to stage the files you want to keep
    ```shell
    git add index.ts
    ```
3. Continue the merge process:
    ```shell
    git merge --continue
    ```
    This command will create the merge commit.


## Canceling the merge

If you encounter any issues during the merge, you can cencel it by:
```shell
git merge --abort
```
