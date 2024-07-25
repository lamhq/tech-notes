# 

Call an external command within Python as typing it in a shell or command prompt.

```py
import subprocess

# Example command: listing files in the current directory
command = ["ls", "-l"]
result = subprocess.run(command, capture_output=True, text=True)

# Print the output
print(result.stdout)
```
