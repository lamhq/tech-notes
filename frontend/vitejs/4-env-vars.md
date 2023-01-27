# Pre-defined Env Variables

- `import.meta.env.MODE`: the mode the app is running in (`development`, `production`)
- `import.meta.env.BASE_URL`: the base url the app is being served from, determined by the `base` config option.
- `import.meta.env.PROD`: whether the app is running in production.
- `import.meta.env.DEV`: whether the app is running in development.


## `.env` Files

Vite load environment variables from the following files in your environment directory:

```
.env                # loaded in all cases
.env.local          # loaded in all cases, ignored by git
.env.[mode]         # only loaded in specified mode
.env.[mode].local   # only loaded in specified mode, ignored by git
```

An env file for a specific mode (e.g. `.env.production`) will take higher **priority** than a generic one (e.g. `.env`).

Remember to restart the server after making changes to `.env` file.

Only variables prefixed with `VITE_` are exposed to your code:

```
VITE_SOME_KEY=123
DB_PASSWORD=foobar
```

```js
console.log(import.meta.env.VITE_SOME_KEY) // 123
console.log(import.meta.env.DB_PASSWORD) // undefined
```

If you want to use `$` inside your environment value, you have to escape it with `\`.

```
KEY=123
NEW_KEY1=test$foo   # test
NEW_KEY2=test\$foo  # test$foo
NEW_KEY3=test$KEY   # test123
```
