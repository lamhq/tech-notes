# Auto Scaling

## Service Auto Scaling

Amazon ECS service can optionally be configured to use Service Auto Scaling to adjust the desired task count up or down automatically.

Service Auto Scaling leverages the Application Auto Scaling service to provide this functionality.

Amazon ECS Service Auto Scaling supports the following types of scaling policies:

- **Target Tracking** Scaling Policies: increase or decrease the number of tasks that your service runs based on a target value for a specific CloudWatch metric. This is similar to the way that your thermostat maintains the temperature of your home. You select temperature and the thermostat does the rest.
- **Step Scaling** Policies: increase or decrease the number of tasks that your service runs in response to CloudWatch alarms. Step scaling is based on a set of scaling adjustments, known as step adjustments, which vary based on the size of the alarm breach.
- **Scheduled Scaling**: increase or decrease the number of tasks that your service runs based on the date and time.

![](https://digitalcloud.training/wp-content/uploads/2022/01/amazon-ecs-service-auto-scaling-1.jpeg)


## Cluster Auto Scaling

Uses an Amazon ECS resource type called a Capacity Provider.

A Capacity Provider can be associated with an EC2 Auto Scaling Group (ASG).

When you associate an ECS Capacity Provider with an ASG and add the Capacity Provider to an ECS cluster, the cluster can now scale your ASG automatically by using two new features of ECS:

- **Managed scaling**: with an automatically created scaling policy on your ASG, and a new scaling metric (Capacity Provider Reservation) that the scaling policy uses
- **Managed instance termination protection**: which enables container-aware termination of instances in the ASG when scale-in happens.

![](https://digitalcloud.training/wp-content/uploads/2022/01/word-image-1.png)