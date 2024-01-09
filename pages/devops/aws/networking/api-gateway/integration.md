# Integration

## Overview

Integration lets an API expose AWS service actions.

You must configure:
- integration request and integration response 
- set up data mappings from the method request to the integration request
- set up data mappings from the integration response to the method response.


## AWS_PROXY Integration

This integration, aka Lambda proxy integration, relies on direct interactions between the client and the integrated Lambda function.

You do not set the integration request or the integration response. API Gateway passes the incoming request from the client as the input to the backend Lambda function.

The integrated Lambda function takes the input in a specified [input format](https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format) and return result follow the [output format](https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-output-format).

![](https://digitalcloud.training/wp-content/uploads/2022/01/amazon-api-gateway-integration-lambda-proxy.jpeg)


## HTTP Integration

This type of integration lets an API expose HTTP endpoints in the backend.

You must configure both the integration request and integration response.

You must set up necessary data mappings from the method request to the integration request, and from the integration response to the method response.


## HTTP_PROXY Integration

Allows a client to access the backend HTTP endpoints with a streamlined integration setup on single API method.

You do not set the integration request or the integration response.

API Gateway passes the incoming request from the client to the HTTP endpoint and passes the outgoing response from the HTTP endpoint to the client.


## MOCK Integration

Lets API Gateway return a response without sending the request further to the backend.

Useful for API testing

In collaborative development, a team can isolate their development effort by setting up simulations of API components owned by other teams by using the MOCK integrations.
