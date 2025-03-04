# Commands

## Deploy

Deploy all functions:
```sh
sls deploy
```

Deploy a single function:
```sh
sls deploy function -f <function_name>
```

## Invoke

Invoke a function by name:
```sh
sls invoke -f hello
```

Invoke a function locally:
```sh
serverless invoke local --function <function_name> --data '{"a":"bar"}'
```


## Monitoring

Stream logs from all functions:
```sh
sls dev --verbose
```

Stream logs from a specific function:
```sh
sls dev -f <function_name>
```


## Remove

```sh
sls remove
```
