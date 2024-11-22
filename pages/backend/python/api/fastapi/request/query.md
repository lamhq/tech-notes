# Query Parameters

## Declaration

When you declare other function parameters that are not part of the path parameters, they are automatically interpreted as "query" parameters.

```py
# http://127.0.0.1:8000/items/?skip=0&limit=10
@app.get("/items/")
async def read_item(skip: int = 0, limit: int = 10):
    return fake_items_db[skip : skip + limit]
```

## Optional parameter

Client can omit the optional parameter in request:
```py
@app.get("/items/{item_id}")
async def read_item(item_id: str, q: str | None = None):
    if q:
        return {"item_id": item_id, "q": q}
    return {"item_id": item_id}
```

## Boolean value
```py
# http://127.0.0.1:8000/items/foo?short=1
# http://127.0.0.1:8000/items/foo?short=True
# http://127.0.0.1:8000/items/foo?short=true
# http://127.0.0.1:8000/items/foo?short=on
# http://127.0.0.1:8000/items/foo?short=yes
@app.get("/items/{item_id}")
async def read_item(item_id: str, short: bool = False):
    item = {"item_id": item_id}
    if not short:
        item.update(
            {"description": "This is an amazing item that has a long description"}
        )
    return item
```


## Validation

Define an optional Query Parameter with length doesn't exceed 50 characters:
```py
from typing import Annotated
from fastapi import Query

@app.get("/items/")
async def read_items(q: Annotated[str | None, Query(max_length=50)] = None):
    results = {"items": [{"item_id": "Foo"}, {"item_id": "Bar"}]}
    if q:
        results.update({"q": q})
    return results
```

Check the [Query parameter reference](https://fastapi.tiangolo.com/reference/parameters/#fastapi.Query) for more validations: `max_length`, `pattern`, ...


## Mutilple values

A query parameter that receive a list of values:
```py
from typing import Annotated
from fastapi import Query

# http://localhost:8000/items/?q=foo&q=bar
@app.get("/items/")
async def read_items(q: Annotated[list[str] | None, Query()] = None):
    query_items = {"q": q}
    return query_items
```

Default values:
```py
@app.get("/items/")
async def read_items(q: Annotated[list[str], Query()] = ["foo", "bar"]):
    query_items = {"q": q}
    return query_items
```


## Parameter description

You can add `title` and `description` to OpenAPI doc:

```py
@app.get("/items/")
async def read_items(
    q: Annotated[
        str | None,
        Query(
            title="Query string",
            description="Query string for the items to search in the database that have a good match",
        ),
    ] = None,
):
    results = {"items": [{"item_id": "Foo"}, {"item_id": "Bar"}]}
    if q:
        results.update({"q": q})
    return results
```


## Alias

Rename query parameter:

```py
# http://127.0.0.1:8000/items/?item-query=foobaritems
from typing import Annotated
from fastapi import Query

@app.get("/items/")
async def read_items(q: Annotated[str | None, Query(alias="item-query")] = None):
    results = {"items": [{"item_id": "Foo"}, {"item_id": "Bar"}]}
    if q:
        results.update({"q": q})
    return results
```


## Deprecating

```py
from typing import Annotated
from fastapi import Query

@app.get("/items/")
async def read_items(
    q: Annotated[
        str | None,
        Query(
            deprecated=True,
        ),
    ] = None,
):
    results = {"items": [{"item_id": "Foo"}, {"item_id": "Bar"}]}
    if q:
        results.update({"q": q})
    return results
```


## Exclude from OpenAPI

https://fastapi.tiangolo.com/tutorial/query-params-str-validations/#exclude-from-openapi