# Git stash

`git stash` temporarily shelves (or stashes) changes you've made to your working copy so you can work on something else, and then come back and re-apply them later on.

## Stashing your work

```sh
git stash

# include untracked files
git stash -u

# annotate your stashes with a description
git stash save "add style to our site"
```

## Re-applying your stashed changes

```sh
git stash pop

# apply the changes to your working copy and keep them in your stash
git stash apply

# choose the stash to apply
git stash pop stash@{2}
```

## Managing multiple stashes

```sh
# view all stashes
git stash list

git stash show

git stash drop stash@{1}

# delete all of your stashes
git stash clear
```