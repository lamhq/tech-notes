### Create

```js
var AWS = require("aws-sdk");
AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});
var docClient = new AWS.DynamoDB.DocumentClient();
var params = {
  TableName: "Movies",
  Item: {
    "year": 2015,
    "title": "The Big New Movie",
    "info": {
      "plot": "Nothing happens at all.",
      "rating": 0
    }
  }
};
console.log("Adding a new item...");
docClient.put(params, function (err, data) {
  if (err) {
    console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
  } else {
    console.log("Added item:", JSON.stringify(data, null, 2));
  }
});
```


### Read

```js
var params = {
  TableName: table,
  Key: {
    "year": year,
    "title": title
  }
};
docClient.get(params, function (err, data) {...});
```


### Update

```js
var params = {
  TableName: table,
  Key: {
    "year": year,
    "title": title
  },
  UpdateExpression: "set info.rating = :r, info.plot=:p, info.actors=:a",
  ExpressionAttributeValues: {
    ":r": 5.5,
    ":p": "Everything happens all at once.",
    ":a": ["Larry", "Moe", "Curly"]
  },
  ReturnValues: "UPDATED_NEW"
};
docClient.update(params, function (err, data) {...});
```

### Delete

```js
var params = {
  TableName: table,
  Key: {
    "year": year,
    "title": title
  },
  ConditionExpression: "info.rating <= :val",
  ExpressionAttributeValues: {
    ":val": 5.0
  }
};
docClient.delete(params, function (err, data) {...});
```

### Increment/Decrement

```js
var params = {
  TableName: table,
  Key: {
    "year": year,
    "title": title
  },
  UpdateExpression: "set info.rating = info.rating + :val",
  ExpressionAttributeValues: {
    ":val": 1
  },
  ReturnValues: "UPDATED_NEW"
};
docClient.update(params, function (err, data) {...);
```


### Conditionally update

```js
var params = {
  TableName: table,
  Key: {
    "year": year,
    "title": title
  },
  UpdateExpression: "remove info.actors[0]",
  ConditionExpression: "size(info.actors) >= :num",
  ExpressionAttributeValues: {
    ":num": 3
  },
  ReturnValues: "UPDATED_NEW"
};
docClient.update(params, function (err, data) {...});
```

