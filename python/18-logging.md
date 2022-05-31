# Debuging

## Logging

### Basic

```py
import logging
logging.basicConfig(level=logging.INFO)

logging.debug('Debugging information')
logging.info('Informational message')
logging.warning('Warning:config file %s not found', 'server.conf')
logging.error('Error occurred')
logging.critical('Critical error -- shutting down')
```


### Log to a file instead of the console

```py
import logging
logging.basicConfig(level=logging.INFO, file='sample.log')
```


### Change the logging format

```py
import logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s :: %(levelname)s :: %(message)s')
logging.info("Just like that!")
# 2019-02-17 11:40:38,254 :: INFO :: Just like that!
```

### Use a separated logger
```py
logger = logging.getLogger(__name__)
logger.info('my logging message')
logger.setLevel(logging.WARNING)

# define file handler and set formatter
file_handler = logging.FileHandler('logfile.log')
formatter    = logging.Formatter('%(asctime)s : %(levelname)s : %(name)s : %(message)s')
file_handler.setFormatter(formatter)

# add file handler to logger
logger.addHandler(file_handler)

# Logs
logger.debug('A debug message')
logger.info('An info message')
logger.warning('Something is not right.')
logger.error('A Major error has happened.')
logger.critical('Fatal error. Cannot continue')
```


### Include traceback information in logged messages

```py
import logging

# Create or get the logger
logger = logging.getLogger(__name__)

# set log level
logger.setLevel(logging.INFO)

def divide(x, y):
    try:
        out = x / y
    except ZeroDivisionError:
        logger.exception("Division by zero problem")
    else:
        return out

# Logs
logger.error("Divide {x} / {y} = {c}".format(x=10, y=0, c=divide(10,0)))

#> ERROR:__main__:Division by zero problem
#> Traceback (most recent call last):
#>   File "<ipython-input-16-a010a44fdc0a>", line 12, in divide
#>     out = x / y
#> ZeroDivisionError: division by zero
#> ERROR:__main__:None
```


## Display variables

```py
import reprlib
print(reprlib.repr(set('supercalifragilisticexpialidocious')))

import pprint
t = [[[['black', 'cyan'], 'white', ['green', 'red']], [['magenta',
    'yellow'], 'blue']]]
pprint.pprint(t, width=30)
```