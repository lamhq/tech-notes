### Delete remote tag

```bash
git tag --delete <tag-name>
git push origin :refs/tags/<tag name>
```


### create tag and push

```bash
git tag <tag-name> <commit-checksum>
git push origin <tag-name>
```