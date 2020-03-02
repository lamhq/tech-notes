# Command Line

## Getting environment variable value

```python
os.getenv(key, default=None)
```


## Getting command Line Arguments

```python
import sys
print(sys.argv)
# ['demo.py', 'one', 'two', 'three']
```


## Error Output Redirection and Program Termination

```python
import sys

# stdin, stdout, stderr
sys.stderr.write('Warning, log file not found starting a new one\n')
```
