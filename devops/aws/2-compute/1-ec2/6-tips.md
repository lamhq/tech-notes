# EC2 Tips

## Attach IAM Role to an EC2 Instance

In AWS Management Console
1. Navigate to EC2 > Instances.
1. Select the EC2 instance.
1. Click `Actions` > `Security` > `Modify IAM role`.


## Determine the identity currently being used for an EC2 instance

1. Open a terminal connected to the EC2 instance
1. Run the command: `aws sts get-caller-identity`
1. Check content of the field `Arn`
