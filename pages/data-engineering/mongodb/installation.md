## Installation

Install MongoDB Community Edition for local development (macOS 11 or later).


## Requirements

1. Install Xcode Command-Line Tools
2. Install Homebrew


## Steps

Download Homebrew formula for MongoDB (repository of installation scripts):
```sh
brew tap mongodb/brew
```

Update Homebrew:
```sh
brew update
```

Install MongoDB:
```sh
brew install mongodb-community@8.0
```

Run MongoDB manually as a background process:
```sh
mongod --config /opt/homebrew/etc/mongod.conf --fork
```

Verify that MongoDB is running:
```sh
ps aux | grep -v grep | grep mongod
```


## Connect and use
```sh
mongosh
```


## Create an user administrator

```sh
mongosh --authenticationDatabase "admin"
```

```sh
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

```sh
db.adminCommand({ shutdown: 1 })
```


## References

- [Install MongoDB Community Edition on macOS](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x).
- [Create a User on Self-Managed Deployments](https://www.mongodb.com/docs/manual/tutorial/create-users/)