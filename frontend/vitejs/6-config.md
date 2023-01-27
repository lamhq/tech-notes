# Configuring Vite

When running vite from the command line, Vite will automatically try to resolve a config file named `vite.config.js` inside project root.

The config file with Typescript looks like this:

```js
import { defineConfig } from 'vite'

export default defineConfig({
  // ...
})
```

Vite supports using ES modules syntax in the config file.


## Conditional Config

```js
export default defineConfig(({ command, mode, ssrBuild }) => {
  if (command === 'serve') {
    return {
      // dev specific config
    }
  } else {
    // command === 'build'
    return {
      // build specific config
    }
  }
})
```


## Async Config

```js
If the config needs to call async function, it can export a async function instead:

export default defineConfig(async ({ command, mode }) => {
  const data = await asyncFunction()
  return {
    // vite config
  }
})
```


## Environment Variables

```js
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  return {
    // vite config
    define: {
      __APP_ENV__: env.APP_ENV,
    },
  }
})
```
