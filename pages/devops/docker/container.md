# Container

## Start a container for testing

```shell
docker run --rm -it --entrypoint /bin/bash <image_name>
```

- `--rm`: removes the container after it exits
- `-it` makes the container interactive with a terminal
- `--entrypoint /bin/bash` sets Bash as the entry point

Use cases:
- **Development**: Running scripts or testing applications in an isolated environment.
- **Debugging**: Inspecting a container's filesystem or environment variables to troubleshoot issues.


## Start and mount directories

```shell
docker run \
  --name <container_name> \
  -p host_port:container_port \
  -v "$PWD":/path/in/container \
  -d <image_name>
```
- `--name <container_name>`: Names the container for easy reference.
- `-p host_port:container_port`: Maps a port on the host to a port in the container, enabling communication.
- `-v "$PWD":/path/in/container:` Mounts the current working directory (`$PWD`) to a specified path inside the container.
- `-d`: Runs the container in the background.


## Connect to a container

Open terminal in a running container:
```shell
docker exec -it <container_name> /bin/bash
```

## List containers

List running containers:
```shell
docker ps
```

List all containers:
```shell
docker ps -a
```

## Stop a container

Gracefully stop the specified container
```shell
docker container stop <container_name or ID>
```

Force shutdown a specified container:
```shell
docker container kill <container_name or ID>
```

## Start a stopped container
```shell
docker start container_name
```
