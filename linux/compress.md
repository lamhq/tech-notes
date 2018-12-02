# Compress an Entire Directory or a Single File

```bash
tar -czvf name-of-archive.tar.gz /path/to/directory-or-file
```

Here's what those switches actually mean:

- -c: Create an archive.
- -z: Compress the archive with gzip.
- -v: Display progress in the terminal while creating the archive, also known as “verbose” mode. The v is always optional in these commands, but it’s helpful.
- -f: Allows you to specify the filename of the archive.


# Extract an Archive

```bash
tar -xzvf archive.tar.gz
```

It’s the same as the archive creation command we used above, except the -x switch replaces the -c switch. This specifies you want to extract an archive instead of create one.