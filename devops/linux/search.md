# Searching

## Find files containt text

```sh
grep -rnw /Users/lam/Desktop/data/**/*.txt -e 'fshare'
```

## Extract version from `package.json`

```sh
npm_package_version=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[", ]//g')
```
