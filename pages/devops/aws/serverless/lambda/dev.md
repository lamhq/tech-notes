# Development

## Building Lambda Apps

You can deploy and manage your serverless applications using the AWS Serverless Application Model (AWS SAM).

AWS SAM is a specification that prescribes the rules for expressing serverless applications on AWS.

You can automate your serverless application’s release process using AWS CodePipeline and AWS CodeDeploy.

You can enable your Lambda function for tracing with AWS X-Ray.


## Function Dependencies

If your Lambda function depends on external libraries such as AWS X-Ray SDK, database clients etc. you need to install the packages with the code and zip it all up.

Upload the zip file straight to Lambda if it's less than 50MB, otherwise upload to S3.

AWS SDK comes with every Lambda function by default.


## Lambda Aliases

Lambda aliases are pointers to a specific Lambda version.

Using an alias you can invoke a function without having to know which version of the function is being referenced.

Aliases are mutable.

Aliases enable stable configuration of event triggers / destinations.

Aliases also have static ARNs but can point to any version of the same function.

Aliases can also be used to split traffic between Lambda versions (blue/green).

Aliases enable blue green deployment by assigning weights to Lambda version (doesn’t work for `$LATEST`, you need to create an alias for `$LATEST`).


## Lambda Versions

You can have multiple versions of your function.

The function version includes the following information:
- The function code and all associated dependencies.
- The Lambda runtime that executes the function.
- All the function settings, including the environment variables.
- A unique Amazon Resource Name (ARN) to identify this version of the function.

You work on `$LATEST` which is the latest version of the code – this is mutable (changeable). When you’re ready to publish a Lambda function you create a version (these are numbered).

Numbered versions are assigned a number starting with `1` and subsequent versions are incremented by `1`.

Each version has its own ARN. This allows you to effectively manage them for different environments like Production, Staging or Development.

A qualified ARN has a version suffix.

An unqualified ARN does not have a version suffix.

You cannot create an alias from an unqualified ARN.
