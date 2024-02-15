# Text Searching

## Find files containt text

```sh
grep -rnw /Users/lam/Desktop/data/**/*.txt -e 'fshare'
```

`grep` options:
- `-i`: ignore case
- `-v`: print lines do not match


## Extract version from `package.json`

```sh
npm_package_version=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[", ]//g')
```
