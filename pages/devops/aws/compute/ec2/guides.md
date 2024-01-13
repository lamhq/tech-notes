# Guides

## Attach IAM Role to an EC2 Instance

In AWS Management Console
1. Navigate to EC2 > Instances.
1. Select the EC2 instance.
1. Click `Actions` > `Security` > `Modify IAM role`.


## Determine the identity currently being used for an EC2 instance

1. Open a terminal connected to the EC2 instance
1. Run the command: `aws sts get-caller-identity`
1. Check content of the field `Arn`


## Migrate EC2 instances to another region

To migrate EC2 instances to another region, follow these step:
1. Create a snapshot
1. Copy the snapshot to another region
1. Create an AMI image from the copied snapshot
1. Go to [Amazon EC2 console]((https://console.aws.amazon.com/ec2/)) > **Images** > **AMIs**, select an image and click `Launch instance from AMI`

To copy a snapshot to another region:

1. Open the [Amazon EC2 console]((https://console.aws.amazon.com/ec2/)).
2. In the navigation pane, choose **Snapshots**.
3. Select the snapshot you want to copy, and then choose **Actions**, **Copy snapshot**.
4. In the **Copy Snapshot** dialog box, enter a brief description for the snapshot copy in the **Description** field.
5. Choose the destination region for the snapshot copy from the **Destination region** drop-down list.
6. Choose the encryption key to use for the snapshot copy from the **Encryption key** drop-down list.
7. Choose **Copy**.

Please note that you can only copy snapshots that have a **completed** status.
