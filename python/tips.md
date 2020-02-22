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


## Fix bug SSL: CERTIFICATE_VERIFY_FAILED with Python3

This solution work on MacOS.

Go to the folder where Python is installed, e.g., in my case it is installed in the Applications folder with the folder name 'Python 3.6'. Now double click on 'Install Certificates.command'. After that error was gone.

Reference: [https://stackoverflow.com/questions/35569042/ssl-certificate-verify-failed-with-python3](https://stackoverflow.com/questions/35569042/ssl-certificate-verify-failed-with-python3)