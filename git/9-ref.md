# Refs and the Reflog

The majority of git commands accept a commit reference as a parameter. By understanding the many ways to refer to a commit, you make all of these commands that much more powerful.

In this article, we will explore the many methods of referring to a commit.

## Hashes

```sh
git show 0c708f

# returns the hash of the commit pointed to by the main branch
git rev-parse main
```

## Refs

A ref is an indirect way of referring to a commit. You can think of it as a user-friendly alias for a commit hash.

Refs are stored as normal text files in the `.git/refs` directory. In `.git/refs`, you should see the following directories:

- `heads`: defines all of the local branches in your repository.
- `tags`: contains tags
- `remotes`: lists all remote repositories. Inside each one, you’ll find all the remote branches that have been fetched into your repository.


## Specifying Refs

When passing a ref to a Git command, you can either define the full name of the ref, or use a short name and let Git search for a matching ref.

```sh
# use short name
git show some-feature

# use full name
git show refs/heads/some-feature
```


## Special Refs

In addition to the `refs` directory, there are a few special refs that reside in the top-level `.git` directory. They are listed below:

- `HEAD`: The currently checked-out commit/branch.
- `FETCH_HEAD`: The most recently fetched branch from a remote repo.

These refs are all created and updated by Git when necessary. These files contain different content depending on their type and the state of your repository.

The `HEAD` ref can contain either a symbolic ref, which is simply a reference to another ref instead of a commit hash, or a commit hash:

```sh
cat .git/HEAD
# will output ref: refs/heads/main
```


## Refspecs

A refspec maps a branch in the local repository to a branch in a remote repository. A refspec is specified as `＜src＞`:`＜dst＞`.

Refspecs can be used with the git push command to give a different name to the remote branch:

```sh
git push origin main:refs/heads/qa-main
```

You can also use refspecs for deleting remote branches:

```sh
git push origin :some-feature

# the same as
git push origin --delete some-feature
```


## Relative Refs

You can also refer to commits relative to another commit. 

The `~` character lets you reach parent commits. For example, the following displays the grandparent of `HEAD`:

```sh
git show HEAD~2
```