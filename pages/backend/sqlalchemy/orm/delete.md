# Deleting Data

Deleting data via object:

```py
query = session.query(Cookie)
query = query.filter(Cookie.cookie_name == "dark chocolate chip") dcc_cookie = query.one()

session.delete(dcc_cookie)
session.commit()
```

Delete data in place without having the object:
```py
session.query(Cookie) \
    .filter(Cookie.cookie_name == "molasses") \
    .delete()
```
