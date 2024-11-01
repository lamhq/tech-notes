# Image

## Build image

Builds a Docker image from the Dockerfile in the current directory:
```shell
docker build -t friendlyhello .
```
- `-t friendlyhello`: Tags the resulting image with the name `friendlyhello` for easy reference.
- `.`: Tells Docker to use the Dockerfile located in the current directory.


## List images

```shell
docker images
```


## Publish image

Log in this CLI session using your Docker credentials:
```shell
docker login
```

Tag the image for upload to registry:

```shell
docker tag <image> repository/image:tag
```

Upload tagged image to registry:

```shell
docker push repository/image:tag
```
