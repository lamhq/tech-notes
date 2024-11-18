# AWS Lake Formation

## Database

```hcl
resource "aws_glue_catalog_database" "source_db" {
  name = "source_db"
}
```


## Data lake location

IAM Role:
```hcl
resource "aws_iam_role" "location_role" {
  name = "location-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "lakeformation.amazonaws.com"
      }
    }]
  })
}
```

Role's policy:
```hcl
resource "aws_iam_role_policy" "location_role_inline_policy" {
  role = aws_iam_role.location_role.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action = [
          "s3:GetObject"
        ]
        Resource = "arn:aws:s3:::test-bucket/source/*"
      },
      {
        Effect   = "Allow"
        Action = [
          "s3:ListBucket"
        ]
        Resource = "arn:aws:s3:::test-bucket"
      }    
    ]
  })
}
```

Register an S3 location:
```hcl
resource "aws_lakeformation_resource" "source_location" {
  arn = "arn:aws:s3:::test-bucket/source"
  role_arn = aws_iam_role.location_role.arn
  hybrid_access_enabled = false
}
```


## Grant data location access

```hcl
resource "aws_lakeformation_permissions" "glue_crawler_source_location_permission" {
  principal   = aws_iam_role.glue_crawler_role.arn
  permissions = ["DATA_LOCATION_ACCESS"]

  data_location {
    arn = aws_lakeformation_resource.source_location.arn
  }
}
```


## Grant meta data access

```hcl
resource "aws_lakeformation_permissions" "glue_crawler_catalog_permissions" {
  principal = aws_iam_role.glue_crawler_role.arn
  permissions = ["CREATE_TABLE"]
  database {
    name = aws_glue_catalog_database.source_db.name
  }
}
```
