# TAR command

## Compress using tar command

```bash
tar -czvf filename.tar.gz -C /path/to/compress .
```

Here's what those switches actually mean:

- `-c`: Create an archive.
- `-z`: Compress the archive with gzip.
- `-v`: Display progress in the terminal while creating the archive, also known as “verbose” mode.
- `-f`: Allows you to specify the filename of the archive.
- `-C`: change to directory


## Extract an archive

```bash
tar -xzvf -C /path/to/extract archive.tar.gz
```

It's the same as the archive creation command we used above, except the -x switch replaces the -c switch. This specifies you want to extract an archive instead of create one.


## View archive content

```bash
tar -tvf archive.tar.gz
```