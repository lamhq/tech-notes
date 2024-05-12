# Code and Libraries

## Code location

Properties: **Script path** and **Script filename**.


## Additional libraries or files

If your script requires additional libraries or files, you can specify them as follows:

### Python library path

Comma-separated Amazon S3 paths to Python libraries that are required by the script.

Only pure Python libraries can be used. 

Parameter name: `--extra-py-files`

### Dependent jars path

Comma-separated Amazon S3 paths to JAR files that are required by the script.

only pure Java or Scala (2.11) libraries can be used.

Parameter name: `--extra-jars`


### Referenced files path

Comma-separated Amazon S3 paths to additional files that are required by the script.

Parameter name: `--extra-files`
