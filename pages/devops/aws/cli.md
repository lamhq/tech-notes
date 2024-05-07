# AWS CLI

## Installation (macOS)

1. Download the macOS [pkg file](https://awscli.amazonaws.com/AWSCLIV2.pkg)
2. Run your downloaded file and follow the on-screen instructions. You can choose to install the AWS CLI in the following ways:
    1. For all users on the computer (requires `sudo`)
    2. For only the current user (doesn't require `sudo`)
3. Verify:
    ```shell
    which aws
    aws --version
    ```
   
## Configure

### Set environment variables

You can set credentials for AWS CLI by set up these environment variables:

```shell
export AWS_ACCESS_KEY_ID=
export AWS_SECRET_ACCESS_KEY=
export AWS_DEFAULT_REGION=us-east-1
```

### Update AWS config 

Add the credentials for default profile to `~/.aws/credentials`:
``` filename="~/.aws/credentials"
[default]
aws_access_key_id = 
aws_secret_access_key = 
```

Update the `~/.aws/config` file:
``` filename="~/.aws/config"
[default]
region = us-east-1
```

## Export credentials to terminal

Use default profile:
```shell
eval $(aws configure export-credentials --format env)
```

Use a specific profile:
```shell
eval $(aws configure export-credentials --profile <profile_name> --format env)
```
