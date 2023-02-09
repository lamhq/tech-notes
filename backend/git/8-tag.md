# Tag

## Concepts

Tags are ref's that point to specific points in Git history.

Tagging is generally used to capture a point in history that is used for a marked version release (i.e. `v1.0.1`)

Git supports two different types of tags, annotated and lightweight tags.

Annotated tags store extra meta data such as: the tagger name, email, and date. This is important data for a public release. 

Lightweight tags are essentially 'bookmarks' to a commit, they are just a name and a pointer to a commit, useful for creating quick links to relevant commits.


## Create tag

```sh
# create a lightweight tag
git tag v1.0.0 HEAD

# create a new annotated tag identified with v1.4
git tag -a v1.4 -m "my version 1.4"

# create or replace (if exists) a tag
git tag -f v1.4 150279
```


## Push tag to remote

By default, `git push` will not push tags. Tags have to be explicitly passed to git push.

```sh
git push origin <tag-name>

# push all tags
git push --tags
```


## List tag

```sh
git tag

# list and filter tags
git tag -l *-rc*
```


## Delete tag

```sh
git tag -d <tag-name>
git push --delete origin <tagname> --no-verify
```
