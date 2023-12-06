# API authentication with IAM Role

Most AWS API calls require authentication via signing.

When making an HTTP request to AWS, signing the request is necessary.

IAM users have associated credentials (access key ID and secret access key) to sign requests. IAM roles are also identities in AWS that have associated credentials for signing requests.

The credentials for IAM roles are programmatically obtained, temporary, and rotated automatically. The roles assumed programmatically expire.

> When launching an EC2 instance, for instance, an IAM role is assigned that the application running on the virtual machine can assume to gain access to the temporary credentials needed for signing API calls.

Creating a role involves selecting a trusted entity that can assume the role.

When one AWS service sends an API call to another, role-based access is often used, where the AWS service assumes a role, gains access to temporary credentials, and sends the API call to the verifying AWS service.

IAM roles can also allow external identity providers to assume roles for AWS access. Federated users can be granted access through IAM roles, and AWS Single Sign-On can simplify the process.
