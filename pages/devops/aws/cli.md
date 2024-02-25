# AWS CLI

## Install or update the AWS CLI (macOS)

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

```shell
export AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
export AWS_SECRET_ACCESS_KEY=wJalrXUtn...
export AWS_DEFAULT_REGION=us-east-1
```
