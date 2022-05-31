# Operating System Interface

## `os` module

```py
import os

# Creating Directory
os.mkdir("d:\\tempdir")

# Changing the Current Working Directory
os.chdir("d:\\tempdir")

# Get current working directory
os.getcwd()

# Removing a Directory
os.rmdir("d:\\tempdir")

# List Files and Sub-directories
os.listdir("c:\python37")
```


## `shutil` module

```py
import os
import shutil

# Copy File
print('BEFORE:', os.listdir('.'))
shutil.copyfile('file_copy.py', 'file_copy.py.copy')
print('AFTER:', os.listdir('.'))

# Copying Files to another directory
os.mkdir('journaldev')
print('BEFORE:', os.listdir('journaldev'))
shutil.copy('file_copy.py', 'journaldev')
print('AFTER:', os.listdir('journaldev'))

# Replicating complete directory
shutil.copytree('../shutil', './journaldev')

# Removing a Directory
shutil.rmtree('journaldev')

# Finding files
print(shutil.which('bsondump'))
```


## File Wildcards

```py
import glob

glob.glob('*.py')

glob.glob('./[0-9].*')
```