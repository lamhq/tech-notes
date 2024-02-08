# Debuging

## Display variables

```py
import reprlib
print(reprlib.repr(set('supercalifragilisticexpialidocious')))

import pprint
t = [[[['black', 'cyan'], 'white', ['green', 'red']], [['magenta',
    'yellow'], 'blue']]]
pprint.pprint(t, width=30)
```