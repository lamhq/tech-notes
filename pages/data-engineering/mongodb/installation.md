## Installation

Install MongoDB Community Edition for local development (macOS 11 or later).


## Requirements

1. Install Xcode Command-Line Tools
2. Install Homebrew


## Steps

Download Homebrew formula for MongoDB (repository of installation scripts):
```shell
brew tap mongodb/brew
```

Update Homebrew:
```shell
brew update
```

Install MongoDB:
```shell
brew install mongodb-community@8.0
```

Run MongoDB manually as a background process:
```shell
mongod --config /opt/homebrew/etc/mongod.conf --fork
```

Verify that MongoDB is running:
```shell
ps aux | grep -v grep | grep mongod
```


## Connect and use
```shell
mongosh
```

## Create a database

```shell

```


## Create an user administrator

```shell
mongosh --authenticationDatabase "admin"
```

```shell
use test
db.createUser(
  {
    user: "testadmin",
    pwd:  "123123",
    roles: [ { role: "dbAdmin", db: "test" } ]
  }
)
```


## Shutdown

```shell
db.adminCommand({ shutdown: 1 })
```


## References

- [Install MongoDB Community Edition on macOS](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x).
- [Create a User on Self-Managed Deployments](https://www.mongodb.com/docs/manual/tutorial/create-users/)