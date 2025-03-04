# `tar` command

## Create an archive (compress)

```sh
tar -czvf file.tar.gz -C /dir/to/compress .
tar -cvf files.tar -C /dir/to/compress .; gzip -9 files.tar
```

- `-c`: Create an archive.
- `-z`: Compress the archive with gzip.
- `-v`: Display progress in the terminal while creating the archive, also known as "verbose” mode.
- `-f`: Allows you to specify the filename of the archive.
- `-C`: change dir to directory
- `-x`: extract an archive.


## Extract an archive to a directory

```sh
tar -xzvf archive.tar.gz -C /path/to/dir
```


## View archive content

```sh
tar -tvf archive.tar.gz
```