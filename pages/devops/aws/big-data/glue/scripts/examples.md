# Example Scripts

## Loading data from S3

Create a dataframe from a json file and display the dataframe schema:
```py
from pyspark.context import SparkContext
from awsglue.context import GlueContext

glue_context = GlueContext(SparkContext.getOrCreate())
df = glue_context.create_dynamic_frame.from_options(
    connection_type='s3',
    connection_options={
        'paths': ['s3://awsglue-datasets/examples/us-legislators/all/persons.json'],
        'recurse': True
    },
    format='json'
)
df.printSchema()
```

## ETL Workload

Load data from an AWS Glue Data Catalog table, drop some columns, and save output to an S3 bucket named `glue-output-465`.

```py
from awsglue.transforms import *
from pyspark.context import SparkContext
from awsglue.context import GlueContext

sc = SparkContext.getOrCreate()
glueContext = GlueContext(sc)
spark = glueContext.spark_session

# Script generated for node AWS Glue Data Catalog
AWSGlueDataCatalog_node1714991609823 = glueContext.create_dynamic_frame.from_catalog(database="test-flights-db", table_name="flight-scsv", transformation_ctx="AWSGlueDataCatalog_node1714991609823")

# Script generated for node Change Schema
ChangeSchema_node1714991735966 = ApplyMapping.apply(frame=AWSGlueDataCatalog_node1714991609823, mappings=[("year", "long", "new_year", "long")], transformation_ctx="ChangeSchema_node1714991735966")

# Script generated for node Amazon S3
AmazonS3_node1714991962369 = glueContext.getSink(path="s3://glue-output-465", connection_type="s3", updateBehavior="UPDATE_IN_DATABASE", partitionKeys=[], enableUpdateCatalog=True, transformation_ctx="AmazonS3_node1714991962369")
AmazonS3_node1714991962369.setCatalogInfo(catalogDatabase="test-flights-db",catalogTableName="flight-output")
AmazonS3_node1714991962369.setFormat("csv")
AmazonS3_node1714991962369.writeFrame(ChangeSchema_node1714991735966)
```
