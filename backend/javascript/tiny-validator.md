### Reference

- [Validating Data With JSON-Schema, Part 1](https://code.tutsplus.com/tutorials/validating-data-with-json-schema-part-1--cms-25343)
- [Tiny Validator for JSON Schema v4](https://github.com/geraintluff/tv4)

### install

````
yarn add tv4
````

### Snippets

``` javascript
const tv4 = require('tv4');

var schema = {
  type: 'object',
  required: ['token'],
  properties: {
    token: {
      type: 'object',
      required: ['value'],
      properties: {
        value: { type: 'string' },
        expireAt: { type: 'string' }
      },
    },
    user: {
      type: 'object',
      properties: {
        _id: { type: 'string' },
        username: { type: 'string' },
        email: { type: 'string' },
        status: { type: 'string' },
        userType: { type: 'string' },
        createdAt: { type: 'string' }
      }
    }
  }
};

var data = {
  token: {
    value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1OWIzOWJjZjUzOGZmNjA2YzA0ZDEyZGIiLCJpYXQiOjE1MzA0MjkxOTksImV4cCI6MTUzMzAyMTE5OX0.8_g_cVJbuDk-lZQrSotCtn2fOCKox_SQn19fficwXSI',
    expireAt: '2018-07-31T07:13:19.924Z'
  },
  user: {
    _id: '59b39bcf538ff606c04d12db',
    username: 'admin',
    email: 'daibanglam@gmail.com',
    status: 'Active',
    userType: 'admin',
    createdAt: '2017-09-21T14:25:59.734Z',
    firstname: 'Lam',
    lastname: 'Huynh',
    updatedAt: '2018-07-01T06:39:48.054Z'
  }
};

console.log("data 1: " + tv4.validate(data, schema));
console.log(tv4.error);
```