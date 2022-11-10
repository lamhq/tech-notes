## Keep your code as bug-free as possible

### Enforcing good javascript with jshint

Read the book "Javascript: The Good Part"

Install jshint: `npm install jshint -g`

Install jshint to sublime text

### Perilous parsing of query strings

Set default value for query

```
app.get("/search", function(req, res) {
    var search = req.query.q || "";
    var terms = search.split("+");
    // … do something with the terms …
});
```

Query value can be array, not always string

```
/search?q=abc&q=xyz
```

### Use HTTPS

Use express middleware `express-enforces-ssl` to redirect request to https version

```
npm install express-enforces-ssl

var enforceSSL = require("express-enforces-ssl");
// …
app.enable("trust proxy");
app.use(enforceSSL());
```

When user is on HTTPS, tell them to avoid going back to HTTP by setting http header:

```
Strict-Transport-Security: max-age=31536000
```

```
npm install helmet ms

var helmet = require("helmet");
var ms = require("ms");
// …
app.use(helmet.hsts({
    maxAge: ms("1 year"),
    includeSubdomains: true
}));
```

### Preventing cross-site scripting attacks (XSS)

Solution: escape user input when rendering text in html. Use template

### Cross-site request forgery (CSRF) prevention

- Render a csrf token in form
- Add middleware to validate csrf token on each request rather than get

The `csurf` middleware does two things:

- It adds a method to the request object called req.csrfToken. You'll send this token whenever you send a form, for example.
- If the request is anything other than a GET, it looks for a parameter called `_csrf` to validate the request, creating an error if it’s invalid.

```
npm install csurf --save

app.use(csrf());
app.get("/", function(req, res) {
    res.render("myview", {
        csrfToken: req.csrfToken()
    });
});
```

### Keep your app running after crash

There is a simple tool called Forever, if your app crashes, Forever will try to restart it.

```
npm install forever --save
```

package.json

```
"scripts": {
    "start": "forever app.js"
}
```

### Hide express information

Disable `X-Powered-By` header

```
app.disable("x-powered-by");
```

### Preventing clickjacking

Clickjacking takes advantage of browser frames—the ability to embed one page in another—to make this happen. It display an invisible iframe on website and trick you to click to that iframe

To prevent this attack, set header `X-Frame-Options` to `SAMEORIGIN` or `DENY`. This prevent anyone put your website in iframe

```
app.use(helmet.frameguard("sameorigin"));
// or …
app.use(helmet.frameguard("deny"));
```

### Keeping Adobe products out of your site

This is easily preventable by adding a file at the root of your site called crossdomain.xml. When an Adobe product is going to load a file off of your domain, it will first check the crossdomain.xml file to make sure your domain allows it

```
<?xml version="1.0"?>
<!DOCTYPE cross-domain-policy SYSTEM "http://www.adobe.com/xml/dtds/cross-domain-policy.dtd">
<cross-domain-policy>
    <site-control permitted-cross-domain-policies="none">
</cross-domain-policy>
```

### Don't let browsers infer the file type

Prevent anythings like this:

```
<script src="file.txt"></script>
```

You can fix this with a single HTTP header. You can set the `X-ContentType-Options` header to its only option, `nosniff`