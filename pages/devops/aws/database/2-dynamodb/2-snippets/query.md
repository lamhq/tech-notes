### ConditionExpression

```js
var params = {
  TableName: table,
  Key: {
    "year": year,
    "title": title
  },
  ConditionExpression: "size(info.actors) >= :num",
  ExpressionAttributeValues: {
    ":num": 3
  },
  ReturnValues: "UPDATED_NEW"
};
docClient.update(params, function (err, data) {...});
```
