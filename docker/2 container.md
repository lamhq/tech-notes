### Run container and map port

```shell
docker run -p 4000:80 <image name>
```

### Run container in detached mode

```shell
docker run -d -p 4000:80 <image name>
```

### Run container and go into terminal

```shell
docker run -it --entrypoint /bin/bash <image name>
```

### Start one or more stopped containers

```shell
docker start <CONTAINER>
```

### SSH into a running container

```shell
docker exec -it <container name> /bin/bash
```

### List machines

```shell
docker-machine ls
```

### Get the IP address of one or more machines
```shell
docker-machine ip <machine name>
```

### List all running containers

```shell
docker container ls
```

### List all containers, even those not running

```shell
docker container ls -a
```

### Gracefully stop the specified container

```shell
docker container stop <Container NAME or ID>
```

### Force shutdown of the specified container

```shell
docker container kill <Container NAME or ID>
```

### Remove specified container from this machine

```shell
docker container rm <Container NAME or ID>
```

### Remove all containers

```shell
docker container rm $(docker container ls -a -q)
```
