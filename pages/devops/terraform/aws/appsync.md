# AWS AppSync

## API

Define a GraphQL API:
```hcl
resource "aws_appsync_graphql_api" "appsync_api" {
  # Set the authentication type to AWS IAM
  authentication_type = "API_KEY"
  
  # Specify the name of the GraphQL API
  name                = "terraforming-appsync"

  # Reference the GraphQL schema from a local file path
  schema              = file("${path.module}/schema.graphql")

  # Configure logging for the GraphQL API
  log_config {
    # Provide the ARN of the IAM role for publishing logs to CloudWatch
    cloudwatch_logs_role_arn = aws_iam_role.appsync_role.arn
    
    # Set the field logging level to log all request/response fields
    field_log_level          = "ALL"
    
    # Include verbose content such as headers, context, and evaluated mapping templates in logs
    exclude_verbose_content  = false
  }
}

output "graphql_endpoint" {
  value = aws_appsync_graphql_api.appsync_api.uris["GRAPHQL"]
}
```


## API Role

Define an IAM role for AWS AppSync. AppSync service will assume this role when perform actions on AWS resources (such as writting logs):
```hcl
resource "aws_iam_role" "appsync_role" {
  name = "appsync_role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "appsync.amazonaws.com"
        }
      },
    ]
  })
}
```


## Logging

Define a CloudWatch Logs Group that contains AppSync's logs:
```hcl
resource "aws_cloudwatch_log_group" "appsync_log_group" {
  name = "/aws/appsync/apis/${aws_appsync_graphql_api.appsync_api.id}"

  # Tag the log group with metadata indicating its purpose or association
  tags = {
    application = "appsync_log_group"
  }
}
```

Define the permission policy that allow AppSync service to writte to the log group:
```hcl
resource "aws_iam_role_policy" "write_appsync_log" {
  name   = "write_appsync_log"
  role   = aws_iam_role.appsync_role.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Effect   = "Allow"
        Resource = "${aws_cloudwatch_log_group.appsync_log_group.arn}:*"
      },
    ]
  })
}
```


## API Key

Define an API key:
```hcl
resource "aws_appsync_api_key" "api_key" {
  api_id  = aws_appsync_graphql_api.appsync_api.id
  expires = "2024-12-31T04:00:00Z"
}
```


## AppSync Data Source

Define an AppSync data source which connects the AppSync API to a Lambda function:

```hcl
resource "aws_appsync_datasource" "lambda_data_src" {
  # The ID of the associated AppSync GraphQL API
  api_id = aws_appsync_graphql_api.appsync_api.id

  # A user-defined name for the data source
  name = "lambda_data_src"

  # IAM service role ARN for the data source.
  service_role_arn = aws_iam_role.data_source_role.arn

  # Type of the data source, in this case an 'AWS_LAMBDA' type indicating a Lambda function as the backend
  type = "AWS_LAMBDA"

  lambda_config {
    # The ARN of the Lambda function that will be invoked by AppSync
    function_arn = aws_lambda_function.lambda_handler.arn
  }
}
```

### Role

Create an IAM role for an AppSync Data source.

```hcl
resource "aws_iam_role" "data_source_role" {
  name = "data_source_role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "appsync.amazonaws.com"
        }
      },
    ]
  })
}
```

Allow the data source to invoke Lambda functions:
```hcl
resource "aws_iam_role_policy" "invoke_lambda_handler" {
  name   = "invoke_lambda_handler"
  role   = aws_iam_role.data_source_role.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "lambda:InvokeFunction",
        ]
        Effect   = "Allow"
        Resource = aws_lambda_function.lambda_handler.arn
      },
    ]
  })
}
```


### Field Resolver

Defines an AppSync resolver for mapping a field of a GraphQL type to a Lambda function:
```hcl
resource "aws_appsync_resolver" "hello_world_resolver" {
  # The ID of the associated AWS AppSync GraphQL API to which this resolver belongs
  api_id            = aws_appsync_graphql_api.appsync_api.id

  # The field name that invokes this resolver when called in a GraphQL query
  field             = "helloWorldLambda"

  # The type of resolver, in this case it's for a 'Query' operation
  type              = "Query"

  # Data source name that is connected with this function
  data_source = aws_appsync_datasource.lambda_data_src.name
}
```
