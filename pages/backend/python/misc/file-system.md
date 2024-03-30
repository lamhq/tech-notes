# File System Operations

## `os` module

```py
import os
```

### Creating Directory

```py
os.mkdir("d:\\tempdir")
```

### Changing the Current Working Directory

```py
os.chdir("d:\\tempdir")
```

### Get current working directory

```py
os.getcwd()
```

### Removing a Directory

```py
os.rmdir("d:\\tempdir")
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

### Get path of executable file

```py
import sys
os.path.dirname(sys.executable)
```

### Joining file paths

```py
os.path.join(application_path, filename)
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


## File Wildcards

```py
import glob

glob.glob('*.py')

glob.glob('./[0-9].*')
```


## Convert python code to executable file

Use [PyInstaller](https://pyinstaller.org/en/stable/)