# AWS Glue

## Crawler

IAM Role:
```hcl
resource "aws_iam_role" "crawler_role" {
  name = "customer-crawler-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "glue.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "crawler_role_policies" {
  role       = aws_iam_role.crawler_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSGlueServiceRole"
}

resource "aws_iam_role_policy" "crawler_inline_policy" {
  role = aws_iam_role.crawler_role.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action = [
          "lakeformation:GetDataAccess",
          "lakeformation:GrantPermissions"
        ]
        Resource = "*"
      }
    ]
  })
}
```


Define a crawler with 2 data sources:
```hcl
resource "aws_glue_crawler" "crawler" {
  database_name = aws_glue_catalog_database.source_db.name
  name          = "customer-crawler"
  role          = aws_iam_role.crawler_role.arn

  lake_formation_configuration {
    use_lake_formation_credentials = true
  }

  s3_target {
    path = "s3://test-bucket/source/customers"
  }

  s3_target {
    path = "s3://test-bucket/source/products"
  }

  schema_change_policy {
    delete_behavior = "DELETE_FROM_DATABASE"
    update_behavior = "UPDATE_IN_DATABASE"
  }
}
```


## Job

IAM Role:
```hcl
resource "aws_iam_role" "glue_job_role" {
  name = "glue-job-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "glue.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "glue_job_role_policies" {
  role       = aws_iam_role.glue_job_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSGlueServiceRole"
}

resource "aws_iam_role_policy" "glue_job_inline_policy" {
  role = aws_iam_role.glue_job_role.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action = [
          "lakeformation:GetDataAccess",
          "lakeformation:GrantPermissions"
        ]
        Resource = "*"
      },
      {
        Effect   = "Allow"
        Action = [
          "s3:PutObject"
        ]
        Resource = "arn:aws:s3:::test-bucket/target/*"
      }
    ]
  })
}
```

Define a Glue job with code stored in S3:
```hcl
resource "aws_glue_job" "transform_job" {
  name     = "transform-data-job"
  role_arn = aws_iam_role.glue_job_role.arn
  worker_type = "Standard"
  number_of_workers = 1
  glue_version = "4.0"

  default_arguments = {
    "--enable-continuous-cloudwatch-log" = "true"
    "--enable-continuous-log-filter"     = "true"
    "--enable-metrics"                   = "true"
    "--enable-job-insights"              = "true"
  }

  command {
    script_location = "s3://test-bucket/glue-job/transform-data-job.py"
    python_version = "3"
  }
}
```
