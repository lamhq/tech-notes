# How to export a git project

## Export all files in a commit

```sh
git archive --format=tar --output=nb-api.tar.gz HEAD
git archive --format=zip --output=my-function.zip HEAD
```


## Extract changed files between commits

```sh
git diff --name-only 2f4367 8449c1 | zip changes.zip -@
```
