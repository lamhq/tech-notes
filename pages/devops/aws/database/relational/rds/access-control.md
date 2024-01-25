# Authorization and Access Control

## Authentication with IAM

Amazon RDS supports identity-based policies using IAM.

You use an authentication token to connect to a DB instance.

IAM database authentication works with MySQL and PostgreSQL. 

### Steps

1. Enable IAM Database Authentication on the MySQL RDS instance
2. Create an IAM Role for RDS access
3. Associate the IAM role with a database user in RDS
4. Download the certificate bundle for the AWS Region where the RDS database resides and import this into the EC2 instance used for the application
5. Modify the parameter group for the MySQL RDS instance to set the `require_secure_transport` parameter to `ON`.


### Benefits

Network traffic to and from the database is encrypted using Secure Sockets Layer (SSL).

You can use IAM to centrally manage access to your database resources, instead of managing access individually on each DB instance.

For applications running on Amazon EC2, you can use **profile credentials** specific to your EC2 instance (via an authentication token) to access your database instead of a password, for greater security.
