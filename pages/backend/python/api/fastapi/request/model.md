# Model

## Declaring models

You can declare validation and metadata inside of Pydantic models using Pydantic's `Field`.

```py
from pydantic import BaseModel, Field

class Item(BaseModel):
    name: str
    description: str | None = Field(
        default=None, title="The description of the item", max_length=300
    )
    price: float = Field(gt=0, description="The price must be greater than zero")
    tax: float | None = None
```

## Validation

```py
from pydantic import BaseModel, Field
 
class Creature(BaseModel):
    name: str = Field(..., min_length=2)
    country: str
    area: str
    description: str
    aka: str
```

The `...` argument of `Field()` means that a value is required, and that there's no default value.


## References

Check the [available parameters of Field](https://docs.pydantic.dev/latest/api/fields/).