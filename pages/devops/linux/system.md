# Sytem tips

## Check os version

```sh
cat /etc/os-release
```

## Set server timezone

```sh
cd /etc
sudo rm localtime
sudo ln -s /usr/share/zoneinfo/Asia/Bangkok localtime
```
