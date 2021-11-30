# class-validator

## Installation

```shell
yarn add class-validator
```


## Usage

```ts
import {
  validateOrReject,
  Contains,
  IsInt,
  Length,
  IsEmail,
  IsFQDN,
  IsDate,
  Min,
  Max,
} from 'class-validator';

export class Post {
  @Length(10, 20)
  title: string;

  @Contains('hello')
  text: string;

  @IsInt()
  @Min(0)
  @Max(10)
  rating: number;

  @IsEmail()
  email: string;

  @IsFQDN()
  site: string;

  @IsDate()
  createDate: Date;
}

const post = new Post();
post.title = 'Hello'; // should not pass
post.text = 'this is a great post about hell world'; // should not pass
post.rating = 11; // should not pass
post.email = 'google.com'; // should not pass
post.site = 'googlecom'; // should not pass

async function validateOrRejectExample(input) {
  try {
    await validateOrReject(input, {
      whitelist: true,
    });
  } catch (errors) {
    console.log('Caught promise rejection (validation failed). Errors: ', errors);
  }
}
```


## Validate options

The `validate` function optionally expects a `ValidatorOptions` object as a second parameter:

```ts
export interface ValidatorOptions {
  skipMissingProperties?: boolean;
  whitelist?: boolean;
  forbidNonWhitelisted?: boolean;
  groups?: string[];
  dismissDefaultMessages?: boolean;
  validationError?: {
    target?: boolean;
    value?: boolean;
  };
  forbidUnknownValues?: boolean;
}
```

- `whitelist`: This will strip all properties that don't have any decorators.
- `forbidNonWhitelisted`: throw error when any non-whitelisted properties are present (instead of stripping)
- `skipMissingProperties`: skip validation of the properties that do not exist in the validating object
- `groups`: validation group
- `validationError.target`: expose target in validation errors
- `validationError.value`: expose value in validation errors

If no other decorator is suitable for your property, you can use `@Allow` decorator:

```ts
export class Post {
  @Allow()
  title: string;
}
```

`@IsDefined()` is the only decorator that ignores `skipMissingProperties` option.


## Validation errors

The `validate` method returns an array of `ValidationError` objects.

```ts
{
  target: Object; // Object that was validated.
  property: string; // Object's property that haven't pass validation.
  value: any; // Value that haven't pass a validation.
  constraints?: { // Constraints that failed validation with error messages.
    [type: string]: string;
  };
  children?: ValidationError[]; // Contains all nested validation errors of the property
}
```


## Specify validation message

```ts
import { MinLength, MaxLength } from "class-validator";

export class Post {

  @MinLength(10, { // here, $constraint1 will be replaced with "10", and $value with actual supplied value
    message: "Title is too short. Minimal length is $constraint1 characters, but actual is $value"
  })
  @MaxLength(50, { // here, $constraint1 will be replaced with "50", and $value with actual supplied value
    message: "Title is too long. Maximal length is $constraint1 characters, but actual is $value"
  })
  title: string;
}
```

There are few special tokens you can use in your messages:

- `$value`: the value that is being validated
- `$property`: name of the object's property being validated
- `$target`: name of the object's class being validated
- `$constraint1, $constraint2, ... $constraintN`: constraints defined by specific validation type

Also you can provide a function, that returns a message:

```ts
import { MinLength, ValidationArguments } from 'class-validator';

export class Post {
  @MinLength(10, {
    message: (args: ValidationArguments) => {
      if (args.value.length === 1) {
        return 'Too short, minimum length is 1 character';
      }
      return `Too short, minimum length is ${args.constraints[0]} characters`;
    },
  })
  title: string;
}
```

Message function accepts `ValidationArguments` which contains the following information:

- value: the value that is being validated
- constraints: array of constraints defined by specific validation type
- targetName: name of the object's class being validated
- object: object that is being validated
- property: name of the object's property being validated


## Validating arrays

If your field is an array and you want to perform validation of each item in the array you must specify a special `each: true` decorator option:

```ts
import { MaxLength } from 'class-validator';

export class Post {
  @MaxLength(20, {
    each: true,
  })
  tags: string[];
}
```


## Validating nested objects

If your object contains nested objects and you want the validator to perform their validation too, then you need to use the `@ValidateNested()` decorator:

