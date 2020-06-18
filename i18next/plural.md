# Plural

```js
{
  "key": "item",
  "key_plural": "items",
  "keyWithCount": "{{count}} item",
  "keyWithCount_plural": "{{count}} items"
}
```

```js
i18next.t('key', {count: 0}); // -> "items"
i18next.t('key', {count: 1}); // -> "item"
i18next.t('key', {count: 5}); // -> "items"
i18next.t('key', {count: 100}); // -> "items"
i18next.t('keyWithCount', {count: 0}); // -> "0 items"
i18next.t('keyWithCount', {count: 1}); // -> "1 item"
i18next.t('keyWithCount', {count: 5}); // -> "5 items"
i18next.t('keyWithCount', {count: 100}); // -> "100 items"
```

## Multiple plurals

```json
{
  "key_0": "zero",
  "key_1": "singular",
  "key_2": "two",
  "key_3": "few",
  "key_4": "many",
  "key_5": "other"
}
```

```js
i18next.t('key', {count: 0}); // -> "zero"
i18next.t('key', {count: 1}); // -> "singular"
i18next.t('key', {count: 2}); // -> "two"
i18next.t('key', {count: 3}); // -> "few"
i18next.t('key', {count: 4}); // -> "few"
i18next.t('key', {count: 5}); // -> "few"
i18next.t('key', {count: 11}); // -> "many"
i18next.t('key', {count: 99}); // -> "many"
i18next.t('key', {count: 100}); // -> "other"
```


## Interval plurals

```javascript
import i18next from 'i18next';
import intervalPlural from 'i18next-intervalplural-postprocessor';

i18next
  .use(intervalPlural)
  .init(i18nextOptions);
```

keys

```json
{
  "key1": "{{count}} item",
  "key1_plural": "{{count}} items",
  "key1_interval": "(1){one item};(2-7){a few items};(7-inf){a lot of items};",
  "key2": "{{count}} item",
  "key2_plural": "{{count}} items",
  "key2_interval": "(1){one item};(2-7){a few items};"
}
```

```javascript
i18next.t('key1_interval', {postProcess: 'interval', count: 1}); // -> "one item"
i18next.t('key1_interval', {postProcess: 'interval', count: 4}); // -> "a few items"
i18next.t('key1_interval', {postProcess: 'interval', count: 100}); // -> "a lot of items"

// not matching into a range it will fallback to
// the regular plural form
i18next.t('key2_interval', {postProcess: 'interval', count: 1}); // -> "one item"
i18next.t('key2_interval', {postProcess: 'interval', count: 4}); // -> "a few items"
i18next.t('key2_interval', {postProcess: 'interval', count: 100}); // -> "100 items"
```