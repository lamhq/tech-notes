# Interpolation

## Basic

```json
{
  "key": "{{what}} is {{how}}"
}
```

```js
i18next.t('key', { what: 'i18next', how: 'great' });
// -> "i18next is great"
```


## Working with data models

```json
{
  "key": "I am {{author.name}}"
}
```

```js
const author = {
  name: 'Jan',
  github: 'jamuhl'
};
i18next.t('key', { author });
// -> "I am Jan"
```

### Interpolation options

```javascript
i18next.init({
  interpolation: { ... }
});

i18next.t('key', {
  interpolation: { ... }
});
```

| option | default | description |
| :--- | :--- | :--- |
| format | noop function | format function |
| formatSeparator | "," | used to separate format from interpolation value |
| escape | function | escape function `function escape(str) { return str; }` |
| escapeValue | true | escape passed in values to avoid XSS injection |
| useRawValueToEscape | false | If true, then value passed into escape function is not casted to string, use with custom escape function that does its own type-checking |
| prefix | "{{" | prefix for interpolation |
| suffix | "}}" | suffix for interpolation |
| prefixEscaped | undefined | escaped prefix for interpolation \(regexSafe\) |
| suffixEscaped | undefined | escaped suffix for interpolation \(regexSafe\) |
| unescapeSuffix | undefined | suffix to unescaped mode |
| unescapePrefix | "-" | prefix to unescaped mode |
| nestingPrefix | "$t\(" | prefix for nesting |
| nestingSuffix | "\)" | suffix for nesting |
| nestingPrefixEscaped | undefined | escaped prefix for nesting \(regexSafe\) |
| nestingSuffixEscaped | undefined | escaped suffix for nesting \(regexSafe\) |
| nestingOptionsSeparator | "," | separates the options from nesting key |
| defaultVariables | undefined | global variables to use in interpolation replacements `defaultVariables: { key: "value" }` |
| maxReplaces | 1000 | after how many interpolation runs to break out before throwing a stack overflow |
