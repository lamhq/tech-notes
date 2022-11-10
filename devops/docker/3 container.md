### Run an image with a specific name
```
docker run --name container_name <image name>
```

### Map port

```shell
docker run -p host_port:container_port <image name>
```

### Map directory

```shell
docker run -v "$PWD":/path/in/container <image name>
```

### Run in detached mode

```shell
docker run -d <image name>
```

### Remove container after exit
```shell
docker run --rm <image name>
```

### Start one or more stopped containers

```shell
docker start <CONTAINER>
```

### Run and open terminal

```shell
docker run -it --entrypoint /bin/bash <image name>
```

### Open terminal in a running container

```shell
docker attach <container name>
docker exec -it <container name> /bin/bash
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
