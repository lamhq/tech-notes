# Schema definition with ORM

## Establishing a Declarative Base

```py
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass
```


## Defining Tables via ORM Classes

```py
from typing import List
from typing import Optional
from sqlalchemy import String
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "user_account"
    
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(30))
    fullname: Mapped[Optional[str]]
    addresses: Mapped[List["Address"]] = relationship(back_populates="user")
    
    def __repr__(self) -> str:
        return f"User(id={self.id!r}, name={self.name!r}, fullname={self.fullname!r})"

class Address(Base):
    __tablename__ = "address"
    
    id: Mapped[int] = mapped_column(primary_key=True)
    email_address: Mapped[str]
    user_id = mapped_column(ForeignKey("user_account.id"))
    user: Mapped[User] = relationship(back_populates="addresses")
    
    def __repr__(self) -> str:
        return f"Address(id={self.id!r}, email_address={self.email_address!r})"
```


## Persisting the Schema

```py
Base.metadata.create_all(engine)
```


## Init an object

The classes are automatically given an `__init__()` method if we don’t declare one of our own.

The default form of this method accepts all attribute names as optional keyword arguments:

```py
sandy = User(name="sandy", fullname="Sandy Cheeks")
```
