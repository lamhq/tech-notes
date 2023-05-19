# Backup and restore

## Import
```sh
mongoimport --jsonArray --host localhost:27017 --db test --collection restaurants --file primer-dataset.json
```

## Export
```sh
mongoexport --jsonArray --pretty --host localhost:27017 --db test -c restaurants --out newdbexport.json
```
