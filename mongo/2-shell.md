### Mongo shell commands
```
// start mongo shell
cd <mongodb installation dir>
./bin/mongo

// display the database you are using
db

// switch databases
use <database>

// list the available databases
show dbs

// see the list of collections in the current database
show collections

// query data
db.myCollection.find().pretty()

// list methods available on the collection objects
db.collection.help()
```


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
