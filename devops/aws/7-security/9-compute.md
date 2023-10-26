# Protecting Compute Resources

## Securing Amazon EC2 Instances

### Least Access

Restrict server access from both the network and on the instance, install only the required OS components and applications, and leverage host-based protection software.

### Least Privilege

Define the minimum set of privileges each server needs in order to perform its function.

### Configuration Management

Create a baseline server configuration and track each server as a configuration item.

Assess each server against the current recorded baseline to identify and flag any deviations.

Ensure each server is configured to generate and securely store appropriate log and audit data.

### Change Management

Create processes to control changes to server configuration baselines.

### Audit Logs

Audit access and all changes to EC2 instances to verify server integrity to ensure only authorized changes are made.

https://aws.amazon.com/answers/security/aws-securing-ec2-instances/