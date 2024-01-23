# Security/SLA

IAM can be used to control access at the container level using IAM roles.

The container agent makes calls to the ECS API on your behalf through the applied IAM roles and policies (task excution role).

ECS tasks use an IAM role to access services and resources (task role).

Security groups attach at the instance or container level.
