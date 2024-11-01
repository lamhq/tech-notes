# Clean up

## Clean up Docker system

Remove all unused/dangling images, containers, volumes, networks
```
docker system prune
```

## Remove image
Remove a single image:
```shell
docker rmi <image_id>
```

Remove dangling images:
```shell
docker images purge
```

Remove all images:
```shell
docker rmi $(docker images -a -q)
```


## Remove container

Remove a container and its volume:
```shell
docker container -v rm <container_name or ID>
```

Stop and remove all containers:
```shell
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
```
