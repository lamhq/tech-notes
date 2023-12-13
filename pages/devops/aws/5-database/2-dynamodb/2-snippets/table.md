### Create table

```js
var AWS = require("aws-sdk");
AWS.config.update({
  accessKeyId: 'AKID',
  secretAccessKey: 'SECRET',
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});
var dynamodb = new AWS.DynamoDB();
var params = {
  TableName: "Movies",
  KeySchema: [
    { AttributeName: "year", KeyType: "HASH" },  //Partition key
    { AttributeName: "title", KeyType: "RANGE" }  //Sort key
  ],
  AttributeDefinitions: [
    { AttributeName: "year", AttributeType: "N" },
    { AttributeName: "title", AttributeType: "S" }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
};
dynamodb.createTable(params, function (err, data) {
  if (err) {
    console.error("Unable to create table. Error JSON:", JSON.stringify(err, null,
      2));
  } else {
    console.log("Created table. Table description JSON:", JSON.stringify(data,
      null, 2));
  }
});
```


### Create Index

```js
var AWS = require("aws-sdk");
AWS.config.update({
  accessKeyId: 'AKID',
  secretAccessKey: 'SECRET',
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});
var dynamodb = new AWS.DynamoDB();
var params = {
  TableName: "Music",
  AttributeDefinitions:[
    { AttributeName: "Genre", AttributeType: "S" },
    { AttributeName: "Price", AttributeType: "N" }
  ],
  GlobalSecondaryIndexUpdates: [
    {
      Create: {
        IndexName: "GenreAndPriceIndex", KeySchema: [
          { AttributeName: "Genre", KeyType: "HASH" }, //Partition key
          { AttributeName: "Price", KeyType: "RANGE" }, //Sort key
        ],
        Projection: {
          "ProjectionType": "ALL"
        },
      }
    }
  ]
};
dynamodb.updateTable(params, function (err, data) {
  if (err) {
    console.error("Unable to update table. Error JSON:", JSON.stringify(err, null,
      2));
  } else {
    console.log("Updated table. Table description JSON:", JSON.stringify(data,
      null, 2));
  }
});
```


### Delete table

```js
var params = {
  TableName: "Movies"
};
dynamodb.deleteTable(params, function (err, data) {
  if (err) {
    console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null,
      2));
  } else {
    console.log("Deleted table. Table description JSON:", JSON.stringify(data,
      null, 2));
  }
});
```