### Concepts

#### Task definition

- Container definition: image, memory (required if ec2), portMappings, healthCheck, environment, logConfiguration
- Task Role
- Network Mode: bridge, awsvpc (required if Fargate), host
- Volumes
- Launch Types: FARGATE, EC2
- Task Size: total cpu and memory used for the task

#### Service

- Number of desired tasks
- Security Group
- ApplicationLoadBalancer

#### Cluster

An Amazon ECS cluster is a logical grouping of tasks or services. 

Clusters are region-specific.

Clusters can contain tasks using both the Fargate and EC2 launch types.


### Fargate

AWS Fargate is a technology that you can use with Amazon ECS to run containers without having to manage servers or clusters of EC2 instances

AWS Fargate with Amazon ECS is currently only available in the following regions: US East (N. Virginia), US East (Ohio), US West (Oregon), EU West (Ireland), Asia Pacific (Tokyo)

Fargate task definitions require that the network mode is set to awsvpc. The awsvpc network mode provides each task with its own elastic network interface. When you run a task or create a service with this network mode, you must specify one or more subnets to attach the network interface and one or more security groups to apply to the network interface.

Fargate task definitions require that you specify CPU and memory at the task level

Fargate task definitions only support the awslogs log driver for the log configuration

Task storage is ephemeral. After a Fargate task stops, the storage is deleted.

Services with tasks that use the awsvpc network mode (for example, those with the Fargate launch type) only support Application Load Balancers and Network Load Balancers.

### Push your image to Amazon Elastic Container Registry

```bash
aws ecr create-repository --repository-name <repoName>
docker tag hello-world <repositoryUri>
aws ecr get-login --no-include-email
// docker login ...
docker push <repositoryUri>
```

### Register a task definition with the hello-world image

1. Create a file called *hello-world-task-def.json*

```json
{
  "family": "hello-world",
  "requiresCompatibilities": [
    "FARGATE"
  ],
  "networkMode": "awsvpc",
  "containerDefinitions": [
    {
      "name": "hello-world",
      "image": "aws_account_id.dkr.ecr.us-east-1.amazonaws.com/hello-world",
      "cpu": 10,
      "memory": 500,
      "portMappings": [
        {
          "containerPort": 80,
          "hostPort": 80
        }
      ],
      "entryPoint": [
        "/usr/sbin/apache2",
        "-D",
        "FOREGROUND"
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "test-log",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "api"
        }
      },
      "environment": [],
      "essential": true
    }
  ]
}
```

2. Register a task definition with the *hello-world-task-def.json* file

```bash
aws ecs register-task-definition --cli-input-json file://hello-world-task-def.json

aws ecs create-cluster --cluster-name test-cluster

aws logs create-log-group --log-group-name test-log

aws ecs create-service --cluster test-cluster --service-name test-service --task-definition hello-world:latest --desired-count 1 --launch-type "FARGATE" --network-configuration "awsvpcConfiguration={subnets=[subnet-8f0fdfc5],securityGroups=[sg-0c7754adb2c02617b],assignPublicIp=ENABLED}"
```

3. Cleanup

```bash
aws ecs update-service --cluster test-cluster --service test-service --desired-count 0
aws ecs delete-service --cluster test-cluster --service test-service
aws ecs deregister-container-instance --cluster  test-cluster --container-instance container_instance_id --force
aws ecs delete-cluster --cluster test-cluster
```

4. Other useful commands

```bash
aws ecs list-task-definitions
aws ecs list-services --cluster test-cluster
aws ecs update-service --cluster test-cluster --service test-service --task-definition hello-world:latest
aws ecs describe-services --cluster test-cluster --services test-service
```