```ts
import { ValidateNested } from 'class-validator';

export class Post {
  @ValidateNested()
  user: User;
}
```


## Validating promises

If your object contains property with Promise-returned value that should be validated, then you need to use the `@ValidatePromise()` decorator:

```ts
import { ValidatePromise, Min } from 'class-validator';

export class Post {
  @Min(0)
  @ValidatePromise()
  userId: Promise<number>;
}
```


## Conditional validation

```ts
import { ValidateIf, IsNotEmpty } from 'class-validator';

export class Post {
  otherProperty: string;

  @ValidateIf(o => o.otherProperty === 'value')
  @IsNotEmpty()
  example: string;
}
```


## Passing data to validation error

```ts
import { validate, MinLength } from 'class-validator';

class MyClass {
  @MinLength(32, {
    message: 'EIC code must be at least 32 characters',
    context: {
      errorCode: 1003,
      developerNote: 'The validated string must contain 32 or more characters.',
    },
  })
  eicCode: string;
}

const model = new MyClass();

validate(model).then(errors => {
  // errors[0].contexts['minLength'].errorCode === 1003
});
```


## Validation groups

In different situations you may want to use different validation schemas of the same object. In such cases you can use validation groups:

```ts
import { validate, Min, Length } from 'class-validator';

export class User {
  @Min(12, {
    groups: ['registration'],
  })
  age: number;

  @Length(2, 20, {
    groups: ['registration', 'admin'],
  })
  name: string;
}

const user = new User();
user.age = 10;
user.name = 'Alex';

validate(user, {
  groups: ['registration'],
}); // this will not pass validation

validate(user, {
  groups: ['admin'],
}); // this will pass validation

validate(user, {
  groups: ['registration', 'admin'],
}); // this will not pass validation

validate(user, {
  groups: undefined, // the default
}); // this will not pass validation since all properties get validated regardless of their groups

validate(user, {
  groups: [],
}); // this will not pass validation, (equivalent to 'groups: undefined', see above)
```

There is also a special flag `always: true` in validation options that you can use. This flag says that this validation must be applied always no matter which group is used.


## Custom validation classes

```ts
import { Validate } from 'class-validator';
import { CustomTextLength } from './CustomTextLength';

export class Post {
  @Validate(CustomTextLength, [3, 20], {
    message: 'Title is too short or long!',
  })
  title: string;
}
```

```ts
// CustomTextLength.ts
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({
  // validation constraint name, this name will be used as "error type" in ValidationError
  name: 'customText',
  // custom validator can be asynchronous
  async: false,
})
export class CustomTextLength implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    // for async validations you must return a Promise<boolean> here
    return text.length > 1 && text.length < 10;
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'Text ($value) is too short or too long!';
  }
}
```


## Custom validation decorators

```ts
import { IsLongerThan } from './IsLongerThan';

export class Post {
  title: string;

  @IsLongerThan('title', {
    /* you can also use additional validation options, like "groups" in your custom validation decorators. "each" is not supported */
    message: 'Text must be longer than the title',
  })
  text: string;
}
```

```ts
// IsLongerThan
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsLongerThan(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isLongerThan',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return (
            typeof value === 'string' &&
            typeof relatedValue === 'string' &&
            value.length > relatedValue.length
          ); // you can return a Promise<boolean> here as well, if you want to make async validation
        },
      },
    });
  };
}
```

Use `ValidationConstraint` in custom decorator:

```ts
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator";

@ValidatorConstraint({ async: true })
export class IsUserAlreadyExistConstraint implements ValidatorConstraintInterface {
  validate(userName: any, args: ValidationArguments) {
    return UserRepository.findOneByName(userName).then(user => {
      if (user) return false;
      return true;
    });
  }

}

export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserAlreadyExistConstraint
    });
  };
}

// user.entity.ts
import { IsUserAlreadyExist } from "./IsUserAlreadyExist";

export class User {
  @IsUserAlreadyExist({
    message: "User $value already exists. Choose another name."
  })
  name: string;
}
```


## Validation decorators

### Common validation decorators

