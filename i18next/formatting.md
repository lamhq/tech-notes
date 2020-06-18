# Formatting

```javascript
{
  "key": "The current date is {{date, MM/DD/YYYY}}",
  "key2": "{{text, uppercase}} just uppercased"
}
```

```js
i18next.init({
  interpolation: {
    format: function(value, format, lng) {
      if (format === 'uppercase') return value.toUpperCase();
      if(value instanceof Date) return moment(value).format(format);
      return value;
    }
  }
});
```

```js
i18next.t('key', { date: new Date() });
// -> "The current date is 07/13/2016"

i18next.t('key2', { text: 'can you hear me' });
// => "CAN YOU HEAR ME just uppercased"
```

Keep the language on moment in sync with i18next by listening to the change language event:

```javascript
i18next.on('languageChanged', function(lng) {
  moment.locale(lng);
});
```
