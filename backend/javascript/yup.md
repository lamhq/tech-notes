# Yup - object schema validator

**We shouldn't use this library since its features do not cover our usecases, and it is not flexible.**

[https://github.com/jquense/yup](https://github.com/jquense/yup)

## Basic

```js
const { object, string, number, date } = require('yup')

const contactSchema = object({
  name: string()
    .required(),
  age: number()
    .required()
    .positive()
    .integer(),
  email: string()
    .email(),
  website: string()
    .url(),
  createdOn: date()
    .default(() => new Date())
})

await contactSchema.validate(contact)
```


## Custom validation
```js
import * as yup from 'yup';

const schema = {
  username: Yup.string()
    .min(3, 'A minimum of 3 characters is required')
    .max(40, 'Maximum allowed characters is 40')
    .test('test-name', 'Validation failure message', function (value) {
      const { path, createError } = this;
      // custom validation code...
      return createError({ path, message: myFailureMessage });
    })
    .required('Please fill out this field'),
}

schema.validate(data).
  catch(err => {
    const errors = {};
    for (let i of err.inner)
      errors[i.path] = i.message; // { propName: 'error msg' }
    return errors;
  });
```


## Custom validation (reusable)

```js
Yup.addMethod(Yup.type, 'methodName', function (anyArgsYouNeed) {
  const { message } = anyArgsYouNeed;
  return this.test('test-name', message, function (value) {
    const { path, createError } = this;
    const { some, more, args } = anyArgsYouNeed;
    // [value] - value of the property being tested
    // [path]  - property name,
    // ...
    return someCondition || conditionTwo || createError({ path, message: myFailureMessage });
  });
});

const schema = {
  name: Yup.string().required('Please enter your name!'),
  location: Yup.string()
    .matches(/regex/, 'Please enter the correct phone number!')
    .methodName(..., 'Custom validation failure message')
    .required('This field is required.'),
}
```


## Async validation
```js
Yup.addMethod(Yup.mixed, 'methodName', function (yourArgs) {
  return this.test('methodName', message, function (value) {
    // ...
    return new Promise((resolve, reject) => {
      if (someCondition)
        reject(createError({ path, message }));
      else
        resolve(true);
    });
  });
});
```