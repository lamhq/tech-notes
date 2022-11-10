# Plugins

## Specifying Parser

By default, ESLint uses Espree as its parser. The following parsers are compatible with ESLint:

- Esprima
- `@babel/eslint-parser` - A wrapper around the Babel parser that makes it compatible with ESLint.
- `@typescript-eslint/parser` - A parser that converts TypeScript into an ESTree-compatible form so it can be used in ESLint.

Note when using a custom parser, the `parserOptions` configuration property is still required. Parsers are all passed `parserOptions` and may or may not use them to determine which features to enable.

```json
{
  "parser":"esprima",
}
```

## Specifying Processor

Processors can extract JavaScript code from other kinds of files, then let ESLint lint the JavaScript code or processors can convert JavaScript code in preprocessing for some purpose.

```json
{
  "plugins":[ "a-plugin" ],
  "overrides":[
    {
      "files":[ "*.md" ],
      "processor":"a-plugin/markdown"
    },
    {
      "files":[ "**/*.md/*.js" ],
      "rules":{
        "strict":"off"
      }
    }
  ]
}
```


## Configuring Plugins

### Include a plugin

The `eslint-plugin-` prefix can be omitted 

```json
{
  "plugins":[
    "jquery", // means eslint-plugin-jquery
    "@jquery/jquery", // means @jquery/eslint-plugin-jquery
    "@foobar" // means @foobar/eslint-plugin
  ]
}
```

### Use a plugin

When using **rules**, **environments** or **configs** defined by plugins, they must be referenced following the convention:

- `eslint-plugin-foo` → `foo/a-rule`
- `@foo/eslint-plugin` → `@foo/a-config`
- `@foo/eslint-plugin-bar` → `@foo/bar/a-environment`

```json
{
  "plugins":[
    "jquery",
    "@foo/foo",
    "@bar"
  ],
  "extends":[
    "plugin:@foo/foo/recommended",
    "plugin:@bar/recommended"
  ],
  "rules":{
    "jquery/a-rule":"error",
    "@foo/foo/some-rule":"error",
    "@bar/another-rule":"error"
  },
  "env":{
    "jquery/jquery":true,
    "@foo/foo/env-foo":true,
    "@bar/env-bar":true
  }
}
```