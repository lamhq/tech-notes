# Installing

## Download

```sh
curl -O https://s3.ap-southeast-1.amazonaws.com/dynamodb-local-singapore/dynamodb_local_latest.tar.gz
tar -xzvf dynamodb_local_latest.tar.gz -C ./dynamodb
```

## Start DynamoDB server locally

```sh
cd dynamodb
java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
```


## Test
```sh
aws dynamodb list-tables --endpoint-url http://localhost:8000
```

## Download sample data for testing

```sh
curl -O https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/samples/moviedata.zip
unzip moviedata.zip
```