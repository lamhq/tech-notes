### Upload code
```
git push heroku master
```

### View log
```
heroku logs --tail
```

### View environment variable
```
heroku config
```

### Set environment variable (Define config vars)

```
heroku config:set ALLOWED_ORIGIN=https://lamhq.github.io
```

[https://devcenter.heroku.com/articles/getting-started-with-nodejs#define-config-vars](https://devcenter.heroku.com/articles/getting-started-with-nodejs#define-config-vars)