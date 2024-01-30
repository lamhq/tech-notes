# Field validation

Some restrictions can be placed on the field's value:

- Integer (`conint`) or float: `gt`, `lt`, `ge`, `le`, `multiple_of`
- String (`constr`): `min_length`, `max_length`, `to_upper`, `to_lower`, `regex`
- Tuple, list, or set: `min_items`, `max_items`

```py
from pydantic import BaseModel, constr

class Creature(BaseModel):
    name: constr(min_length=2)
    country: str
    area: str
    description: str
    aka: str
```

Alternative syntax with `Field` spec:

```py
from pydantic import BaseModel, Field

class Creature(BaseModel):
    name: str = Field(..., min_length=2)
    country: str
    area: str
    description: str
    aka: str
```

That `...` argument to `Field()` means that a value is required, and that there’s no default value.