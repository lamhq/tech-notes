# AWS Lambda Function

## Update function code

```sh
git archive --format zip --output my-function.zip HEAD

aws lambda update-function-code \
  --function-name GetStartedLambdaProxyIntegration \
  --zip-file fileb://my-function.zip
```

## Best practices for working with AWS Lambda functions

- Separate the Lambda handler from your core logic. This allows you to make a more unit-testable function.

```js
exports.myHandler = function(event, context, callback) {
	var foo = event.foo;
	var bar = event.bar;
	var result = MyLambdaFunction (foo, bar);

	callback(null, result);
}

function MyLambdaFunction (foo, bar) {
	// MyLambdaFunction logic here
}
```

- Initialize SDK clients and database connections outside of the function handler, and cache static assets locally in the `/tmp` directory.
- Use environment variables to pass operational parameters to your function.
- Minimize your deployment package size to its runtime necessities
- Avoid using recursive code
- Performance testing your Lambda function. Analyzing the `Max Memory Used:` field to determine if your function needs more memory or if you over-provisioned your function's memory size.
- Use most-restrictive permissions when setting IAM policies.
- Delete Lambda functions that you are no longer using.


## Using AWS Lambda with Amazon API Gateway

A Lambda integration maps a path and HTTP method combination to a Lambda function.

Amazon API Gateway invokes your function synchronously with an event that contains a JSON representation of the HTTP request. For a **custom integration**, the event is the body of the request. For a **proxy integration**, the event has a defined structure.

The following example shows a proxy event from an API Gateway REST API:

```json
{
    "resource": "/",
    "path": "/",
    "httpMethod": "GET",
    "requestContext": {
        "resourcePath": "/",
        "httpMethod": "GET",
        "path": "/Prod/",
        ...
    },
    "headers": {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-encoding": "gzip, deflate, br",
        "Host": "70ixmpl4fl.execute-api.us-east-2.amazonaws.com",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36",
        "X-Amzn-Trace-Id": "Root=1-5e66d96f-7491f09xmpl79d18acf3d050",
        ...
    },
    "multiValueHeaders": {
        "accept": [
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"
        ],
        "accept-encoding": [
            "gzip, deflate, br"
        ],
        ...
    },
    "queryStringParameters": null,
    "multiValueQueryStringParameters": null,
    "pathParameters": null,
    "stageVariables": null,
    "body": null,
    "isBase64Encoded": false
}
```

API Gateway waits for a response from your function and relays the result to the caller. For a **custom integration**, you define an integration response and a method response to convert the output from the function to an HTTP response. For a **proxy integration**, the function must respond with a representation of the response in a specific format.

```js
// Proxy integration response object (Node.js)
var response = {
  "statusCode": 200,
  "headers": {
    "Content-Type": "application/json"
  },
  "isBase64Encoded": false,
  "multiValueHeaders": {
    "X-Custom-Header": ["My value", "My other value"],
  },
  "body": "{\n  \"TotalCodeSize\": 104330022,\n  \"FunctionCount\": 26\n}"
}
```

The Lambda runtime serializes the response object into JSON and sends it to the API. The API parses the response and uses it to create an HTTP response, which it then sends to the client that made the original request.

To customize the error response, you must catch errors in your code and format a response in the required format:

```js
var formatError = function(error){
  var response = {
    "statusCode": error.statusCode,
    "headers": {
      "Content-Type": "text/plain",
      "x-amzn-ErrorType": error.code
    },
    "isBase64Encoded": false,
    "body": error.code + ": " + error.message
  }
  return response
}
```

API Gateway supports three types of APIs that invoke Lambda functions:

- **HTTP API** – A lightweight, low-latency RESTful API.
- **REST API** – A customizable, feature-rich RESTful API.
- **WebSocket API** – A web API that maintains persistent connections with clients for full-duplex communication.

REST APIs currently have more customization, integration, and management features.

