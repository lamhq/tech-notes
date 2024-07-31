# Path Parameters

## Declare Path Parameters

```py
@app.get("/items/{item_id}")
async def read_item(item_id: int):
    return {"item_id": item_id}
```

Define a path parameter that contain slash:
```py
# the `:path` tells that the parameter should match any path.
# example: `/files//home/johndoe/myfile.txt`
@app.get("/files/{file_path:path}")
async def read_file(file_path: str):
    return {"file_path": file_path}
```

## Parameter metadata

```py
@app.get("/items/{item_id}")
async def read_items(
    item_id: Annotated[int, Path(title="The ID of the item to get")],
):
    results = {"item_id": item_id}
    if q:
        results.update({"q": q})
    return results
```


## Validation

```py
from typing import Annotated
from fastapi import Path

@app.get("/items/{item_id}")
async def read_items(
    item_id: Annotated[int, Path(title="The ID of the item to get", ge=0, le=1000)],
):
    results = {"item_id": item_id}
    if q:
        results.update({"q": q})
    return results
```

Check the [Path parameter reference](https://fastapi.tiangolo.com/reference/parameters/#fastapi.Path) for more validations: `gt`, `ge`, ...