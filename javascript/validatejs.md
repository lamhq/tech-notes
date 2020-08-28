## basic usage

```javascript
var validate = require("validate.js");

var constraints = {

  creditCardNumber: {
    presence: true,
    format: {
      pattern: /^(34|37|4|5[1-5]).*$/,
      message: function(value, attribute, validatorOptions, attributes, globalOptions) {
        return validate.format("^%{num} is not a valid credit card number", {
          num: value
        });
      }
    },
    length: function(value, attributes, attributeName, options, constraints) {
      if (value) {
        // Amex
        if ((/^(34|37).*$/).test(value)) return {is: 15};
        // Visa, Mastercard
        if ((/^(4|5[1-5]).*$/).test(value)) return {is: 16};
      }
      // Unknown card, don't validate length
      return false;
    }
  },
  creditCardZip: function(value, attributes, attributeName, options, constraints) {
    if (!(/^(34|37).*$/).test(attributes.creditCardNumber)) return null;
    return {
      presence: {message: "is required when using AMEX"},
      length: {is: 5}
    };
  }
};

validate({creditCardNumber: "4"}, constraints);
```


## async validate

```javascript
validate.validators.myAsyncValidator = function(value) {
  return new validate.Promise(function(resolve, reject) {
    setTimeout(function() {
      if (value === "foo")
        resolve();
      else
        resolve("is not foo");
    }, 100);
  });
};

var constraints = {
  name: {
    myAsyncValidator: true
  }
};

var success = alert.bind(this, "The validations passed");

var error = function(errors) {
  alert(JSON.stringify(errors, null, 2));
};

// Will call the success callback
validate.async({name: "foo"}, constraints).then(success, error);

// Will call the error callback with {name: ["Name is not foo"]} as the first argument
validate.async({name: "bar"}, constraints).then(success, error);
```


## custom validator

If the validator passes simply return `null` or `undefined`. Otherwise return a string or an array of strings containing the error message(s).

Make sure not to prepend the key name, this will be done automatically.

```javascript
validate.validators.custom = function(value, options, key, attributes) {
  console.log(value);
  console.log(options);
  console.log(key);
  console.log(attributes);
  return "is totally wrong";
};

validate({foo: "some value"}, {foo: {custom: "some options"}});
// => {foo: ["Foo is totally wrong"]}
// Will log:
//   - "some value"
//   - "some options"
//   - "foo"
//   - {"foo": "some value"}
```


## custom error message

Since validators don't include the argument name in the error message, the validate function prepends it for them. This behaviour can be disabled by setting the `fullMessages` option to `false`.

If you need an error not to be prefixed by the attribute add a leading `^` to the error and it won't be prepended. If you need to have a leading `^` but want the prefixing just write `\^`.

If you include `%{value}` in the error message it will be replaced with the actual value.

```javascript
var constraints = {
  username: {
    presence: {
      allowEmpty: false,
    },
    exclusion: {
      within: ["nicklas"],
      message: "'%{value}' is not allowed"
    }
  },
  password: {
    presence: true,
    length: {
      minimum: 6,
      message: "must be at least 6 characters"
    }
  }
};

validate({password: "better"}, constraints, {fullMessages: false});
// => {"username": ["can't be blank"]}

validate({}, {username: {presence: {message: "^You must pick a username"}}});
// => {"username": ["You must pick a username"]}
```


## Conditional Validation

```js
async function asyncValidate(data, constraint, validators = {}) {
  validate.Promise = global.Promise;
  // set custom error format
  validateJs.formatters.custom = formatErrors;

  // set custom validators
  Object.entries(validators).forEach(([name, func]) => {
    validateJs.validators[name] = func;
  });

  let errors;
  try {
    await validateJs.async(data, constraint, { format: 'custom' });
  } catch (err) {
    errors = err;
  }
  return errors;
}

async function validateProfileData(data, user) {
  // password validation
  function checkPassword(value) {
    if (value && !user.isPasswordValid(value)) {
      return '^updateProfile:wrongPassword';
    }
    return null;
  }

  // validation rules
  const constraints = {
    displayName: {
      presence: true,
      length: { minimum: 3, maximum: 30 },
    },
    email: {
      presence: {
        allowEmpty: false,
        message: '^common:requiredInput',
      },
      email: {
        message: '^common:invalidEmail',
      },
      emailNotExists: {
        user,
      },
    },
    newPassword: (value) => {
      // only validate when value is not empty
      return value ? {
        length: {
          minimum: 6,
          maximum: 30,
          tooLong: '^common:passwordTooLong',
          tooShort: '^common:passwordTooShort',
        },
      } : false;
    },
    currentPassword: (value, attributes) => {
      // only validate when password is not empty
      return attributes.newPassword ? {
        presence: {
          allowEmpty: false,
          message: '^common:requiredInput',
        },
        checkPassword: true,
      } : false;
    },
  };

  return asyncValidate(data, constraints, {
    emailNotExists: checkEmailNotExist,
    checkPassword,
  });
}
```