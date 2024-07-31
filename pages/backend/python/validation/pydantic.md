# Pydantic

## Overview

Pydantic is a Python library to perform data validation.

You declare the "shape" of the data as classes with attributes.

And each attribute has a type.

You create an instance of that class with some values and Pydantic will:
- validate the values
- convert them to the appropriate type
- give you an object with all the data

```py
from datetime import datetime

from pydantic import BaseModel


class User(BaseModel):
    id: int
    name: str = "John Doe"
    signup_ts: datetime | None = None
    friends: list[int] = []


external_data = {
    "id": "123",
    "signup_ts": "2017-06-01 12:22",
    "friends": [1, "2", b"3"],
}
user = User(**external_data)
print(user)
# > User id=123 name='John Doe' signup_ts=datetime.datetime(2017, 6, 1, 12, 22) friends=[1, 2, 3]
print(user.id)
# > 123
```


## References

- [Pydantic models](https://fastapi.tiangolo.com/python-types/#pydantic-models)
