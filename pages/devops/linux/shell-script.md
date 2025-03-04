# Writing Shell Script

## Exits on error

you can ensure that the entire script exits immediately when an error occurs by adding the line `set -e` at the beginning of your script:

```sh
#!/bin/bash
set -e

# Your script commands go here
```
