### Purging All Unused or Dangling Images, Containers, Volumes, and Networks
```
docker system prune
```

### Remove image
```
# Remove single image
docker rmi image_id

# List dangling images
docker images -f dangling=true

# Remove dangling images
docker images purge

# Removing images according to a pattern
docker images -a | grep "pattern" | awk '{print $3}' | xargs docker rmi

# Remove all images
docker rmi $(docker images -a -q)
```

### Remove container

```
# List all containers
docker ps -a

# Remove container
docker rm container_name

# Run and remove a container upon exit
docker run --rm image_name

# Remove a container and its volume
docker rm -v container_name

# Remove all exited containers
docker rm $(docker ps -a -f status=exited -q)

# Remove containers using more than one filter
docker rm $(docker ps -a -f status=exited -f status=created -q)

# Remove containers according to a pattern
docker ps -a | grep "pattern" | awk '{print $3}' | xargs docker rmi

# Stop and remove all containers
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
```

### Removing Volumes
```
# Remove volume
docker volume rm volume_name volume_name

# List dangling volumes
docker volume ls -f dangling=true

# Remove dangling volumes
docker volume prune
```

### References: 
- [https://rominirani.com/docker-tutorial-series-part-7-data-volumes-93073a1b5b72](https://rominirani.com/docker-tutorial-series-part-7-data-volumes-93073a1b5b72)