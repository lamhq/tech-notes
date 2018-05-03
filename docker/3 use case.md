### Dockerfile for GraphicsMagick and NodeJs
```
# Use an official Node runtime as a parent image
FROM node:8.9

# Installing graphicsmagick
RUN apt-get update
RUN apt-get -y install graphicsmagick
```

### build graphicsmagick docker image
```shell
docker build -t graphicsmagick .
```

### push docker image to docker store
```shell
docker tag graphicsmagick lamhq/graphicsmagick:171114
docker push lamhq/graphicsmagick:171114
```

### update Dockerfile of compose image app to use graphicsmagick image
```shell
FROM docker.io/lamhq/graphicsmagick:171114
```

### build docker image for compose image app (base on image lamhq/graphicsmagick)

### push docker image to gitlab

```shell
docker tag jds-compose-image-worker registry.gitlab.com/lamhq/jds-compose-image-worker
docker push registry.gitlab.com/lamhq/jds-compose-image-worker
```

### pull docker image from gitlab

```shell
docker pull registry.gitlab.com/lamhq/jds-compose-image-worker
```
