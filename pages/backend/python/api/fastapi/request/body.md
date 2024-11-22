# Request Body

## Declare request body

Function parameters that are declared to be Pydantic models will be taken from the request body:
```py
class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None

@app.post("/items/")
async def create_item(item: Item):
    item_dict = item.dict()
    if item.tax:
        price_with_tax = item.price + item.tax
        item_dict.update({"price_with_tax": price_with_tax})
    return item_dict
```


## Multiple body parameters

View the [official docs](https://fastapi.tiangolo.com/tutorial/body-multiple-params/#multiple-body-parameters).


## Single body parameter

Declare type for a key `item` inside the request body:

```py
from typing import Annotated
from fastapi import Body
from pydantic import BaseModel

class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None


@app.put("/items/{item_id}")
async def update_item(item_id: int, item: Annotated[Item, Body(embed=True)]):
    results = {"item_id": item_id, "item": item}
    return results
```

FastAPI will expect a body like:
```json
{
    "item": {
        "name": "Foo",
        "description": "The pretender",
        "price": 42.0,
        "tax": 3.2
    }
}
```
