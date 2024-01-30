# Model

## Defining models

Define a Pydantic model:

```py filename="model.py"
from pydantic import BaseModel

class Creature(BaseModel):
    name: str
    country: str
    area: str
    description: str
    aka: str
```

## Use models

```py filename="main.py"
from model import Creature

thing = Creature(
    name="yeti",
    country="CN",
    area="Himalayas",
    description="Hirsute Himalayan",
    aka="Abominable Snowman")
)
print("Name is", thing.name)  

_creatures: list[Creature] = [
    Creature(name="yeti",
             country="CN",
             area="Himalayas",
             description="Hirsute Himalayan",
             aka="Abominable Snowman"
             ),
    Creature(name="sasquatch",
             country="US",
             area="*",
             description="Yeti's Cousin Eddie",
             aka="Bigfoot")
]

def get_creatures() -> list[Creature]:
    return _creatures
```

```py
from model import Creature
from fastapi import FastAPI

app = FastAPI()

@app.get("/creature")
def get_all() -> list[Creature]:
    from data import get_creatures
    return get_creatures()
```
