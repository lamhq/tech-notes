# OpenAPI / Swagger

## Overview

You can quickly create your API by importing Swagger / OpenAPI 3.0 definitions (written in YAML or JSON).

You can export Swagger / OpenAPI 3.0 definition from your API.

You can generate platform-specific SDKs for your REST APIs. 


## Request validation

API Gateway can perform basic validation of API requests before proceeding with integration requests. If validation fails, a 400 error response is returned to the client, reducing unnecessary backend calls.

Validations include:
- Request payload adhere to a configured JSON schema
- Required request parameters, query strings, headers

To eetup request validation:
1. Prepare OpenAPI definition file
2. Use the `x-amazon-apigateway-request-validators` object to define your validators
3. Use the `x-amazon-apigateway-request-validator` property to apply a validator to the entire API or specific methods.

```json
{
  "openapi": "3.0.0",
  "info": {
    "title": "Request Validation Example",
    "version": "1.0"
  },
  "x-amazon-apigateway-request-validators": {
    "basic": {
      "validateRequestBody": true,
      "validateRequestParameters": true
    },
    "params-only": {
      "validateRequestBody": false,
      "validateRequestParameters": true
    }
  },
  "paths": {
    "/example": {
      "post": {
        "x-amazon-apigateway-request-validator": "params-only",
        "responses": {
          "200": {
            "description": "Successful response"
          }
        }
      }
    }
  }
}
```
