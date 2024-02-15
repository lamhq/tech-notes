# Gzip command guide

## Create an archive (compress)

```bash
tar -cvf files.tar /path/to/directory; gzip -9 files.tar
```


## Extract an archive to a directory

```bash
gzip -d filename.gz
```


## View archive content

```bash
tar -tvf archive.tar.gz
```