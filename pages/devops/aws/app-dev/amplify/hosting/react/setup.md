# Set up project

## Integrate Amplify to project

After you have a running app, run:
```sh
amplify init
```

When you initialize a new Amplify project, a few things happen:
- A top level directory named `amplify/` is created. It stores your backend definition.
- `amplifyconfiguration.json` is created. It holds all the configuration for the services you create with Amplify.
- `amplify/.config/project-config.json` is created. It contains information about your project settings (name, source path, build path, ...)
- The `.gitignore` file is appended with some generated files to the ignore list
- A new Amplify app is created in your AWS account


## Install Amplify Client Library

```sh npm2yarn
npm install aws-amplify
```


## Configure Amplify Client Library

```tsx
import { Amplify } from 'aws-amplify';
import amplifyconfig from './amplifyconfiguration.json';

Amplify.configure(amplifyconfig);
```
