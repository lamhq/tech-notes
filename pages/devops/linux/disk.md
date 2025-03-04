# Disk management

## List directories with size
```sh
du --max-depth=1 -h | sort -h
```


## Show available disk space
```sh
df -h
```


## Tools to see what files are using up your disk space
```sh
sudo apt install ncdu
```

## Unmount a partition

```sh
sudo umount /data
```

## Add Amzon EFS to your file system

To add Amazon EFS file system, add this line to filesystem table file `/etc/fstab`:

```
10.0.0.24:/             /data    nfs4   nfsvers=4.1,rsize=1048576,wsize=1048576,hard,timeo=600,retrans=2,noresvport     0 0
```

The above line will add an EFS file system from the ip `10.0.0.24` to your system and access at `/data`

Run this command to apply the change:

```sh
sudo mount -a
```

Test the mounted path:

```sh
ls /data
```
