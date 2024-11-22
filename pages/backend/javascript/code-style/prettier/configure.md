# Configuring Prettier

## Configuration Options

- **Print Width:** Sets the maximum line length before wrapping.
- **Tab Width:** Specifies the number of spaces used to represent a tab.
- **Tabs:** Determines whether to use tabs or spaces for indentation.
- **Semicolons:** Controls whether to automatically add semicolons at the end of statements.
- **Quotes:** Specifies the preferred type of quotes (single or double).
- **Trailing Commas:** Determines whether to include trailing commas in object literals, array literals, and function parameter lists.
- **Require Pragma:** Enforces the use of a specific pragma comment to disable Prettier for certain code blocks. Useful when gradually transitioning large, unformatted codebases to Prettier.


## Configuration File

You can configure Prettier via (in order of precedence):
- A `"prettier"` key in your `package.json` file.
- A `.prettierrc` file written in JSON or YAML.
- A `.prettierrc.json`, `.prettierrc.yml`, `.prettierrc.yaml`, or `.prettierrc.json5` file.
- A `.prettierrc.js`, or `prettier.config.js` file that exports an object using `export default` or `module.exports` (depends on the [`type`](https://nodejs.org/api/packages.html#type) value in your `package.json`).
- A `.prettierrc.mjs`, or `prettier.config.mjs` file that exports an object using `export default`.
- A `.prettierrc.cjs`, or `prettier.config.cjs` file that exports an object using `module.exports`.
- A `.prettierrc.toml` file.
