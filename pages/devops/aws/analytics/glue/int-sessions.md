# Interactive sessions

## Overview

With Amazon Glue interactive sessions, you can create, test, and run data preparation and analytics applications.

These sessions offer both a programmatic and visual interface for building and testing ETL scripts


## Pricing

Interactive Sessions is charged based on the time the session is active and the number of DPUs.

Require a minimum of 2 DPUs and have a default of 5 DPU

There is a 1-minute minimum billing duration for each provisioned Interactive Session


## Linitations

- Currently not available in same regions
- Job bookmarks are not supported
- Creating notebook jobs using the AWS LI is not supported.


## Setting up interactive sessions locally

Install packages:
```sh
pip3 install --upgrade jupyter boto3 aws-glue-sessions         
```

Install kernels for pyspark and spark:
```sh
install-glue-kernels  	          
```

Run a local Jupyter session:
```sh
jupyter notebook
```

Copy the URL from command output to the browser to access Jupyter Notebook.
```
http://localhost:8888/tree?token=???
```

## Configuring session credentials and region

Configure AWS credentials with magic command:
```sh
!aws configure set aws_access_key_id ''
!aws configure set aws_secret_access_key ''
```

Configuring a session role:
```sh
%iam_role <Glue_Service_Role_ARN>
```

Configure a region:
```sh
%region <region>
```


## Using Microsoft Visual Studio Code

1. Disable Jupyter AutoStart in VS Code: Open Settings, find **Jupyter: Disable Jupyter Auto Start**
2. Start a Jupyter Notebook server and copy the URL
3. Click on **Select Kernel**. Select **Existing Jupyter Server....** Paste the URL you copied from the step above.
4. Choose the **Glue PySpark** or **Glue Spark kernel**
