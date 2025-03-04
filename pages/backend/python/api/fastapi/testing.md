# Testing

## Installation

```sh
pip install httpx=~0.26.0
```

With poetry:
```sh
poetry add httpx=~0.26.0 --dev
```


## Snippets

```py
from fastapi import FastAPI
from fastapi.testclient import TestClient

app = FastAPI()


@app.get("/")
async def read_main():
    return {"msg": "Hello World"}


client = TestClient(app)


def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"msg": "Hello World"}
```


## References

- [Testing](https://fastapi.tiangolo.com/tutorial/testing)
- [Async Tests](https://fastapi.tiangolo.com/advanced/async-tests/)