# Configuration Options

```js
i18next.init(options, callback)
```

### languages, namespaces, resources

| option | default | description |
| :--- | :--- | :--- |
| resources | undefined | translation content |
| lng | undefined | language to use \(overrides language detection\). |
| fallbackLng | 'dev' | language to use if translations in user language are not available. |
| whitelist | false | array of allowed languages |
| nonExplicitWhitelist | false | if true will pass eg. `en-US` if finding `en` in whitelist |
| load | 'all' | language codes to lookup, given set language is 'en-US': `'all' --> ['en-US', 'en', 'dev']`, `'currentOnly' --> 'en-US'`, `'languageOnly' --> 'en'` |
| preload | false | array of languages to preload. Important on serverside to assert translations are loaded before rendering views. |
| lowerCaseLng | false | locale will be fully lowercased eg. `en-US` --&gt; `en-us` |
| cleanCode | false | language will be lowercased `EN` --&gt; `en` while leaving full locales like `en-US` |
| ns | 'translation' | string or array of namespaces to load |
| defaultNS | 'translation' | default namespace used if not passed to [translation function](../translation-function/essentials.md) |
| fallbackNS | false | string or array of namespaces to lookup key if not found in given namespace. [Learn more](../principles/fallback.md#namespace-fallback). |
| partialBundledLanguages | false | allows some resources to be set on initialization while others can be loaded using a backend connector |

### missing keys

| option | default | description |
| :--- | :--- | :--- |
| saveMissing | false | calls save missing key function on backend if key not found |
| saveMissingTo | 'fallback' | 'current' or 'all' |
| saveMissingPlurals | true | will save all plural forms instead of only singular if t was called for plurals |
| missingKeyHandler | false | `function(lng, ns, key, fallbackValue) { }` used for custom  missing key handling \(needs saveMissing set to true!\) |
| parseMissingKeyHandler | noop | function\(key\) { // return value to display } |
| appendNamespaceToMissingKey | false | appends namespace to missing key |
| missingInterpolationHandler | noop | `function(text, value) { return 'stringWithAlternativeValueOrUndefined' };` gets called in case a interpolation value is undefined. This method will not be called if the value is empty string or null |

### misc

<table>
  <thead>
    <tr>
      <th style="text-align:left">option</th>
      <th style="text-align:left">default</th>
      <th style="text-align:left">description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">keySeparator</td>
      <td style="text-align:left">&apos;.&apos;</td>
      <td style="text-align:left">
        <p>char to separate keys</p>
        <p><em>(if working with a flat json, it&apos;s recommended to set keySeparator to false)</em>
        </p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">nsSeparator</td>
      <td style="text-align:left">&apos;:&apos;</td>
      <td style="text-align:left">char to split namespace from key</td>
    </tr>
    <tr>
      <td style="text-align:left">pluralSeparator</td>
      <td style="text-align:left">&apos;_&apos;</td>
      <td style="text-align:left">char to split plural from key</td>
    </tr>
    <tr>
      <td style="text-align:left">contextSeparator</td>
      <td style="text-align:left">&apos;_&apos;</td>
      <td style="text-align:left">char to split context from key</td>
    </tr>
  </tbody>
</table>

### logging

| option | default | description |
| :--- | :--- | :--- |
| debug | false | logs info level to console output. Helps finding issues with loading not working. |