REST API features:

- Integration types – REST APIs support custom Lambda integrations. With a custom integration, you can send just the body of the request to the function, or apply a transform template to the request body before sending it to the function.
- Access control – REST APIs support more options for authentication and authorization.
- Monitoring and tracing – REST APIs support AWS X-Ray tracing and additional logging options.


## Building Lambda functions with Node.js

```js
exports.handler =  async function(event, context) {
  console.log("EVENT: \n" + JSON.stringify(event, null, 2))
  return context.logStreamName
}
```

The runtime passes three arguments to the handler method. The first argument is the event object, which contains information from the invoker. The invoker passes this information as a JSON-formatted string when it calls Invoke, and the runtime converts it to an object. When an AWS service invokes your function, the event structure varies by service.

The second argument is the context object, which contains information about the invocation, function, and execution environment.

For async handlers, you return a response, error, or promise to the runtime instead of using `callback`.

When Lambda runs your function, it passes a context object to the handler. This object provides methods and properties that provide information about the invocation, function, and execution environment.

Context properties and methods:

- getRemainingTimeInMillis
- functionName
- functionVersion
- memoryLimitInMB
- awsRequestId – The identifier of the invocation request
- invokedFunctionArn – The Amazon Resource Name (ARN) that's used to invoke the function.

The runtime sends details about each invocation to the log stream, and relays logs and other output from your function's code.

Report Log Format:

- RequestId – The unique request ID for the invocation.
- Duration – The amount of time that your function's handler method spent processing the event.
- Billed Duration – The amount of time billed for the invocation.
- Memory Size – The amount of memory allocated to the function.
- Max Memory Used – The amount of memory used by the function.
- Init Duration – For the first request served, the amount of time it took the runtime to load the function and run code outside of the handler method.
- XRAY TraceId – For traced requests, the AWS X-Ray trace ID.
- SegmentId – For traced requests, the X-Ray segment ID.
- Sampled – For traced requests, the sampling result.

```
START RequestId: c793869b-ee49-115b-a5b6-4fd21e8dedac Version: $LATEST
2019-06-07T19:11:20.562Z	c793869b-ee49-115b-a5b6-4fd21e8dedac	INFO	ENVIRONMENT VARIABLES
{
  "AWS_LAMBDA_FUNCTION_VERSION": "$LATEST",
  "AWS_LAMBDA_LOG_GROUP_NAME": "/aws/lambda/my-function",
  "AWS_LAMBDA_LOG_STREAM_NAME": "2019/06/07/[$LATEST]e6f4a0c4241adcd70c262d34c0bbc85c",
  "AWS_EXECUTION_ENV": "AWS_Lambda_nodejs12.x",
  "AWS_LAMBDA_FUNCTION_NAME": "my-function",
  "PATH": "/var/lang/bin:/usr/local/bin:/usr/bin/:/bin:/opt/bin",
  "NODE_PATH": "/opt/nodejs/node10/node_modules:/opt/nodejs/node_modules:/var/runtime/node_modules",
  ...
}
2019-06-07T19:11:20.563Z	c793869b-ee49-115b-a5b6-4fd21e8dedac	INFO	EVENT
{
  "key": "value"
}
2019-06-07T19:11:20.564Z	c793869b-ee49-115b-a5b6-4fd21e8dedac	WARN	Event not processed.
END RequestId: c793869b-ee49-115b-a5b6-4fd21e8dedac
REPORT RequestId: c793869b-ee49-115b-a5b6-4fd21e8dedac	Duration: 128.83 ms	Billed Duration: 200 ms	Memory Size: 128 MB	Max Memory Used: 74 MB	Init Duration: 166.62 ms	XRAY TraceId: 1-5d9d007f-0a8c7fd02xmpl480aed55ef0	SegmentId: 3d752xmpl1bbe37e	Sampled: true
```

## Monitoring and troubleshooting Lambda applications

