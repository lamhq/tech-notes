# Tag

## Create tag

`git tag <tagname> <commit>`

```sh
git tag v1.0.0 HEAD
```

## List tag

```sh
git tag --list
```

## Push tag to remote

- `git push origin :refs/tags/<tagname>`
- `git push --follow-tags`


### Delete tag

```bash
git tag --delete <tag-name>
git push origin :refs/tags/<tag name>
```


### create tag and push

```bash
git tag <tag-name> <commit-checksum>
git push origin <tag-name>
```
