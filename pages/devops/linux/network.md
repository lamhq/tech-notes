# Network

## Port commands
```sh
# Check port is inuse
sudo lsof -i -P -n | grep LISTEN | grep 5432

# Find a process using a port
fuser 3002/tcp
lsof -i :3002

# Find and kill process by port
fuser -k 3002/tcp
kill -9 <PID>

# List all running processes and which port they are using
netstat -tulpn
```


## Get public ip

```sh
dig +short myip.opendns.com @resolver1.opendns.com
dig TXT +short o-o.myaddr.l.google.com @ns1.google.com
```
