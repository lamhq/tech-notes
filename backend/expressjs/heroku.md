Download and install the Heroku Toolbelt from https://toolbelt.heroku.com/

### Prepare

1. Specify node version in `package.json`

```
{
	"scripts": {
		"start": "node app"
	},
    "engines": {
        "node": "4.2.x"
    }
}
```

2. Use `process.env.PORT` in `app.js`

```
var express = require("express");
var app = express();
app.set("port", process.env.PORT || 3000);
app.get("/", function(req, res) {
    res.send("Hello world!");
});
app.listen(app.get("port"), function() {
    console.log("App started on port " + app.get("port"));
});
```

3. Create a file in the root of your directory and call it `Procfile` (capital P, no file extension):

```
web: npm start
```

### Deploy your app

Open ternimal on your project root, run commands:

```
heroku create
heroku config:set NODE_ENV=production
git push heroku master
heroku ps:scale web=1
```

### Run your app

```
heroku open
```

### Running Grunt on Heroku

Heroku will run `npm install` when you deploy your app, and you can tell Heroku to run Grunt right after that in order to build all of your assets. This is a simple manner of adding another script to your `package.json`

```
"scripts": {
	"postinstall": "grunt build"
},
```

### Making your server more crash resistant

Use `Forever` module: it’s a tool to keep your server up and running, even in the face of crashes, your app will be restart.

```
npm install forever --save 
```

add a new script to `package.json`, run `forever app.js` to start your server:

```
"scripts": {
	"production": "forever app.js"
},
```

The next step is to get Heroku to run this script, and that’s just a simple matter of changing your `Procfile`:

```
web: npm run production
```

