# Schema definition with ORM

## Create a declarative base

Fastest way:

```py
from sqlalchemy.orm import declarative_base

Base = declarative_base()
```

With a Registry:

```py
from sqlalchemy.orm import registry
mapper_registry = registry()

Base = mapper_registry.generate_base()
```

You can access the `MetaData` object from registry:

```py
mapper_registry.metadata
```

## Defining Tables via ORM Classes

```py
from sqlalchemy import ForeignKey, Column, Integer, String
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "user_account"
    id = Column(Integer, primary_key=True)
    name = Column(String(30))
    fullname = Column(String)
    addresses = relationship("Address", back_populates="user")
    def __repr__(self):
        return f"User(id={self.id!r}, name={self.name!r}, fullname={self.fullname!r})"

class Address(Base):
    __tablename__ = "address"
    id = Column(Integer, primary_key=True)
    email_address = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey("user_account.id"))
    user = relationship("User", back_populates="addresses")
    def __repr__(self):
        return f"Address(id={self.id!r}, email_address={self.email_address!r})"
```


## Init an object

The classes are automatically given an `__init__()` method if we don’t declare one of our own.

The default form of this method accepts all attribute names as optional keyword arguments:

```py
sandy = User(name="sandy", fullname="Sandy Cheeks")
```
