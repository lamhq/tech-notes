# AWS Lambda

## IAM Role

```hcl
# Role for Lambda function
resource "aws_iam_role" "lambda_role" {
  name = "${local.name_prefix}-lambda_role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

# Attach a AWS-managed policy `AWSLambdaBasicExecutionRole` to the role
resource "aws_iam_role_policy_attachment" "lambda_basic_exec_policy" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}
```


## Function

The below code:
- Create a Lambda function named `test_lambda_function`
- Package function code into a zip file
- Upload the zip file to an S3 bucket
- Define a Lambda function

```hcl
# Packaging function code to a zip archive
data "archive_file" "function_zip" {
  type        = "zip"
  source_dir  = "src/"
  output_path = "build/lambda.zip"
}

# Upload the archive to an S3 bucket
resource "aws_s3_object" "lambda_code" {
  bucket = var.artifact_bucket
  key    = "${local.name_prefix}/lambda-function.zip"
  source = data.archive_file.function_zip.output_path
  etag = filemd5(data.archive_file.function_zip.output_path)
}

# Create a lambda function
resource "aws_lambda_function" "get_data_function" {
  function_name    = "${local.name_prefix}-get-data"
  role             = aws_iam_role.lambda_role.arn

  s3_bucket = var.artifact_bucket
  s3_key    = aws_s3_object.lambda_code.key
  source_code_hash = data.archive_file.function_zip.output_base64sha256
  handler          = "get-data.lambda_handler"
  runtime          = "nodejs20.x"
  timeout          = 10
}
```


## Log group

Define a log group for an AWS Lambda function:

```hcl
# Create a CloudWatch log group
resource "aws_cloudwatch_log_group" "lambda_log_group" {
  name = "/aws/lambda/${aws_lambda_function.get_data_function.function_name}"
  tags = {
    application = "job_log_group"
  }
}
```

Name of the log group must follow the format: `/aws/lambda/{function_name}`.


## Layer

The below code:
- Install project dependencies to a directory
- Package project dependencies into a zip file
- Create a lambda layer with the zip file

```hcl
# install project dependencies
resource "terraform_data" "install_dependencies" {
  provisioner "local-exec" {
    command = "./install-deps.sh"
  }
  triggers_replace = [
    !fileexists("${var.build_dir}/requirements.txt")
  ]
}

# packaging dependencies to zip file
# equivalent to `cd ../layer && zip -r ../layer.zip python`
data "archive_file" "layer_zip" {
  type        = "zip"
  source_dir  = "../layer"
  output_path = "../layer.zip"
}

# create a lambda layer that contains all project dependencies
resource "aws_lambda_layer_version" "lambda_layer" {
  filename   = "../layer.zip"
  # source_code_hash = filebase64sha256("../layer.zip")
  source_code_hash = data.archive_file.layer_zip.output_base64sha256
  layer_name = "lambda_layer"
  compatible_runtimes = ["python3.9"]
}
```


## References

- [Deploy serverless applications with AWS Lambda and API Gateway](https://developer.hashicorp.com/terraform/tutorials/aws/lambda-api-gateway)