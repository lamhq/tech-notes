# Serverless

## Lambda function

The below code:
- Create a Lambda function named `test_lambda_function`
- Package function code into a zip file
- Refer a layer (declared in other place)

```hcl
# packaging function code to zip file
data "archive_file" "function_zip" {
  type        = "zip"
  source_dir  = "../"
  excludes    = [".venv", "build", "infra"]
  output_path = "../function.zip"
}

# create a lambda function
resource "aws_lambda_function" "my_function" {
  function_name    = "my-function"
  filename         = "../function.zip"
  source_code_hash = data.archive_file.function_zip.output_base64sha256
  role             = aws_iam_role.lambda_role.arn
  runtime          = "python3.9"
  handler          = "my_function.lambda_handler"
  timeout          = 10
  layers           = [aws_lambda_layer_version.lambda_layer.arn]
}
```


## Lambda Layer

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


## Log group

Define a log group for an AWS Lambda function:

```hcl
resource "aws_cloudwatch_log_group" "lambda_log_group" {
  name = "/aws/lambda/my-function"
  tags = {
    application = "job_log_group"
  }
}
```

Define permission to write log:
```hcl
resource "aws_iam_role" "lambda_role" {
  name = "lambda_role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      },
    ]
  })
  inline_policy {
    name = "trigger_permission"
    policy = jsonencode({
      Version = "2012-10-17"
      Statement = [
        {
          Action = [
            "logs:CreateLogStream",
            "logs:PutLogEvents"
          ]
          Effect   = "Allow"
          Resource = "${aws_cloudwatch_log_group.trigger_log_group.arn}:*"
        }        
      ]
    })
  }
}
```

The log group name must follow the format: `/aws/lambda/{function name}`