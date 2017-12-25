### Import
```
mongoimport --jsonArray --host localhost:27017 --db test --collection restaurants --file primer-dataset.json
```

### Export
```
mongoexport --jsonArray --pretty --host localhost:27017 --db test -c restaurants --out newdbexport.json
```

mongoexport --jsonArray --pretty --host localhost:27017 --db test -c common.users --out users.json
mongoexport --jsonArray --pretty --host localhost:27017 --db test -c note.posts --out posts.json
