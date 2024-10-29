# Best practices for Coding Lambda functions

1. Separate the Lambda handler from your core logic
2. Package all of your dependencies with your deployment package to ensure correct versions are used.
3. Prefer libraries/frameworks that load quickly on execution environment startup
4. Reuse execution environment to reducing function run time:
   - Initialize SDK clients and database connections outside of the function handler
   - Cache static assets locally in the `/tmp` directory
   - Don't use execution environment to store information with security implications (e.g., user data)
5. Use environment variables, don't hard code parameters in function
6. Avoid using recursive function invocations
7. Minimize your deployment package size to reduce the amount of time that it takes for your deployment package to be downloaded and unpacked ahead of invocation.
8. Write idempotent code, ensure that when an event is handled multiple times, has the same effect as if it had been processed once