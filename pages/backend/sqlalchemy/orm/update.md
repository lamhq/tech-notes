# Updating Data

Updating data via object:
```py
query = session.query(Cookie)
cc_cookie = query.filter(Cookie.cookie_name == "chocolate chip").first()
cc_cookie.quantity = cc_cookie.quantity + 120
session.commit()

print(cc_cookie.quantity)
```

Update data in place without having the object:
```py
session.query(Cookie) \
    .filter(Cookie.cookie_name == "chocolate chip") \
    .update({ Cookie.quantity: Cookie.quantity - 20 })
```
