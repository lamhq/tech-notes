### (Windows) Install MongoDB

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

#### Remove the MongoDB service

```
d:\program\MongoDB\bin\mongod.exe --remove
```


### (Ubuntu) Start/Stop MongoDB service

See: [https://www.howtoforge.com/tutorial/install-mongodb-on-ubuntu-16.04/](https://www.howtoforge.com/tutorial/install-mongodb-on-ubuntu-16.04/)

```bash
sudo systemctl daemon-reload
sudo systemctl start mongod
sudo systemctl enable mongod

// check mongodb is running
netstat -plntu
```


### (Ubuntu) Fix MongoDB service cannot start after installing

That is because mongodb does not have permissions on data directory (see mongo log)

To know where mongo config file was located, open the service configuration file `/lib/systemd/system/mongod.service`:

```
ExecStart=/usr/bin/mongod --config /etc/mongod.conf
```

To know where mongo log file and data directory was located, open mongo config file above `/etc/mongod.conf`:

```
storage:
  dbPath: /var/lib/mongodb

systemLog:
  path: /var/log/mongodb/mongod.log
```

Change owner of data directory `/var/lib/mongodb` to `mongodb` will fix the permission issue:

```bash
sudo chown -R mongodb:mongodb /var/lib/mongodb
```

How do i know to set the owner to `mongodb` ?, just view the owner of data directory

```bash
ls -l /var/lib/mongodb
```