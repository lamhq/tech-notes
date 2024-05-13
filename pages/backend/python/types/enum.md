# Enum

## Defining enum

Using class syntax:
```py
from enum import Enum

class Color(Enum):
    RED = 1
    GREEN = 2
    BLUE = 3
```

Using functional syntax:
```py
from enum import Enum

Color = Enum('Color', ['RED', 'GREEN', 'BLUE'])
```
