### Dockerfile

```conf
# Use an official Python runtime as a parent image
FROM python:2.7-slim

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
ADD . /app

# Install any needed packages specified in requirements.txt
RUN pip install --trusted-host pypi.python.org -r requirements.txt

# Make port 80 available to the world outside this container
EXPOSE 80

# Define environment variable
ENV NAME World

# Run app.py when the container launches
CMD ["python", "app.py"]
```

### Basic commands

```shell
# Build docker image
docker build -t image_name .

# Run container with port mapping, assign name
docker run -p host_port:container_port --name container_name image_name 

# Run & interactive bash shell in the container
docker run -it --entrypoint /bin/bash image_name

# Start an interactive bash shell in a running container
docker exec -it container_name /bin/bash

# Stop a container
docker container stop container_name

# Start a stopped container
docker start container_name

```

### Docker registry

```shell
# login to docker registry
docker login

# Tag image for upload to registry
docker tag image_name username/repository:tag

# Upload tagged image to registry
docker push username/repository:tag

# Pull an image in docker registry and run it
docker run username/repository:tag
```
