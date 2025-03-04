# Configure Biome

## Configuration file structure

Biome is a toolchain, its configuration is organized around the tools it provides.

Biome provides three tools:
- formatter
- linter
- import organizer

You can disable a tool using `enabled` field:
```json
{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
  "formatter": {
    "enabled": false
  },
  "linter": {
    "enabled": false
  },
  "organizeImports": {
    "enabled": false
  }
}
```

Language-specific options of a tool are placed under a `<language>.<tool>` field:
```json
{
  "formatter": {
    "indentStyle": "space", // default is `tab`
    "lineWidth": 100 // default is `80`
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single", // default is `double`
      "lineWidth": 120 // override `formatter.lineWidth`
    }
  },
  "json": {
    "formatter": {
      "enabled": false
    }
  }
}
```


## Configuration file resolution

Biome looks in the working directory and in the parent directories until it finds a `biome.json` or a `biome.jsonc` file.


## Extend a configuration file

Use the `extends` field:
```json
{
  "extends": ["./common.json"]
}
```

Biome is able to resolve configuration files from the `node_modules/` directory:
```json
{
  "name": "@org/shared-configs",
  "type": "module",
  "exports": {
    "./biome": "./biome.json"
  }
}
```


## Upgrade configuration file

If the schema version specified in the configuration file doesn't match your installed Biome, you'll receive the error: `Property ... is not allowed`.

To fix it, update the configuration file with this command:
```sh
npx biome migrate --write
```


## Ignore files

- use `include` and `ignore`
- `include` is always applied first before applying `ignore`
- [glob syntaxes](https://biomejs.dev/guides/configure-biome/#glob-syntax-explained) are supported
- global `include` and `ignore` fields apply to all tools
- you can also include and ignore files at tool level 

In this configuration:

```json
{
  "files": {
    "include": ["src/**/*.js", "test/**/*.js"],
    "ignore": ["**/*.min.js"]
  },
  "linter": {
    "ignore": ["test"]
  }
}
```

Run `biome format test/`:
- All `.js` files under the `src/` and `test/` directories will be included.
- Any `.min.js` files in any directory will be ignored.

Run `biome lint test/`: The `test` directory is completely ignored by the linter.


## Available options

See the [configuration page](https://biomejs.dev/reference/configuration/).
