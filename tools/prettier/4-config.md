# Configuring Prettier

## Options

### Print Width

For readability we recommend against using more than 80 characters.


### Tab Width

Specify the number of spaces per indentation-level.


### Tabs

Indent lines with tabs instead of spaces.


### Semicolons

Print semicolons at the ends of statements.


### Quotes

Use single quotes instead of double quotes.


### Trailing Commas

Print trailing commas wherever possible in multi-line comma-separated syntactic structures.


### Require Pragma

Prettier can restrict itself to only format files that contain a special comment, called a pragma, at the top of the file. This is very useful when gradually transitioning large, unformatted codebases to Prettier.


## Configuration File

Prettier uses [cosmiconfig](https://github.com/davidtheclark/cosmiconfig) for configuration file support. This means you can configure Prettier via (in order of precedence):

- A `"prettier"` key in your `package.json` file.
- A `.prettierrc` file written in JSON or YAML.
- A `.prettierrc.json`, `.prettierrc.yml`, `.prettierrc.yaml`, or `.prettierrc.json5` file.
- A `.prettierrc.js`, or `prettier.config.js` file that exports an object using `export default` or `module.exports` (depends on the [`type`](https://nodejs.org/api/packages.html#type) value in your `package.json`).
- A `.prettierrc.mjs`, or `prettier.config.mjs` file that exports an object using `export default`.
- A `.prettierrc.cjs`, or `prettier.config.cjs` file that exports an object using `module.exports`.
- A `.prettierrc.toml` file.


### Basic Configuration

```json
{
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true
}
```