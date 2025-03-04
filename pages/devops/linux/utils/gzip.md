# Gzip command guide

## Create an archive (compress)

```sh
tar -cvf files.tar /path/to/directory; gzip -9 files.tar
```


## Extract an archive to a directory

```sh
gzip -d filename.gz
```


## View archive content

```sh
tar -tvf archive.tar.gz
```