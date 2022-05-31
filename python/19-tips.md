# Python tips

## Measure time excution

```python
import time
import datetime

start = time.time()

# your code here ...

end = time.time()
seconds = end - start
elapsed = str(datetime.timedelta(seconds=seconds))
print(elapsed)
```
