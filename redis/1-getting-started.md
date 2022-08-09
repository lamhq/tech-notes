# Getting started with Redis

## Install Redis (macOS)

```sh
brew install redis
```

To start Redis in foreground:

```sh
redis-server
```

To stop Redis, press `Ctrl-C`


## Connect to Redis

```sh
redis-cli
```

Try running some commands in Redis REPL:

```sh
lpush demos redis-macOS-demo
rpop demos
```