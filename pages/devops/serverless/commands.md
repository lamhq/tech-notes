# Commands

## Deploy

Deploy all functions:
```shell
sls deploy
```

Deploy a single function:
```shell
sls deploy function -f <function_name>
```

## Invoke

Invoke a function by name:
```shell
sls invoke -f hello
```

Invoke a function locally:
```shell
serverless invoke local --function <function_name> --data '{"a":"bar"}'
```


## Monitoring

Stream logs from all functions:
```shell
sls dev --verbose
```

Stream logs from a specific function:
```shell
sls dev -f <function_name>
```


## Remove

```shell
sls remove
```
