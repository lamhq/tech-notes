# Develop CLI Applications

## Getting command Line Arguments

```py
import sys
print(sys.argv)
# ['demo.py', 'one', 'two', 'three']
```


## Output Error

```py
import sys

# stdin, stdout, stderr
sys.stderr.write('Warning, log file not found starting a new one\n')
```

## Getting environment variable value

```py
os.getenv(key, default=None)
```
