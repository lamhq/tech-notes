# Building for Production

## Build command

```bash
vite build [root] --sourcemap --base <path> --mode <mode>
```

## Public Base Path

If you are deploying your project under a nested public path, simply specify the **base** config option and all asset paths will be rewritten accordingly. This option can also be specified as a command line flag `--base`.


## Modes

By default, the dev server (dev command) runs in `development` mode and the build command runs in `production` mode.

When running `vite build`, it will load the env variables from `.env.production` if there is one:

```
# .env.production
VITE_APP_TITLE=My App
```

If you want to run `vite build` with a different mode. You can overwrite the default mode used for a command by passing the `--mode` option flag:

```bash
vite build --mode staging
```

And create a `.env.staging` file:

```
# .env.staging
VITE_APP_TITLE=My App (staging)
```


## Target

By default, Vite targets browsers which support the native ES Modules, native ESM dynamic import, and `import.meta`:

- Chrome >=87
- Firefox >=78
- Safari >=14
- Edge >=88

You can specify custom targets via the `build.target` config option, where the lowest target is `es2015`.

```bash
vite build --target modules
```
