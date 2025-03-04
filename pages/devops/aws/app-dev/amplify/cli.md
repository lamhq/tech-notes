# Amplify CLI

## Requirements

- Node.js v14.x or later
- npm v6.14.4 or later
- git v2.14.1 or later


## Install the Amplify CLI

```sh
npm install -g @aws-amplify/cli
```


## Configure the Amplify CLI

Amplify CLI requires an IAM user with permissions assigned through the policy `AdministratorAccess-Amplify`.

After [creating an IAM user](https://docs.amplify.aws/react/start/getting-started/installation/#configure-the-amplify-cli), run this command and enter **access key id** and **secret access key** :
```sh
amplify configure
```
