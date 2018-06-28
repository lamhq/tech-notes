```
pm.test("response is ok", function () {
  pm.response.to.have.status(200);

  var jsonData = pm.response.json();
  pm.expect(jsonData.value).to.eql(100);
});
```