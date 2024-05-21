# ELB Components

![](https://digitalcloud.training/wp-content/uploads/2022/01/alb-listeners-targets-and-rules.jpeg)

The ELB service is made up of three main components:

## Target groups

Target groups are a logical grouping of targets that traffic is directed to.

Targets can be EC2 instances, ECS containers, IP addresses, Lambda functions, and other load balancers.

Only one protocol and one port can be defined per target group.

A single target can be in multiple target groups.

A health check needs to be defined for each target group.

A target group can only be associated with one load balancer.

You cannot use public IP addresses as targets.

You cannot mix different types within a target group (EC2, ECS, IP, Lambda function).

You can register the same EC2 instance or IP address with the same target group multiple times using different ports (used for routing requests to microservices).


## Listeners

Listeners define the port and protocol to listen on.

Each ALB needs at least one listener and can have up to 10.

Can add one or more listeners for a load balancer.

Cannot have the same port in multiple listeners.


## Rules

Rules determine how the load balancer routes requests to the targets in one or more target groups.

After the load balancer receives a request, it evaluates the listener rules in priority order to determine which rule to apply, and then selects a target from the target group for the rule action.

Each rule consists of a priority, actions, an optional host condition, and an optional path condition.

Rules are defined on listeners.

You can add rules that specify different target groups based on the content of the request (content-based routing).

Default rules:
- Default rules cannot have conditions.
- You cannot delete the default rule for a listener.
- If no conditions for any of a listener’s rules are met, the action for the default rule is taken.

Rule priority:
- Each rule has a priority, and they are evaluated in order of lowest to highest.
- The default rule is evaluated last.
- You can change the priority of a non-default rule.
- You cannot change the priority of the default rule.

Rule action:
- The only supported action type is forward, which forwards requests to the target group.
- You can change the target group for a rule.
