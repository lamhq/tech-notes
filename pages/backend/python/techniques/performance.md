# Performance

## Measure time excution

```py
import time
import datetime

start = time.time()

# your code here ...

end = time.time()
seconds = end - start
elapsed = str(datetime.timedelta(seconds=seconds))
print(elapsed)
```