| Decorator                                       | Description                                                                                                                      |
|-------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| `@IsDefined(value: any)`                        | Checks if value is defined (!== undefined, !== null). This is the only decorator that ignores skipMissingProperties option.      |
| `@IsOptional()`                                 | Checks if given value is empty (=== null, === undefined) and if so, ignores all the validators on the property.                         |
| `@Equals(comparison: any)`                      | Checks if value equals ("===") comparison.                                                                                       |
| `@NotEquals(comparison: any)`                   | Checks if value not equal ("!==") comparison.                                                                                    |
| `@IsEmpty()`                                    | Checks if given value is empty (=== '', === null, === undefined).                                                                |
| `@IsNotEmpty()`                                 | Checks if given value is not empty (!== '', !== null, !== undefined).                                                            |
| `@IsIn(values: any[])`                          | Checks if value is in a array of allowed values.                                                                                 |
| `@IsNotIn(values: any[])`                       | Checks if value is not in a array of disallowed values.                                                                          |


### Type validation decorators

| Decorator                                       | Description                                                                                                                      |
|-------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| `@IsBoolean()`                                  | Checks if a value is a boolean.                                                                                                  |
| `@IsDate()`                                     | Checks if the value is a date.                                                                                                   |
| `@IsString()`                                   | Checks if the string is a string.                                                                                                |
| `@IsNumber(options: IsNumberOptions)`           | Checks if the value is a number.                                                                                                 |
| `@IsInt()`                                      | Checks if the value is an integer number.                                                                                        |
| `@IsArray()`                                    | Checks if the value is an array                                                                                                  |
| `@IsEnum(entity: object)`                         | Checks if the value is an valid enum                                                                                           |


### Number validation decorators

| Decorator                                       | Description                                                                                                                      |
|-------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| `@IsDivisibleBy(num: number)`                   | Checks if the value is a number that's divisible by another.                                                                     |
| `@IsPositive()`                                 | Checks if the value is a positive number greater than zero.                                                                                        |
| `@IsNegative()`                                 | Checks if the value is a negative number smaller than zero.                                                                                        |
| `@Min(min: number)`                             | Checks if the given number is greater than or equal to given number.                                                             |
| `@Max(max: number)`                             | Checks if the given number is less than or equal to given number.                                                                |


### Date validation decorators

| Decorator                                       | Description                                                                                                                      |
|-------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| `@MinDate(date: Date)`                          | Checks if the value is a date that's after the specified date.                                                                   |
| `@MaxDate(date: Date)`                          | Checks if the value is a date that's before the specified date.                                                                  |


### String-type validation decorators

