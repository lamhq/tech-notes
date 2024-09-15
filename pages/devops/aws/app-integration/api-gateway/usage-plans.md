

# Usage Plans & API Keys

## Usage Plans

Usage Plans allow you to control and monitor access to your APIs.

A usage plan specifies:
- who can access one or more deployed API stages and methods
- how much and how fast they can access them.
- which API keys are linked to identify clients and meter access
- throttling limits and quota limits that are enforced on individual client

Throttling limit is applied at the API key level.

Quota limits is the overall number of requests.

To configure a usage plan:
1. Create one or more APIs, configure the methods to require an API key, and deploy the APIs to stages.
2. Generate or import API keys to distribute to customers who will be using your API.
3. Create the usage plan with the desired throttle and quota limits.
4. Associate API stages and API keys with the usage plan.


## API keys

API keys are alphanumeric string values that you distribute to customers to grant access to your API.

API keys allow your customers to securely use your API gateway and authenticate their requests.

Can be used together with usage plans or Lambda authorizers to control access to your APIs.

Callers of the API must supply an assigned API key in the `x-api-key` header in requests to the API.