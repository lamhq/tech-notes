# Translate

## Basic

```json
// translation.json
{
  "key": "value of key",
  "look": {
    "deep": "value of look deep"
  }
}
```

```js
i18next.t('key');
// -> "value of key"

i18next.t('look.deep');
// -> "value of look deep"
```

## Accessing keys in different namespaces

```js
i18next.init({
  ns: ['common', 'moduleA'],
  defaultNS: 'moduleA'
});
```

```json
// moduleA.json
{
  "name": "Module A"
}
```

```json
// common.json
{
  "button": {
    "save": "save"
  }
}
```

```js
i18next.t('name');
// -> "Module A"

i18next.t('common:button.save');
// -> "save"
```


## Fallback keys

```json
{
  "error": {
    "unspecific": "Something went wrong.",
    "404": "The page was not found."
  }
}
```

```js
// const error = '404';
i18next.t([`error.${error}`, 'error.unspecific']); // -> "The page was not found"

// const error = '502';
i18next.t([`error.${error}`, 'error.unspecific']); // -> "Something went wrong"
```


## Translation options

`i18next.t(key, options)`

| option | description |
| :--- | :--- |
| defaultValue | defaultValue to return if a translation was not found, you also can define defaults for plurals by adding defaultValue\_plural / defaultValue\_2 -&gt; \_suffix depends on same pluralrules. |
| count | count value used for plurals |
| context | used for context \(eg. male / female\) |
| replace | object with vars for interpolation - or put them directly in options |
| lng | override language to use |
| lngs | override languages to use |
| fallbackLng | override language to lookup key if not found |
| ns | override namespaces \(string or array\) |
| keySeparator | override char to separate keys |
| nsSeparator | override char to split namespace from key |
| returnObjects | accessing an object not a translation string \(can be set globally too\) |
| joinArrays | char, eg. '\n' that arrays will be joined by \(can be set globally too\) |
| postProcess | string or array of postProcessors to apply |
| interpolation | override interpolation options |
| skipInterpolation | skip interpolation and nesting for this call to t function |