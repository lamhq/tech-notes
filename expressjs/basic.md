### Route

```javascript
app.get('/', function (req, res) {
  res.send('GET request to the homepage')
})

app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...')
  next() // pass control to the next handler
})

app['m-search']('/', function (req, res, next) {
  next() // pass control to the next handler
})

app.route('/book')
  .get(function (req, res) {
    res.send('Get a random book')
  })
  .post(function (req, res) {
    res.send('Add a book')
  })
  .put(function (req, res) {
    res.send('Update the book')
  })
```

### Router

```javascript
var express = require('express')
var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', function (req, res) {
  res.send('Birds home page')
})
// define the about route
router.get('/about', function (req, res) {
  res.send('About birds')
})

module.exports = router
```

### Route parameters

```
Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }

Route path: /flights/:from-:to
Request URL: http://localhost:3000/flights/LAX-SFO
req.params: { "from": "LAX", "to": "SFO" }

Route path: /user/:userId(\d+)
Request URL: http://localhost:3000/user/42
req.params: {"userId": "42"}
```

### Multiple route handlers

```javascript
var cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

var cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

var cb2 = function (req, res) {
  res.send('Hello from C!')
}

app.get('/example/c', [cb0, cb1, cb2])
```

### Error-handling middleware

Error-handling middleware always takes four arguments. 

When not calling `next` in an error-handling function, you are responsible for writing (and ending) the response. Otherwise those requests will "hang" and will not be eligible for garbage collection

If you pass anything to the `next()` function (except the string 'route'), Express regards the current request as being in error and will skip any remaining non-error handling routing and middleware functions

```javascript
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

### Response method

```javascript
res.download()
res.end()
res.json()
res.jsonp()
res.redirect()
res.render()
res.send()
res.sendFile()
res.sendStatus()
```


### Express route tester

[http://forbeslindesay.github.io/express-route-tester/](http://forbeslindesay.github.io/express-route-tester/)