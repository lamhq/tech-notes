### Delete branch
git branch -d hotfix/1.6.1
git push origin --delete hotfix/1.6.1


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