AWS Lambda automatically monitors Lambda functions on your behalf and reports metrics through Amazon CloudWatch. To help you monitor your code as it executes, Lambda automatically tracks the number of requests, the execution duration per request, and the number of requests that result in an error.

Each time your function is invoked, Lambda records metrics for the request, the function's response, and the overall state of the function. You can use metrics to set alarms the are triggered when function performance degrades, or when you are close to hitting concurrency limits in the current Region.

To debug and validate that your code is working as expected, you can output logs with the standard logging functionality for your programming language. The Lambda runtime uploads your function's log output to CloudWatch Logs

To monitor a function:

- Open the Lambda console Functions page.
- Choose a function.
- Choose Monitoring.

## Sample Event

```js
const event = {
  httpMethod: 'GET',
  body: '{\n  "loginId": "admin1@mailinator.com",\n  "password": "123123"\n}',
  resource: '/admin/users',
  requestContext: {
    resourceId: '123456',
    apiId: '1234567890',
    resourcePath: '/admin/users',
    httpMethod: 'GET',
    requestId: 'c6af9ac6-7b61-11e6-9a41-93e8deadbeef',
    accountId: '123456789012',
    stage: 'Prod',
    identity: {
      apiKey: null,
      userArn: null,
      cognitoAuthenticationType: null,
      caller: null,
      userAgent: 'Custom User Agent String',
      user: null,
      cognitoIdentityPoolId: null,
      cognitoAuthenticationProvider: null,
      sourceIp: '127.0.0.1',
      accountId: null,
    },
    extendedRequestId: null,
    path: '/admin/users',
  },
  queryStringParameters: {
    limit: '2',
    sort: 'abc',
  },
  multiValueQueryStringParameters: {
    limit: [
      '2',
    ],
    sort: [
      'abc',
    ],
  },
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwiZW1haWwiOiJqb2huQG1haWxpbmF0b3IuY29tIiwiaWF0IjoxNTkwMTIzNDQ2LCJleHAiOjE1OTAyMDk4NDZ9.ONbevgut67EwmE8A4W3iz0uxQP3qWuxsT6GZyDfniZ4',
    'User-Agent': 'PostmanRuntime/7.26.2',
    Accept: '*/*',
    'Cache-Control': 'no-cache',
    'Postman-Token': 'a4bb3ae5-37fe-4e0f-a286-5fddbdb5e833',
    Host: 'localhost:3000',
    'Accept-Encoding': 'gzip, deflate, br',
    Connection: 'keep-alive',
    'Content-Length': '64',
    'X-Forwarded-Proto': 'http',
    'X-Forwarded-Port': '3000',
  },
  multiValueHeaders: {
    'Content-Type': [
      'application/json',
    ],
    Authorization: [
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwiZW1haWwiOiJqb2huQG1haWxpbmF0b3IuY29tIiwiaWF0IjoxNTkwMTIzNDQ2LCJleHAiOjE1OTAyMDk4NDZ9.ONbevgut67EwmE8A4W3iz0uxQP3qWuxsT6GZyDfniZ4',
    ],
    'User-Agent': [
      'PostmanRuntime/7.26.2',
    ],
    Accept: [
      '*/*',
    ],
    'Cache-Control': [
      'no-cache',
    ],
    'Postman-Token': [
      'a4bb3ae5-37fe-4e0f-a286-5fddbdb5e833',
    ],
    Host: [
      'localhost:3000',
    ],
    'Accept-Encoding': [
      'gzip, deflate, br',
    ],
    Connection: [
      'keep-alive',
    ],
    'Content-Length': [
      '64',
    ],
    'X-Forwarded-Proto': [
      'http',
    ],
    'X-Forwarded-Port': [
      '3000',
    ],
  },
  pathParameters: null,
  stageVariables: null,
  path: '/admin/users',
  isBase64Encoded: false,
}
```