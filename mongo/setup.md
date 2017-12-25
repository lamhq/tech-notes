### Install MongoDB as window service

#### Create a configuration file

Create file `d:\program\MongoDB\mongod.cfg`

__mongod.cfg__

```
systemLog:
    destination: file
    path: d:\htdocs\_mongo\mongod.log
storage:
    dbPath: d:\htdocs\_mongo
```

Run the following command in Command Prompt with "Administrative Privileges".

#### Install the MongoDB service

```
d:\program\MongoDB\bin\mongod.exe --config "d:\program\MongoDB\mongod.cfg" --install
```

#### Start the MongoDB service

```
net start MongoDB
```

### Remove the MongoDB service

```
d:\program\MongoDB\bin\mongod.exe --remove
```