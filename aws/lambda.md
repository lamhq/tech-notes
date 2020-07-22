# AWS Lambda Function

## Deploy code

```sh
git archive --format zip --output my-function.zip HEAD

aws lambda update-function-code \
  --function-name GetStartedLambdaProxyIntegration \
  --zip-file fileb://my-function.zip
```