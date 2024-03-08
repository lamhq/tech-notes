# Dependency Injection

## Snippet

The below snippet will:
- Define a dependency for application setting
- Define a dependency for database session object, it require a connection string from the setting to connect to the database
- Apply singleton pattern for dependencies by caching
- Define a user repository class for querying user from the database, it requires a database session object
- Define a user service class for handling user related tasks, it requires a user repository to interact with the database
- Define a FastAPI route that return a list of users, it requires a user service to do all the work

```py
from typing import Annotated
from functools import lru_cache
from fastapi import Depends
from sqlalchemy.orm import Session
from sqlalchemy.orm import declarative_base
from sqlalchemy import create_engine
from pydantic_settings import BaseSettings, SettingsConfigDict
from sqlalchemy import Column, Integer, String

# the main FastAPI app
app = FastAPI()

# base class for SQLAlchemy ORM class
Base = declarative_base()


class UserSchema(Base):
    """Schema for `users` table"""
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String(30))
    fullname = Column(String)

    def __repr__(self):
        return f"User(id={self.id!r}, name={self.name!r}, fullname={self.fullname!r})"


class UserRepo:
    """Database repository class for `users` table"""
    def __init__(self, session: Annotated[Session, Depends(db_session)]):
        self.session = session

    def find_all(self) -> list[UserSchema]:
        """Find users"""
        return self.session.query(UserSchema).all()


class UserService:
    """Service class for user entity"""
    def __init__(self, user_repo: Annotated[UserRepo, Depends()]):
        self.user_repo = user_repo

    def find_all(self) -> list[UserSchema]:
        """Find users"""
        return self.user_repo.find_all()


class Settings(BaseSettings):
    """Pydantic setting class"""
    app_name: str = 'Awesome API'
    db_url: str = ''

    model_config = SettingsConfigDict(env_file=".env")

    def __hash__(self):
        return hash(tuple(self.model_dump().items()))


@lru_cache
def app_settings():
    """FastAPI dependency function that returns the setting object"""
    return Settings()


@lru_cache
def db_session(settings: Annotated[Settings, Depends(app_settings)]) -> Session:
    """Database session"""
    engine = create_engine(settings.db_url, echo=True, future=True)
    session = Session(engine)
    return session


@app.get("/users")
async def find_all(user_service: Annotated[UserService, Depends()]) -> list[UserSchema]:
    """Find all users"""
    users = await user_service.find_all()
    return users
```


## Value dependencies

A dependency whose value is returned from a function:

```py
from typing import Annotated

from fastapi import Depends, FastAPI

app = FastAPI()


async def common_parameters(q: str | None = None, skip: int = 0, limit: int = 100):
    return {"q": q, "skip": skip, "limit": limit}


@app.get("/items/")
async def read_items(commons: Annotated[dict, Depends(common_parameters)]):
    return commons
```


## Class dependencies

A dependency which is an instance of a class.

```py
from typing import Annotated

from fastapi import Depends, FastAPI

app = FastAPI()


class CommonQueryParams:
    def __init__(self, q: str | None = None, skip: int = 0, limit: int = 100):
        self.q = q
        self.skip = skip
        self.limit = limit


@app.get("/items/")
async def read_items(commons: Annotated[CommonQueryParams, Depends()]):
    response = {}
    if commons.q:
        response.update({"q": commons.q})
    return response
```


## Sub-dependencies

```py
from typing import Annotated

from fastapi import Cookie, Depends, FastAPI

app = FastAPI()


def query_extractor(q: str | None = None):
    return q


def query_or_cookie_extractor(
    q: Annotated[str, Depends(query_extractor)],
    last_query: Annotated[str | None, Cookie()] = None,
):
    if not q:
        return last_query
    return q


@app.get("/items/")
async def read_query(
    query_or_default: Annotated[str, Depends(query_or_cookie_extractor)]
):
    return {"q_or_cookie": query_or_default}
```


## Override dependencies

Use cases:
- override a dependency during testing
- mock dependency

```py
from typing import Annotated

from fastapi import Depends, FastAPI
from fastapi.testclient import TestClient

app = FastAPI()


async def common_parameters(q: str | None = None, skip: int = 0, limit: int = 100):
    return {"q": q, "skip": skip, "limit": limit}


@app.get("/items/")
async def read_items(commons: Annotated[dict, Depends(common_parameters)]):
    return {"message": "Hello Items!", "params": commons}


client = TestClient(app)


async def override_dependency(q: str | None = None):
    return {"q": q, "skip": 5, "limit": 10}


app.dependency_overrides[common_parameters] = override_dependency


def test_override_in_items():
    response = client.get("/items/")
    assert response.status_code == 200
    assert response.json() == {
        "message": "Hello Items!",
        "params": {"q": None, "skip": 5, "limit": 10},
    }


def test_override_in_items_with_q():
    response = client.get("/items/?q=foo")
    assert response.status_code == 200
    assert response.json() == {
        "message": "Hello Items!",
        "params": {"q": "foo", "skip": 5, "limit": 10},
    }


def test_override_in_items_with_params():
    response = client.get("/items/?q=foo&skip=100&limit=200")
    assert response.status_code == 200
    assert response.json() == {
        "message": "Hello Items!",
        "params": {"q": "foo", "skip": 5, "limit": 10},
    }
```

You can reset your overrides:
```py
app.dependency_overrides = {}
```


## Using the same dependency multiple times

If multiple dependencies have a common sub-dependency, that sub-dependency will be cached and passed to all the "dependants".

If you need the dependency to be called at every step (possibly multiple times) in the same request, you can set the parameter `use_cache=False`:

```py
async def needy_dependency(fresh_value: Annotated[str, Depends(get_value, use_cache=False)]):
    return {"fresh_value": fresh_value}
```


## Path operation decorator

You can define dependencies in path operation decorators
Use cases:
- When you don't really need the return value of a dependency inside your path operation function.
- the dependency doesn't return a value but it need to be executed/solved (e.g. auth check).

Reference: [Dependencies in path operation decorators](https://fastapi.tiangolo.com/tutorial/dependencies/dependencies-in-path-operation-decorators/)


## Global Dependencies

Add dependencies to the whole application.

Reference: [Global Dependencies](https://fastapi.tiangolo.com/tutorial/dependencies/global-dependencies/)


## Router scoped dependencies

You can define dependency based on a router instead of the top-level application:

```py
from fastapi import FastAPI, Depends, APIRouter

router = APIRouter(..., dependencies=[Depends(depfunc)])
```


## Clean up

Declare dependencies that do some extra steps after finishing.

Reference: [Dependencies with yield](https://fastapi.tiangolo.com/tutorial/dependencies/dependencies-with-yield/).