# Integration

## Elastic Beanstalk

You can use **Elastic Beanstalk** to handle the provisioning of an Amazon ECS cluster, load balancing, auto-scaling, monitoring, and placing your containers across your cluster, or use ECS directly for more fine-grained control 

There are two options: Single and Multi- Docker container mode.

### Single Container Docker

The single container platform can be used to deploy a Docker image and source code to EC2 instances running in an Elastic Beanstalk environment.

Use the single container platform when you only need to run one container per instance.

### Multi-container Docker

The other basic platform, Multicontainer Docker, uses the Amazon ECSto coordinate the deployment of multiple Docker containers to an Amazon ECS cluster in an Elastic Beanstalk environment.

The instances in the environment each run the same set of containers, which are defined in a `Dockerrun.aws.json` file.

Use the multicontainer platform when you need to deploy multiple Docker containers to each instance.


## Elastic Load Balancer

You can associate a service on Amazon ECS to an ALB. ALB supports a target group that contains a set of instance ports. 

The ALB supports a target group that contains a set of instance ports.

You can specify a dynamic port in the ECS task definition which gives the container an unused port when it is scheduled on the EC2 instance (this is specific to ALB only).

![](https://digitalcloud.training/wp-content/uploads/2022/01/amazon-ecs-with-application-load-balancer-alb-1.jpeg)


## X-Ray

There are two ways to run X-Ray:

- As a daemon: X-Ray agent runs in a daemon container.
- As a “sidecar”: X-Ray runs alongside each container.

For Fargate the X-Ray daemon only runs as a sidecar.

![](https://digitalcloud.training/wp-content/uploads/2022/01/amazon-ecs-with-aws-x-ray-daemon-1.jpeg)

Task definition:

- X-Ray runs on port 2000 UDP.
- Must specify the daemon address.
- Must link the containers together.

X-Ray provides a Docker container image that you can deploy alongside your application:

```sh
docker pull amazon/aws-xray-daemon
```