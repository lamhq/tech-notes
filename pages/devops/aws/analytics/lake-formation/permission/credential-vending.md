# Credential Vending

Credential vending, or token vending is a common pattern that provides temporary credentials to users, services, or some other entity for the purposes of granting short term access to a resource.

When a principal is granted data location permission on a location, the IAM role associated with that location can be assumed to provide temporary access to S3 data.

Principles don’t need direct access to S3.

For example, Lake Formation leverages this pattern to allow Athena to access data on behalf of the user. 

1. **User** submits a query to an **integrated service** (Athena, Redshift Spectrum, ...)
2. **Check permissions**: the **integrated service** checks for authorization from Lake Formation for the requested table and columns.
3. **Get credentials**: If authorization succeeds, the **integrated service** retrieves temporary credentials from **Lake Formation** to access the data
4. **Get data**: the **integrated service** uses the temporary credentials to fetches objects from S3
5. Amazon S3 provides the S3 objects to the integrated service. The S3 objects contains all the data from the table.
6. The integrated service performs the necessary enforcement of Lake Formation policies, such as column level, row level and/or cell level filtering, then returns results back to the **user**.

![](https://docs.aws.amazon.com/images/lake-formation/latest/dg/images/storage-permissions-workflow.png)

For a full list of AWS services that integrate with Lake Formation, see [Working with other AWS services](https://docs.aws.amazon.com/lake-formation/latest/dg/working-with-services.html).