## Extract changed files between commits

In below example `8449c1e65a` is parent commit of `2f4367`:

```
git diff --name-only 2f4367 8449c1e65a | zip changes.zip -@
```

## Export all files in a commit

```
git archive --format tar --output web.tar.gz bf4d7495a8e
git archive --format zip --output my-function.zip HEAD
```
