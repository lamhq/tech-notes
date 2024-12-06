# File System Operations

### Joining file paths

```py
os.path.join(application_path, filename)
```


### Get working directory

```py
import os

os.getcwd()
```


### Get dirname

Get directory path that contain a file
```py
import os

os.path.dirname('/path/to/file')
```

## Get file name without extension

```py
from pathlib import Path

Path(file_path).stem
```


### Change Working Directory

```py
import os

os.chdir("d:\\tempdir")
```


### Removing a Directory

```py
import os

os.rmdir("d:\\tempdir")
```


### Creating Directory

```py
import os

os.mkdir("d:\\tempdir")
```


### Traversing Directories

```py
import os

def list_files_and_directories(path):
    for root, dirs, files in os.walk(path):
        for name in dirs:
            print(f"Directory: {os.path.join(root, name)}")
        for name in files:
            print(f"File: {os.path.join(root, name)}")

# Example usage:
target_path = "/path/to/your/directory"
list_files_and_directories(target_path)
```


## File Wildcards

```py
import glob

glob.glob('*.py')

glob.glob('./[0-9].*')
```

## `shutil` module

```py
import os
import shutil
```

### Copy File

```py
print('BEFORE:', os.listdir('.'))
shutil.copyfile('file_copy.py', 'file_copy.py.copy')
print('AFTER:', os.listdir('.'))
```

### Copying Files to another directory

```py
os.mkdir('journaldev')
print('BEFORE:', os.listdir('journaldev'))
shutil.copy('file_copy.py', 'journaldev')
print('AFTER:', os.listdir('journaldev'))
```

### Replicating complete directory

```py
shutil.copytree('../shutil', './journaldev')
```

### Removing a Directory

```py
shutil.rmtree('journaldev')
```

### Finding files

```py
print(shutil.which('bsondump'))
```