| Decorator                                       | Description                                                                                                                      |
|-------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| `@IsBooleanString()`                            | Checks if a string is a boolean (e.g. is "true" or "false").                                                                     |
| `@IsDateString()`                               | Checks if a string is a complete representation of a date (e.g. "2017-06-07T14:34:08.700Z", "2017-06-07T14:34:08.700 or "2017-06-07T14:34:08+04:00").                                                                                                    |
| `@IsNumberString(options?: IsNumericOptions)`   | Checks if a string is a number.                                                                                                  |


### String validation decorators

| Decorator                                       | Description                                                                                                                      |
|-------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| `@Contains(seed: string)`                       | Checks if the string contains the seed.                                                                                          |
| `@NotContains(seed: string)`                    | Checks if the string not contains the seed.                                                                                      |
| `@IsAlpha()`                                    | Checks if the string contains only letters (a-zA-Z).                                                                             |
| `@IsAlphanumeric()`                             | Checks if the string contains only letters and numbers.
| `@IsDecimal(options?: IsDecimalOptions)`        | Checks if the string is a valid decimal value. Default IsDecimalOptions are `force_decimal=False`, `decimal_digits: '1,'`, `locale: 'en-US',`                                                                             |
| `@IsAscii()`                                    | Checks if the string contains ASCII chars only.                                                                                  |
| `@IsBase32()`                                   | Checks if a string is base32 encoded.                                                                                            |
| `@IsBase64()`                                   | Checks if a string is base64 encoded.                                                                                            |
| `@IsIBAN()`                                     | Checks if a string is a IBAN (International Bank Account Number).                                                                |
| `@IsBIC()`                                      | Checks if a string is a BIC (Bank Identification Code) or SWIFT code.                                                            |
| `@IsByteLength(min: number, max?: number)`      | Checks if the string's length (in bytes) falls in a range.                                                                       |
| `@IsCreditCard()`                               | Checks if the string is a credit card.                                                                                           |
| `@IsCurrency(options?: IsCurrencyOptions)`      | Checks if the string is a valid currency amount.                                                                                 |
| `@IsEthereumAddress()`                          | Checks if the string is an Ethereum address using basic regex. Does not validate address checksums.                              |
| `@IsBtcAddress()`                               | Checks if the string is a valid BTC address.                                                                                     |
| `@IsDataURI()`                                  | Checks if the string is a data uri format.                                                                                       |
| `@IsEmail(options?: IsEmailOptions)`            | Checks if the string is an email.                                                                                                |
| `@IsFQDN(options?: IsFQDNOptions)`              | Checks if the string is a fully qualified domain name (e.g. domain.com).                                                         |
| `@IsFullWidth()`                                | Checks if the string contains any full-width chars.                                                                              |
| `@IsHalfWidth()`                                | Checks if the string contains any half-width chars.                                                                              |
| `@IsVariableWidth()`                            | Checks if the string contains a mixture of full and half-width chars.                                                            |
| `@IsHexColor()`                                 | Checks if the string is a hexadecimal color.                                                                                     |
| `@IsHSLColor()`                                 | Checks if the string is an HSL (hue, saturation, lightness, optional alpha) color based on [CSS Colors Level 4 specification](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value).          |
| `@IsRgbColor(options?: IsRgbOptions)`           | Checks if the string is a rgb or rgba color.                                                                                     |
| `@IsIdentityCard(locale?: string)`              | Checks if the string is a valid identity card code.                                                                              |
| `@IsPassportNumber(countryCode?: string)`       | Checks if the string is a valid passport number relative to a specific country code.                                             |
| `@IsPostalCode(locale?: string)`                | Checks if the string is a postal code.                                                                                           |
| `@IsHexadecimal()`                              | Checks if the string is a hexadecimal number.                                                                                    |
| `@IsOctal()`                                    | Checks if the string is a octal number.                                                                                          |
| `@IsMACAddress(options?: IsMACAddressOptions)`  | Checks if the string is a MAC Address.                                                                                            |
| `@IsIP(version?: "4"\|"6")`                     | Checks if the string is an IP (version 4 or 6).                                                                                  |
| `@IsPort()`                                     | Check if the string is a valid port number.                                                                                      |
| `@IsISBN(version?: "10"\|"13")`                 | Checks if the string is an ISBN (version 10 or 13).                                                                              |
| `@IsEAN()`                                      | Checks if the string is an if the string is an EAN (European Article Number).                                                    |
| `@IsISIN()`                                     | Checks if the string is an ISIN (stock/security identifier).                                                                     |
| `@IsISO8601(options?: IsISO8601Options)`        | Checks if the string is a valid ISO 8601 date. Use the option strict = true for additional checks for a valid date, e.g. invalidates dates like 2019-02-29.                                                                               |
| `@IsJSON()`                                     | Checks if the string is valid JSON.                                                                                              |
| `@IsJWT()`                                      | Checks if the string is valid JWT.                                                                                                |
| `@IsObject()`                                   | Checks if the object is valid Object (null, functions, arrays will return false).                                                                                              |
| `@IsNotEmptyObject()`                           | Checks if the object is not empty.                                                                                              |
| `@IsLowercase()`                                | Checks if the string is lowercase.                                                                                               |
| `@IsLatLong()`                                  | Checks if the string is a valid latitude-longitude coordinate in the format lat,long                                             |
| `@IsLatitude()`                                 | Checks if the string or number is a valid latitude coordinate                                                                    |
| `@IsLongitude()`                                | Checks if the string or number is a valid longitude coordinate                                                                   |
| `@IsMobilePhone(locale: string)`                | Checks if the string is a mobile phone number.                                                                                   |
| `@IsISO31661Alpha2()`                           | Checks if the string is a valid [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) officially assigned country code.                                                                                 |
| `@IsISO31661Alpha3()`                           | Checks if the string is a valid [ISO 3166-1 alpha-3](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3) officially assigned country code.                                                                                 |
| `@IsLocale()`                                   | Checks if the string is a locale.                                                                                                |
| `@IsPhoneNumber(region: string)`                | Checks if the string is a valid phone number. "region" accepts 2 characters uppercase country code (e.g. DE, US, CH).If users must enter the intl. prefix (e.g. +41), then you may pass "ZZ" or null as region. See [google-libphonenumber, metadata.js:countryCodeToRegionCodeMap on github](https://github.com/ruimarinho/google-libphonenumber/blob/1e46138878cff479aafe2ce62175c6c49cb58720/src/metadata.js#L33)                                                                                  |
| `@IsMongoId()`                                  | Checks if the string is a valid hex-encoded representation of a MongoDB ObjectId.                                                |
| `@IsMultibyte()`                                | Checks if the string contains one or more multibyte chars.                                                                       |
| `@IsNumberString(options?: IsNumericOptions)`   | Checks if the string is numeric.                                                                                                 |
| `@IsSurrogatePair()`                            | Checks if the string contains any surrogate pairs chars.                                                                         |
| `@IsUrl(options?: IsURLOptions)`                | Checks if the string is an url.                                                                                                  |
| `@IsMagnetURI()`                                | Checks if the string is a [magnet uri format](https://en.wikipedia.org/wiki/Magnet_URI_scheme).                                  |
| `@IsUUID(version?: "3"\|"4"\|"5"\|"all")`              | Checks if the string is a UUID (version 3, 4, 5 or all ).                                                                              |
| `@IsFirebasePushId()`                                   | Checks if the string is a [Firebase Push id](https://firebase.googleblog.com/2015/02/the-2120-ways-to-ensure-unique_68.html)                                                                                      |
| `@IsUppercase()`                                | Checks if the string is uppercase.                                                                                               |
| `@Length(min: number, max?: number)`            | Checks if the string's length falls in a range.                                                                                  |
| `@MinLength(min: number)`                       | Checks if the string's length is not less than given number.                                                                     |
| `@MaxLength(max: number)`                       | Checks if the string's length is not more than given number.                                                                     |
| `@Matches(pattern: RegExp, modifiers?: string)` | Checks if string matches the pattern. Either matches('foo', /foo/i) or matches('foo', 'foo', 'i').
| `@IsMilitaryTime()`                             | Checks if the string is a valid representation of military time in the format HH:MM.                                         |
| `@IsHash(algorithm: string)`                    | Checks if the string is a hash of type algorithm. <br/><br/>Algorithm is one of `['md4', 'md5', 'sha1', 'sha256', 'sha384', 'sha512', 'ripemd128', 'ripemd160', 'tiger128', 'tiger160', 'tiger192', 'crc32', 'crc32b']`                                                                                 |
| `@IsMimeType()`                                 | Checks if the string matches to a valid [MIME type](https://en.wikipedia.org/wiki/Media_type) format                             |
| `@IsSemVer()`                                   | Checks if the string is a Semantic Versioning Specification (SemVer).                                                            |
| `@IsISSN(options?: IsISSNOptions)`              | Checks if the string is a ISSN.                                                                                                  |
| `@IsISRC()`                                     | Checks if the string is a [ISRC](https://en.wikipedia.org/wiki/International_Standard_Recording_Code).                           |
| `@IsRFC3339()`                                  | Checks f the string is a valid [RFC 3339](https://tools.ietf.org/html/rfc3339) date.                                             |


### Array validation decorators

| Decorator                                       | Description                                                                                                                      |
|-------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| `@ArrayContains(values: any[])`                 | Checks if array contains all values from the given array of values.                                                           |
| `@ArrayNotContains(values: any[])`              | Checks if array does not contain any of the given values.                                                                        |
| `@ArrayNotEmpty()`                              | Checks if given array is not empty.                                                                                              |
| `@ArrayMinSize(min: number)`                    | Checks if array's length is as minimal this number.                                                                              |
| `@ArrayMaxSize(max: number)`                    | Checks if array's length is as maximal this number.                                                                              |
| `@ArrayUnique()`                                | Checks if all array's values are unique. Comparison for objects is reference-based.                                       |


### Object validation decorators

| Decorator                                       | Description                                                                                                                      |
|-------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| `@IsInstance(value: any)`                       | Checks if the property is an instance of the passed value.                                                                       |


### Other decorators

| Decorator                                       | Description                                                                                                                      |
|-------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| `@Allow()`                       | Prevent stripping off the property when no other constraint is specified for it.                                                                       |
